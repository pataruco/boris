import puppeteer from 'puppeteer';

const getIndex = async (url: string): Promise<string[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  let links: string[];
  try {
    links = await page.evaluate(() =>
      Array.from(document.querySelectorAll(
        'table > tbody > tr > td > a',
      ) as NodeListOf<HTMLAnchorElement>)
        .filter(anchor => !anchor.href.includes('#'))
        .map(anchor => anchor.href),
    );
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
    throw error;
  }
  browser.close();
  return links;
};

export default getIndex;
