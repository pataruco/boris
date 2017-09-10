const puppeteer = require('puppeteer');

class Index {
    constructor(  ) {
        this.url = 'http://www.parliament.uk/mps-lords-and-offices/mps/';
        this.links = [ ];
    }

    async scrape(   ) {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto( this.url );
        this.links = await page.evaluate( ( ) => {
            const anchors = Array.from( document.querySelectorAll( 'table > tbody > tr > td > a' ) );
            return anchors.map( ( anchor ) => {
                if ( !anchor.href.includes('#') ) {
                    return anchor.href;
                }
            });
        });
        browser.close();
    }
}

module.exports = Index;
