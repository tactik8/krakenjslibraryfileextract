
import { krakenFileExtract } from './kraken_file_extract/kraken_file_extract.js';


function test(){

    let result = krakenFileExtract('./test.csv',  result => console.log('rrr', result))

    console.log('red', result)
}


test()

