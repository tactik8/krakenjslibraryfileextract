


import { krakenFileExtract } from './kraken_file_extract/kraken_file_extract.js';




function testCallback(records){

    console.log('Received results in callback fn')
    console.log(records);
}

function test(){

    krakenFileExtract('./test.csv', testCallback)

}


test()