# Members of Parliament scraper

## What it is?

Is a scraper for the [UK Parliament website](http://www.parliament.uk/) to pull Members of Parliament data

## Why?

Because I need to build an API with MP data and UK Parliament doesn't provide it

## Technologies

- [Chrome Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [Node](https://nodejs.org/)
- [Colors](https://github.com/Marak/colors.js)
- [TypeScript](https://www.typescriptlang.org/)

## How to install ?

Clone this repo

`git clone git@github.com:pataruco/mp-scraper.git`

Install packages

`yarn`

## How to run it ?

On the terminal type

`yarn scrape`

When the scraper is done you can find Member of Parliament data on a [JSON file](./data/members.json)

## Tests

`yarn test`
