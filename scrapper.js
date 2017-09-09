const puppeteer = require('puppeteer');

class ScrapeIndex {
    constructor(  ) {
        this.url = 'http://www.parliament.uk/mps-lords-and-offices/mps/';
        return this.scrape(  );
    }

    async scrape(   ) {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto( this.url  );
        const links = await page.evaluate( ( ) => {
            const anchors = Array.from( document.querySelectorAll( 'table > tbody > tr > td > a' ) );
            return anchors.map( ( anchor ) => {
                let isNotMP = anchor.includes('#top');
                if ( !isNotMP ) {
                    return anchor.href;
                }
            });
            // return anchors.map( anchor => anchor.href);
        });
        console.log(links);
        browser.close();
    }

}

let urlToScrape = new ScrapeIndex( )
