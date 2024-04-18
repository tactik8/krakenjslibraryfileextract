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



export function process_ocr_file(file, callback) {
    
    
    
    
    console.log("pdf");
    extractText(file).then((records) => {
        console.log("pdf", records);
        var action = fileHelpers.getAction(file, instrument, results)
        callback(action);
    });
}

async function extractText(file) {
    const worker = await Tesseract.createWorker("eng");
    const ret = await worker.recognize(file);
    console.log(ret.data.text);
    await worker.terminate();
    return ret.data.text;
}
