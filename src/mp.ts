import puppeteer from 'puppeteer';

function getQuerySelector(query: string, attr: string): string | null {
  const element: HTMLAnchorElement | null = document.querySelector(query);
  if (element) {
    if (attr === 'text') {
      return element.innerText;
    } else {
      return element.href;
    }
  }
  return null;
}
// const getQuerySelector = (query: string, attr: string): string | null => {
//   const element: HTMLAnchorElement | null = document.querySelector(query);
//   if (element) {
//     if (attr === 'text') {
//       return element.innerText;
//     } else {
//       return element.href;
//     }
//   }
//   return null;
// };

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

const scrape = async (url: string): Promise<MP> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const mp: MP = await page.evaluate(() => ({
    name: (document.querySelector('h1') as HTMLHeadingElement).innerText,
    constituency: (document.querySelector(
      '#commons-constituency',
    ) as HTMLDivElement).innerText,
    addressAs: (document.querySelector('#commons-addressas') as HTMLDivElement)
      .innerText,
    party: (document.querySelector('#commons-party') as HTMLDivElement)
      .innerText,
    email: (document.querySelector(
      'p[data-generic-id="email-address"] > a',
    ) as HTMLAnchorElement).innerText,
    twitter: {
      handler: (document.querySelector(
        'li[data-generic-id="twitter"] > a',
      ) as HTMLAnchorElement).innerText,
      url: (document.querySelector(
        'li[data-generic-id="twitter"] > a',
      ) as HTMLAnchorElement).href,
    },
    website: (document.querySelector(
      'li[data-generic-id="website"] > a',
    ) as HTMLAnchorElement).href,
  }));
  browser.close();
  return mp;
};

export default scrape;

scrape('https://www.parliament.uk/biographies/commons/greg-clark/1578').then(
  data => console.log(data),
);
