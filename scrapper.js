const puppeteer = require('puppeteer');

class MPindex {
    constructor(  ) {
        this.url = 'http://www.parliament.uk/mps-lords-and-offices/mps/';
        return this.scrape(  );
    }

    async scrape(   ) {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto( this.url );
        const links = await page.evaluate( ( ) => {
            const anchors = Array.from( document.querySelectorAll( 'table > tbody > tr > td > a' ) );
            return anchors.map( ( anchor ) => {
                if ( anchor.text !== 'back to top') {
                    return anchor.href;
                }
            });
        });
        browser.close();
    }
}

let urlToScrape = new MPindex( );
