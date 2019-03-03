import puppeteer, { Page } from 'puppeteer';

export interface MP {
  name: string | null;
  constituency: string | null;
  addressAs: string | null;
  party: string | null;
  email: string | null;
  twitter: {
    handler: string | null;
    url: string | null;
  };
  website: string | null;
}

const getMp = async (page: Page, url: string): Promise<MP> => {
  await page.goto(url);
  let mp: MP;
  try {
    mp = await page.evaluate(() => ({
      name: (document.querySelector('h1') as HTMLHeadingElement)
        ? (document.querySelector('h1') as HTMLHeadingElement).innerText
        : null,
      constituency: (document.querySelector(
        '#commons-constituency',
      ) as HTMLDivElement)
        ? (document.querySelector('#commons-constituency') as HTMLDivElement)
            .innerText
        : null,
      addressAs: (document.querySelector(
        '#commons-addressas',
      ) as HTMLDivElement)
        ? (document.querySelector('#commons-addressas') as HTMLDivElement)
            .innerText
        : null,
      party: (document.querySelector('#commons-party') as HTMLDivElement)
        ? (document.querySelector('#commons-party') as HTMLDivElement).innerText
        : null,
      email: (document.querySelector(
        'p[data-generic-id="email-address"] > a',
      ) as HTMLAnchorElement)
        ? (document.querySelector(
            'p[data-generic-id="email-address"] > a',
          ) as HTMLAnchorElement).innerText
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
    console.error(error);
    throw error;
  }

  return mp;
};

export default getMp;
