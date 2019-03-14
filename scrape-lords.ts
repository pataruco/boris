import colors from 'colors/safe';
import getIndex from './src/lib/get-index/index';
import saveFileForHouse from './src/lib/save-file';
import scrapePeopleFrom from './src/scrape';
import { Lord } from './src/typings/lord';

export const LORDS_URL =
  'https://www.parliament.uk/mps-lords-and-offices/lords/';

const start = async (saveFileForHouseFn = saveFileForHouse): Promise<void> => {
  // tslint:disable-next-line:no-console
  console.log(colors.yellow('Scraper started'));
  const index = await getIndex(LORDS_URL);
  const lords: Lord[] = await scrapePeopleFrom('lords', index);
  await saveFileForHouseFn('lords', lords);
};

if (!module.parent) {
  // tslint:disable-next-line:no-console
  start().catch(console.error);
}

export default start;

// start();
