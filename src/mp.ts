import { Page } from 'puppeteer';
import { MP } from '../typings/mp';

const getMp = async (page: Page, url: string): Promise<MP> => {
  await page.goto(url);
  let mp: MP;
  try {
    mp = await page.evaluate(() => ({
      addressAs: (document.querySelector(
        '#commons-addressas',
      ) as HTMLDivElement)
        ? (document.querySelector('#commons-addressas') as HTMLDivElement)
            .innerText
        : null,
      constituency: (document.querySelector(
        '#commons-constituency',
      ) as HTMLDivElement)
        ? (document.querySelector('#commons-constituency') as HTMLDivElement)
            .innerText
        : null,
      email: (document.querySelector(
        'p[data-generic-id="email-address"] > a',
      ) as HTMLAnchorElement)
        ? (document.querySelector(
            'p[data-generic-id="email-address"] > a',
          ) as HTMLAnchorElement).innerText
        : null,
      name: (document.querySelector('h1') as HTMLHeadingElement)
        ? (document.querySelector('h1') as HTMLHeadingElement).innerText
        : null,
      party: (document.querySelector('#commons-party') as HTMLDivElement)
        ? (document.querySelector('#commons-party') as HTMLDivElement).innerText
        : null,
      twitter: {
        handler: (document.querySelector(
          'li[data-generic-id="twitter"] > a',
        ) as HTMLAnchorElement)
          ? (document.querySelector(
              'li[data-generic-id="twitter"] > a',
            ) as HTMLAnchorElement).innerText
          : null,
        url: (document.querySelector(
          'li[data-generic-id="twitter"] > a',
        ) as HTMLAnchorElement)
          ? (document.querySelector(
              'li[data-generic-id="twitter"] > a',
            ) as HTMLAnchorElement).href
          : null,
      },
      website: (document.querySelector(
        'li[data-generic-id="website"] > a',
      ) as HTMLAnchorElement)
        ? (document.querySelector(
            'li[data-generic-id="website"] > a',
          ) as HTMLAnchorElement).href
        : null,
    }));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
    throw error;
  }

  return mp;
};

export default getMp;
