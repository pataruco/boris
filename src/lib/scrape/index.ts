import colors from 'colors/safe';
import puppeteer from 'puppeteer';
import getLord from '../../lord/lord';
import getMp from '../../mp/mp';
import { House } from '../../typings/house';

let numberOfPeopleScrapped = 1;

const getHouseScrapper = (house: House) => {
  let method;
  house === 'commons' ? (method = getMp) : (method = getLord);
  return method;
};

export const scrapePeopleFrom = async (
  house: House,
  links: string[],
): Promise<any[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const numberOfPeople = links.length;
  const people = [];
  const getPerson = getHouseScrapper(house);

  for (const link of links) {
    let person;
    try {
      person = await getPerson(page, link);
      // tslint:disable-next-line:no-console
      console.log(
        colors.green(`${person.name} `) +
          `/ has been scrapped ` +
          colors.yellow(`${numberOfPeopleScrapped++} `) +
          `of ` +
          colors.green(`${numberOfPeople}`),
      );
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(colors.red(JSON.stringify(error)));
      throw error;
    }

    people.push(person);
  }

  browser.close();
  return people;
};

export default scrapePeopleFrom;
