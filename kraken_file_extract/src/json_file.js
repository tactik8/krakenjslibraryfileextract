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


export function process_json_file(file, callback) {

   

    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    
    reader.onload = function (event) {
      
        var content = event.target.result;
        const records = JSON.parse(content);
        
        var action = fileHelpers.getAction(file, instrument, results)
        callback(action);

        
    };

    
    return 
}


