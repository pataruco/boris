const puppeteer = require('puppeteer');
const MPIndexURL = 'http://www.parliament.uk/mps-lords-and-offices/mps/';
const MPIndexSelector = 'table > tbody > tr > td > a';


class ScrapeIndex {
    constructor( url, selector ) {
        this.url = url;
        this.selector = selector;
        return this.scrape( );
    }

    async scrape( ) {
        let selector = this.selector;
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(this.url);
        let list = await page.evaluate( ( ) =>{
            return document.querySelectorAll( 'table > tbody > tr > td > a' )
        });
        console.log( this.selector );
        console.log( list );

        browser.close();
    }

}

let urlToScrape = new ScrapeIndex( MPIndexURL,  MPIndexSelector)
