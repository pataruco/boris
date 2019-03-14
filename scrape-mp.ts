import colors from 'colors/safe';
import getIndex from './src/lib/get-index/index';
import saveFileForHouse from './src/lib/save-file';
import scrapePeopleFrom from './src/lib/scrape';
import { MP } from './src/typings/mp';

export const MP_URL = 'http://www.parliament.uk/mps-lords-and-offices/mps/';

const start = async (saveFileForHouseFn = saveFileForHouse): Promise<void> => {
  // tslint:disable-next-line:no-console
  console.log(colors.yellow('Scraper started'));
  const index = await getIndex(MP_URL);
  const mps: MP[] = await scrapePeopleFrom('commons', index);
  await saveFileForHouseFn('commons', mps);
};

if (!module.parent) {
  // tslint:disable-next-line:no-console
  start().catch(console.error);
}

export default start;

// start();
