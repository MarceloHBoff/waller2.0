import cheerio from 'cheerio';
import puppeteer, { Page } from 'puppeteer';
import { injectable, inject } from 'tsyringe';

import Fields from '../constants/fields';
import URLs from '../constants/URLs';
import ICEICrawlerProvider from '../models/ICEICrawlerProvider';

import IUserActivesRepository from '@modules/actives/repositories/IUserActivesRepository';

interface ICEIActive {
  buyDate: Date;
  type: string;
  code: string;
  amount: number;
  price: string;
}

interface ICEIBond {
  name: string;
  dueDate: Date;
  value: string;
  nowValue: string;
}

@injectable()
export default class PuppeteerProvider implements ICEICrawlerProvider {
  constructor(
    @inject('UserActivesRepository')
    private userActiveRepository: IUserActivesRepository,
  ) {}

  public async findUserActivesByCEI(user_id: string): Promise<void> {
    let actives: ICEIActive[] = [];
    let bonds: ICEIBond[] = [];

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

    await this.userActiveRepository.removeAutomaticByUserId(user_id);

    page.setDefaultTimeout(10000);

    for (let i = 0; i < options.length; i++) {
      await page.click(Fields.BrokerSelector);
      await page.keyboard.type(options[i]);
      await page.focus(Fields.SubmitSelector);
      await page.waitFor(100);
      await page.click(Fields.SubmitSelector);

      try {
        await page.waitFor(500);
        await page.waitForSelector(Fields.TableSelector);

        const brokerActives = await this.getDataByHTML(await page.content());
        actives = [...actives, ...brokerActives];

        await page.waitFor(500);
      } catch {}

      await this.resetCEIQuery(page);
    }

    await page.goto(URLs.Bond);

    await page.waitFor(1500);

    for (let i = 0; i < options.length; i++) {
      await page.focus(Fields.BrokerSelector);
      await page.keyboard.type(options[i]);
      await page.waitFor(1500);
      await page.click(Fields.CountSelector);
      await page.waitFor(1500);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.focus(Fields.SubmitSelector);
      await page.click(Fields.SubmitSelector);

      try {
        await page.waitFor(500);
        await page.waitForSelector(Fields.TitleTableSelector);

        const brokerBonds = await this.getDataByHTMLBonds(await page.content());
        bonds = [...bonds, ...brokerBonds];

        await page.waitFor(500);
      } catch (err) {}

      await this.resetCEIQuery(page);
    }

    await browser.close();

    console.log(actives);
    console.log(bonds);
  }

  private async getDataByHTML(html: string): Promise<ICEIActive[]> {
    const actives: ICEIActive[] = [];

    const $ = cheerio.load(html);

    let charge = true;

    $('.responsive').each((_, table) => {
      $(table)
        .find('tr')
        .each((ir, row) => {
          const footLine = $(row).text().trim();

          if (footLine.substr(0, 13) === 'Total Compra:') charge = false;

          if (charge) {
            const data: ICEIActive = {} as ICEIActive;

            $(row)
              .find('td')
              .each((ic, cell) => {
                const value = $(cell).text().trim();

                if (value !== '') {
                  switch (ic) {
                    case 0:
                      data.buyDate = this.getDate(value);
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
                      data.amount = Number(value);
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
                  data.dueDate = this.getDate(value);
                  break;
                case 2:
                  data.value = this.getValue(value);
                  break;
                case 4:
                  data.nowValue = this.getValue(value);
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

  private getDate(value: string): Date {
    return new Date(
      Number(value.substr(6, 9)),
      Number(value.substr(3, 2)) - 1,
      Number(value.substr(0, 2)),
    );
  }

  private getValue(value: string): string {
    return Number(value.replace('.', '').replace(',', '.')).toFixed(2);
  }

  private async resetCEIQuery(page: Page): Promise<void> {
    await page.waitFor(500);
    await page.focus(Fields.SubmitSelector);
    await page.click(Fields.SubmitSelector);
    await page.waitFor(500);
  }
}
