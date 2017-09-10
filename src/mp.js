const puppeteer = require('puppeteer');

class MP {
    constructor( url  ) {
        this.url = url;
        this.data = { };
    }

    async scrape(   ) {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto( this.url );
        this.data = await page.evaluate( ( ) => {
            function getQuerySelector( query, attr ) {
                let $element = document.querySelector(query);
                if ( $element ) {
                    if ( attr === 'text' ) {
                        return $element.innerText;
                    } else {
                        return $element.href;
                    }
                }
                return null;
            }
            return {
                name: getQuerySelector('h1', 'text'),
                constituency: getQuerySelector('#commons-constituency', 'text'),
                addressAs: getQuerySelector('#commons-addressas', 'text'),
                party: getQuerySelector('#commons-party', 'text'),
                email: getQuerySelector('p[data-generic-id="email-address"] > a', 'text'),
                twitter: {
                    handler: getQuerySelector('li[data-generic-id="twitter"] > a', 'text'),
                    url: getQuerySelector('li[data-generic-id="twitter"] > a', 'link')
                },
                website: getQuerySelector('li[data-generic-id="website"] > a', 'link')
            }
        });
        browser.close();
    }
}

module.exports = MP;
