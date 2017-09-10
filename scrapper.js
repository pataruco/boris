const Index = require('./src/index.js');
const MP = require('./src/mp.js');


const index = new Index( );

// console.log( index );
// console.log(  index.scrape( ).then( () => console.log( 'links' , index.links )) )


index.scrape( ).then( ( ) => {
    getMPs( index.links );
});

async function getMPs( links ) {
    for ( link of links ) {
        if ( link ) {
            console.log( link );
            const mp =  await new MP( link );
            mp.then( ( ) => {
                console.log( 'here ');
            })
            // mp.then( ( ) => {
            //     console.log( mpData );
            // })
            // mp.then( ( ) => {
            //     console.log( mp.data );
            // })
        }
    }
}
