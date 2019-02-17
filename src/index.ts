import puppeteer from 'puppeteer';

const url = 'http://www.parliament.uk/mps-lords-and-offices/mps/';

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll(
      'table > tbody > tr > td > a',
    ) as NodeListOf<HTMLAnchorElement>).filter(
      anchor => !anchor.href.includes('#'),
    ),
  );
  browser.close();
  return links;
};

export default scrape;
