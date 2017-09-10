const Index = require('./src/index.js');
const MP = require('./src/mp.js');


const index = new Index( );

index.scrape( ).then( ( ) => {
    const MPs = getMPs( index.links );
});

async function getMPs( links ) {
    const mps = [ ];
    for ( link of links ) {
        if ( link ) {
            const mp =  new MP( link );
            await mp.scrape( ).then( ( ) => {
                mps.push( mp );
            });
        }
    }
    return mps;
}
