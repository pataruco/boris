import puppeteer from 'puppeteer';

const getQuerySelector = (query: string, attr: string): string | null => {
  const $element = document.querySelector(query);
  if ($element) {
    if (attr === 'text') {
      return $element.innerText;
    } else {
      return $element.href;
    }
  }
  return null;
};

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
  const mp: MP = await page.evaluate(() => {
    return {
      name: getQuerySelector('h1', 'text'),
      constituency: getQuerySelector('#commons-constituency', 'text'),
      addressAs: getQuerySelector('#commons-addressas', 'text'),
      party: getQuerySelector('#commons-party', 'text'),
      email: getQuerySelector('p[data-generic-id="email-address"] > a', 'text'),
      twitter: {
        handler: getQuerySelector('li[data-generic-id="twitter"] > a', 'text'),
        url: getQuerySelector('li[data-generic-id="twitter"] > a', 'link'),
      },
      website: getQuerySelector('li[data-generic-id="website"] > a', 'link'),
    };
  });
  browser.close();
  return mp;
};
