import colors from 'colors/safe';
import fs from 'fs';
import puppeteer from 'puppeteer';
import getIndex from './src/index';
import getMp from './src/mp';
import { MP } from './typings/mp';

let numberOfMPs = 0;
let numberofMPsScraped = 1;

export const MP_URL = 'http://www.parliament.uk/mps-lords-and-offices/mps/';

export const saveMembersInAFile = async (data: MP[]) => {
  const mpObject = JSON.stringify(data);
  try {
    await fs.writeFileSync('./data/members.json', mpObject);
    // tslint:disable-next-line:no-console
    console.log(colors.yellow('The file was saved!'));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(colors.red(JSON.stringify(error)));
    throw error;
  }
};

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

const start = async (
  saveMembersInAFilefn = saveMembersInAFile,
): Promise<void> => {
  // tslint:disable-next-line:no-console
  console.log(colors.yellow('Scraper started'));
  const mpIndex = await getIndex(MP_URL);
  numberOfMPs = mpIndex.length;
  const mps = await scrapeMps(mpIndex);
  await saveMembersInAFilefn(mps);
};

if (!module.parent) {
  // tslint:disable-next-line:no-console
  start().catch(console.error);
}

export default start;

// start();
