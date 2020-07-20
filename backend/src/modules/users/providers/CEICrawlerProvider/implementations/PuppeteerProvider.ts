import cheerio from 'cheerio';
import puppeteer, { Page } from 'puppeteer';
import { injectable, inject } from 'tsyringe';
import { getConnection } from 'typeorm';

import Fields from '../constants/fields';
import URLs from '../constants/URLs';
import ICEICrawlerProvider from '../models/ICEICrawlerProvider';

import ICEIActiveDTO from '@modules/actives/dtos/ICEIActiveDTO';
import IUserActivesRepository from '@modules/actives/repositories/IUserActivesRepository';
import IUserBondsRepository from '@modules/bonds/repositories/IUserBondsRepository';

interface ICEIBond {
  name: string;
  due_date: Date;
  buy_price: number;
  now_price: number;
}

@injectable()
export default class PuppeteerProvider implements ICEICrawlerProvider {
  constructor(
    @inject('UserActivesRepository')
    private userActivesRepository: IUserActivesRepository,

    @inject('UserBondsRepository')
    private userBondsRepository: IUserBondsRepository,
  ) {}

  public async findUserActivesByCEI(user_id: string): Promise<void> {
    let actives: ICEIActiveDTO[] = [];
    let bonds: ICEIBond[] = [];

    console.time(user_id);

    const connection = getConnection().createQueryRunner();

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    page.setViewport({ width: 1400, height: 800 });

    await page.goto(URLs.Login);
    await page.click(Fields.UsernameSelector);
    await page.keyboard.type(String(process.env.CEI_CPF));
    await page.click(Fields.PasswordSelector);
    await page.keyboard.type(String(process.env.CEI_PASSWORD));
    await page.click(Fields.SubmitSelector);

    try {
      await page.waitForNavigation();
    } catch {
      return;
    }

    await page.goto(URLs.Negociation);

    const $ = cheerio.load(await page.content());

    const options: string[] = [];

    $(Fields.BrokerSelector).each((_, select) => {
      $(select)
        .find('option')
        .each((io, op) => {
          const option = $(op).text().trim();

          if (option !== 'Selecione') {
            const [optionNumber] = option.split(' - ');

            options.push(optionNumber);
          }
        });
    });

    page.setDefaultTimeout(300000);

    for (let i = 0; i < options.length; i++) {
      try {
        await page.click(Fields.BrokerSelector);
        await page.keyboard.type(options[i]);
        await page.focus(Fields.SubmitSelector);
        await page.waitFor(100);
        await page.click(Fields.SubmitSelector);
        await page.waitFor(500);

        const selectorFound = await this.raceSelectors(page, [
          Fields.TableSelector,
          Fields.NullQuery,
        ]);

        await page.waitFor(500);

        if (selectorFound === Fields.TableSelector) {
          const brokerActives = await this.getDataByHTML(await page.content());
          actives = [...actives, ...brokerActives];
        }

        await this.resetCEIQuery(page);
      } catch {
        console.log('retry', options[i]);
        await page.waitFor(1000);

        await this.resetCEIQuery(page);

        await page.waitFor(1000);
        i--;
      }
    }

    await page.goto(URLs.Bond);

    await page.waitFor(2000);

    for (let i = 0; i < options.length; i++) {
      await page.focus(Fields.BrokerSelector);
      await page.keyboard.type(options[i]);
      await page.waitFor(1000);
      await page.click(Fields.CountSelector);
      await page.waitFor(1000);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.focus(Fields.SubmitSelector);
      await page.click(Fields.SubmitSelector);

      try {
        const selectorFound = await this.raceSelectors(page, [
          Fields.TitleTableSelector,
        ]);

        if (selectorFound === Fields.TitleTableSelector) {
          const brokerBonds = await this.getDataByHTMLBonds(
            await page.content(),
          );
          bonds = [...bonds, ...brokerBonds];
        }
      } catch {}

      await this.resetCEIQuery(page);
    }

    await browser.close();

    connection.startTransaction();

    await this.userActivesRepository.removeAutomaticByUserId(user_id);
    await this.userBondsRepository.removeAutomaticByUserId(user_id);

    for (let i = 0; i < actives.length; i++) {
      await this.userActivesRepository.createOrUpdateByCEI(user_id, actives[i]);
    }

    for (let i = 0; i < bonds.length; i++) {
      await this.userBondsRepository.create({
        user_id,
        name: bonds[i].name,
        due_date: bonds[i].due_date,
        buy_price: bonds[i].buy_price,
        now_price: bonds[i].now_price,
        automatic: true,
      });
    }

    connection.commitTransaction();

    console.timeEnd(user_id);
  }

  private async getDataByHTML(html: string): Promise<ICEIActiveDTO[]> {
    const actives: ICEIActiveDTO[] = [];

    const $ = cheerio.load(html);

    let charge = true;

    $('.responsive').each((_, table) => {
      $(table)
        .find('tr')
        .each((ir, row) => {
          const footLine = $(row).text().trim();

          if (footLine.substr(0, 13) === 'Total Compra:') charge = false;

          if (charge) {
            const data: ICEIActiveDTO = {} as ICEIActiveDTO;

            $(row)
              .find('td')
              .each((ic, cell) => {
                const value = $(cell).text().trim();

                if (value !== '') {
                  switch (ic) {
                    case 0:
                      data.buy_date = this.getDate(value);
                      break;
                    case 1:
                      data.type = value;
                      break;
                    case 4:
                      if (value[value.length - 1] === 'F') {
                        data.code = value.substring(0, value.length - 1);
                      } else {
                        data.code = value;
                      }
                      break;
                    case 6:
                      data.quantity = Number(value);
                      break;
                    case 7:
                      data.price = this.getValue(value);
                      break;
                    default:
                      break;
                  }
                }
              });

            if (Object.keys(data).length !== 0) actives.push(data);
          }
        });
    });

    return actives;
  }

  private async getDataByHTMLBonds(html: string): Promise<ICEIBond[]> {
    const $ = cheerio.load(html);

    const bonds: ICEIBond[] = [];

    $('.responsive tbody').each((_, table) => {
      $(table)
        .find('tr')
        .each((ir, row) => {
          const data: ICEIBond = {} as ICEIBond;

          $(row)
            .find('td')
            .each((i, cell) => {
              const value = $(cell).text().trim();

              switch (i) {
                case 0:
                  data.name = value;
                  break;
                case 1:
                  data.due_date = this.getDate(value);
                  break;
                case 2:
                  data.buy_price = this.getValue(value);
                  break;
                case 4:
                  data.now_price = this.getValue(value);
                  break;
                default:
                  break;
              }
            });

          if (Object.keys(data).length !== 0) bonds.push(data);
        });
    });

    return bonds;
  }

  private async raceSelectors(
    page: Page,
    selectors: string[],
  ): Promise<string> {
    return Promise.race(
      selectors.map(selector => {
        return page
          .waitForSelector(selector, {
            visible: true,
            timeout: 10000,
          })
          .then(() => selector);
      }),
    );
  }

  private getDate(value: string): Date {
    return new Date(
      Number(value.substr(6, 9)),
      Number(value.substr(3, 2)) - 1,
      Number(value.substr(0, 2)),
    );
  }

  private getValue(value: string): number {
    return Number(value.replace('.', '').replace(',', '.'));
  }

  private async resetCEIQuery(page: Page): Promise<void> {
    await page.waitFor(500);
    await page.focus(Fields.SubmitSelector);
    await page.click(Fields.SubmitSelector);
    await page.waitFor(500);
  }
}
