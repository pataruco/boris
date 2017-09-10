const puppeteer = require('puppeteer');

class MP {
    constructor( url  ) {
        this.url = url;
        this.data = ' ';
        return this.scrape(  );
    }

    async scrape(   ) {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto( this.url );
        await page.evaluate( ( ) => {
            this.data = document.querySelector('h1').innerText;
            // console.log( this.data );
            // const anchors = Array.from( document.querySelectorAll( 'table > tbody > tr > td > a' ) );
            // return anchors.map( ( anchor ) => {
            //     if ( !anchor.href.includes('#') ) {
            //         return anchor.href;
            //     }
            // });
        });
        browser.close();
    }
}

module.exports = MP;
