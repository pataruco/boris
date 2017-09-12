const Index = require('./src/index.js');
const MP = require('./src/mp.js');
const filesystem = require('fs');
let numberOfMPs = 0;
let numberofMPsScraped = 1;


async function start( ) {
    const index = new Index( );
    const MPArray = await index.scrape( ).then( ( ) => {
        const MPlinks = getMPlinks( index.links );
        numberOfMPs = MPlinks.length;
        return getMPs( index.links );
    });
    const MPJson = json.parse( MPArray );
    saveMembersInAFile( MPJson );
}

function getMPlinks( array ) {
    return array.filter( ( item ) => {
        if ( item ) {
            return item;
        }
    });
}

async function getMPs( links ) {
    const mps = [ ];
    for ( link of links ) {
        if ( link ) {
            const mp =  new MP( link );
            await mp.scrape( ).then( ( ) => {
                console.log( `${ mp.data.name } has been scraped / ${numberofMPsScraped++} of ${numberOfMPs}` );
                mps.push( mp.data );
            });
        }
    }
    return mps;
}

function saveMembersInAFile( json ) {
    filesystem.writeFile('./data/members.json', json, ( error ) => {
        if ( error ) {
            return console.error( error );
        }
        console.log("The file was saved!");
    })
}

start( );
