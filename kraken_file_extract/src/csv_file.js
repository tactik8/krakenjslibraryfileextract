/**
 *
 * 
 */

let instrument = {
    "@type": "SoftwareSourceCode", 
    "@id": "https://github.com/tactik8/krakenjslibraryfileextract/process_csv_file",
    "name": "process_csv_file",
    "codeRepository" : "https://github.com/tactik8/krakenjslibraryfileextract"
}

import { fileHelpers } from './file_helpers.js';
import Papa from 'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/+esm'


export function process_csv_file(file, callback) {

    _process_csv_file(file, callback)

    
}


function _process_csv_file(file, callback) {

   
    let config = {
        quoteChar: '"',
        dynamicTyping: true,
        header: true,
        encoding: "UTF-8",
        complete: function(results) {

            var action = fileHelpers.getAction(file, instrument, results.data)
            callback(action);
            
        },
    };

    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function(event) {
        var csv = event.target.result;
        Papa.parse(csv, config).data;
    };
}
