import getMpIndex from './src/index';
import getMp from './src/mp.js';
import fs from 'fs';
import colors from 'colors/safe';

let numberOfMPs = 0;
let numberofMPsScraped = 1;

const start = async (): Promise<void> => {
  console.log(colors.bgWhite('Scraper started'));
  const index = await getMpIndex();
  const MPArray = await index.scrape().then(() => {
    const MPlinks = getMPlinks(index.links);
    numberOfMPs = MPlinks.length;
    return getMPs(index.links);
  });
  const MPJson = JSON.stringify(MPArray);
  saveMembersInAFile(MPJson);
};

function getMPlinks(array) {
  return array.filter(item => {
    if (item) {
      return item;
    }
  });
}

async function getMPs(links) {
  const mps = [];
  for (link of links) {
    if (link) {
      const mp = new MP(link);
      await mp.scrape().then(() => {
        console.log(
          colors.green(`${mp.data.name} `) +
            `/ has been scrapped ` +
            colors.yellow(`${numberofMPsScraped++} `) +
            `of ` +
            colors.green(`${numberOfMPs}`),
        );
        mps.push(mp.data);
      });
    }
  }
  return mps;
}

function saveMembersInAFile(json) {
  fs.writeFile('./data/members.json', json, error => {
    if (error) {
      return console.error(colors.red(JSON.stringify(error)));
    }
    console.log(colors.bgWhite('The file was saved!'));
  });
}

start();
