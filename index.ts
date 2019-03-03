import getMpIndex from './src/index';
import getMp, { MP } from './src/mp';
// import fs from 'fs';
import colors from 'colors/safe';
import puppeteer, { Page } from 'puppeteer';

let numberOfMPs = 0;
let numberofMPsScraped = 1;

const start = async (): Promise<void> => {
  console.log(colors.bgWhite('Scraper started'));

  let mpIndex;

  try {
    mpIndex = await getMpIndex();
  } catch (error) {
    console.error(error);
    throw error;
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  numberOfMPs = mpIndex.length;
  const mps = await scrapeMps(page, mpIndex);

  browser.close();
  console.log(mps);
};

const scrapeMps = async (page: Page, links: string[]): Promise<MP[]> => {
  const mps: MP[] = [];

  links.forEach(async (link: string) => {
    let mp: MP;
    try {
      mp = await getMp(page, link);
    } catch (error) {
      console.error(error);
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
  });
  return mps;
};

// function getMPlinks(array) {
//   return array.filter(item => {
//     if (item) {
//       return item;
//     }
//   });
// }

// async function getMPs(links) {
//   const mps = [];
//   for (link of links) {
//     if (link) {
//       const mp = new MP(link);
//       await mp.scrape().then(() => {
//         console.log(
//           colors.green(`${mp.data.name} `) +
//             `/ has been scrapped ` +
//             colors.yellow(`${numberofMPsScraped++} `) +
//             `of ` +
//             colors.green(`${numberOfMPs}`),
//         );
//         mps.push(mp.data);
//       });
//     }
//   }
//   return mps;
// }

// function saveMembersInAFile(json) {
//   fs.writeFile('./data/members.json', json, error => {
//     if (error) {
//       return console.error(colors.red(JSON.stringify(error)));
//     }
//     console.log(colors.bgWhite('The file was saved!'));
//   });
// }

start();
