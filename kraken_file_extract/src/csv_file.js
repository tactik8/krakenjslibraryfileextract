

import { fileHelpers } from './file_helpers.js';

import Papa from 'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/+esm'

export function process_csv_file(file, callback) {


    let instrument = {"@type": "SoftwareSourceCode", "@id": }
       

    
    let config = {
        quoteChar: '"',
        dynamicTyping: true,
        header: true,
        encoding: "UTF-8",
        complete: function(results) {

            var action = fileHelpers.getAction(file)
            
            callback(record);
        },
    };

    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function(event) {
        var csv = event.target.result;
        Papa.parse(csv, config).data;
    };
}
