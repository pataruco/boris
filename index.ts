import getMpIndex from './src/index';
import getMp, { MP } from './src/mp';
import fs from 'fs';
import colors from 'colors/safe';

process.setMaxListeners(Infinity);

let numberOfMPs = 0;
let numberofMPsScraped = 1;

const saveMembersInAFile = async (data: MP[]) => {
  const mpObject = JSON.stringify(data);
  try {
    await fs.writeFileSync('./data/members.json', mpObject);
    console.log(colors.bgWhite('The file was saved!'));
  } catch (error) {
    console.error(colors.red(JSON.stringify(error)));
    throw error;
  }
};

const scrapeMps = async (links: string[]): Promise<MP[]> => {
  const mps: MP[] = [];
  for (const link of links) {
    let mp: MP;
    try {
      mp = await getMp(link);
    } catch (error) {
      console.error(colors.red(JSON.stringify(error)));
      throw error;
    }
    console.log(
      colors.green(`${mp.name} `) +
        `/ has been scrapped ` +
        colors.yellow(`${numberofMPsScraped++} `) +
        `of ` +
        colors.green(`${numberOfMPs}`),
    );
    mps.push(mp);
  }
  return mps;
};

const start = async (): Promise<void> => {
  console.log(colors.yellow('Scraper started'));
  const mpIndex = await getMpIndex();
  numberOfMPs = mpIndex.length;
  const mps = await scrapeMps(mpIndex);
  await saveMembersInAFile(mps);
};

start();
