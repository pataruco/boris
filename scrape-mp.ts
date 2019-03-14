import colors from 'colors/safe';
import puppeteer from 'puppeteer';
import getIndex from './src/index';
import saveFileForHouse from './src/lib/save-file';
import getMp from './src/mp/mp';
import { MP } from './src/typings/mp';

let numberOfMPs = 0;
let numberofMPsScraped = 1;

export const MP_URL = 'http://www.parliament.uk/mps-lords-and-offices/mps/';

export const scrapeMps = async (links: string[]): Promise<MP[]> => {
  const browser = await puppeteer.launch({
    handleSIGINT: false,
    headless: true,
  });
  const page = await browser.newPage();
  const mps: MP[] = [];
  for (const link of links) {
    let mp: MP;
    try {
      mp = await getMp(page, link);
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(colors.red(JSON.stringify(error)));
      throw error;
    }
    // tslint:disable-next-line:no-console
    console.log(
      colors.green(`${mp.name} `) +
        `/ has been scrapped ` +
        colors.yellow(`${numberofMPsScraped++} `) +
        `of ` +
        colors.green(`${numberOfMPs}`),
    );
    mps.push(mp);
  }
  browser.close();
  return mps;
};

const start = async (saveFileForHouseFn = saveFileForHouse): Promise<void> => {
  // tslint:disable-next-line:no-console
  console.log(colors.yellow('Scraper started'));
  const index = await getIndex(MP_URL);
  numberOfMPs = index.length;
  const mps = await scrapeMps(index);
  await saveFileForHouse('commons', mps);
};

if (!module.parent) {
  // tslint:disable-next-line:no-console
  start().catch(console.error);
}

export default start;

// start();
