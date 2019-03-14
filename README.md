# Members of Parliament scraper

## What is it?

Is a scraper for the [UK Parliament website](http://www.parliament.uk/) to pull members data from House of Lords & House of Commons

## Why?

Because I need to build an API with MP and Lords data and UK Parliament doesn't provide it

## Technologies

- [Chrome Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [Node](https://nodejs.org/)
- [Colors](https://github.com/Marak/colors.js)
- [TypeScript](https://www.typescriptlang.org/)

## How to install ?

Clone this repo

`git@github.com:pataruco/uk-parliament-scraper.git`

Install dependencies

`yarn`

## How to run it ?

### Commons

`yarn scrape:mps`

When the scraper is done you can find members of House of Commons data on a [JSON file called commons](./data/commons.json)

### Lords

`yarn scrape:lords`

When the scraper is done you can find members of House of Lords data on a [JSON file called lords](./data/lords.json)

## Tests

`yarn test`
