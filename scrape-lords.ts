import colors from "colors/safe";
import fs from "fs";
import puppeteer from "puppeteer";
import getIndex from "./src/index";
import getLord from "./src/lord";
import { Lord } from "./typings/lord";

let numberOfMPs = 0;
let numberofMPsScraped = 1;

export const LORDS_URL =
  "https://www.parliament.uk/mps-lords-and-offices/lords/";

// TODO: abstract this into a util calss
export const saveMembersInAFile = async (data: Lord[]) => {
  const mpObject = JSON.stringify(data);
  try {
    await fs.writeFileSync("./data/members.json", mpObject);
    // tslint:disable-next-line:no-console
    console.log(colors.yellow("The file was saved!"));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(colors.red(JSON.stringify(error)));
    throw error;
  }
};

export const scrapeMps = async (links: string[]): Promise<Lord[]> => {
  const browser = await puppeteer.launch({
    handleSIGINT: false,
    headless: true,
  });
  const page = await browser.newPage();
  const mps: Lord[] = [];
  for (const link of links) {
    let mp: Lord;
    try {
      mp = await getLord(page, link);
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
  console.log(colors.yellow("Scraper started"));
  const index = await getIndex(LORDS_URL);
  numberOfMPs = index.length;
  const mps = await scrapeMps(index);
  await saveMembersInAFilefn(mps);
};

if (!module.parent) {
  // tslint:disable-next-line:no-console
  start().catch(console.error);
}

export default start;

// start();
