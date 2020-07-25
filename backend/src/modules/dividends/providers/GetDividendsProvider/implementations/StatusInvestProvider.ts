import cheerio from 'cheerio';
import puppeteer, { Page, Browser } from 'puppeteer';

import ICreateManyDTO from '../../../dtos/ICreateManyDTO';
import Fields from '../constants/fields';
import URLs from '../constants/URLs';
import IGetDividendsProvider from '../models/IGetDividendsProvider';

export default class StatusInvestProvider implements IGetDividendsProvider {
  private page: Page;

  private browser: Browser;

  public async createPage(): Promise<void> {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    this.page = await this.browser.newPage();
    this.page.setViewport({ width: 1400, height: 8000 });
  }

  public async getActiveDividends(code: string): Promise<ICreateManyDTO[]> {
    await this.page.goto(URLs.FII + code);

    let $ = cheerio.load(await this.page.content());

    const pages = $(Fields.PagesTableSelector);

    const dividends: ICreateManyDTO[] = [];

    for (let i = 0; i < pages.length; i++) {
      await this.page.click(`li[data-page="${i + 1}"] > a`);

      $ = cheerio.load(await this.page.content());

      $(Fields.TableRowSelector)
        .find('tr')
        .each((_, row) => {
          const data: ICreateManyDTO = {} as ICreateManyDTO;

          $(row)
            .find('td')
            .each((indice, cell) => {
              const [value] = $(cell).text().trim().split(' ', 1);

              switch (indice) {
                case 0:
                  data.type = value === 'JCP' ? 'jscp' : 'dividends';
                  break;
                case 1:
                  data.EX_date = this.getDate(value);
                  break;
                case 2:
                  data.pay_date = this.getDate(value);
                  break;
                case 3:
                  data.value = Number(value.replace(',', '.'));
                  break;
                default:
                  break;
              }
            });

          dividends.push(data);
        });
    }

    return dividends;
  }

  public async destroyPage(): Promise<void> {
    this.browser.close();
  }

  private getDate(date: string): Date {
    return new Date(
      Number(date.substr(6, 9)),
      Number(date.substr(3, 2)) - 1,
      Number(date.substr(0, 2)),
    );
  }
}
