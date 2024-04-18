//import {kraken_analyze_data} from '../../kraken_analyze_data/kraken_analyze_data.js';

import { process_csv_file } from './src/csv_file.js';

import { process_xml_file } from './src/xml_file.js';

import { process_json_file } from './src/json_file.js';
import { process_pdf_file } from './src/pdf_file.js';
import { process_zip_file } from './src/zip_file.js';
import { process_ocr_file } from './src/ocr_file.js';




export function krakenFileExtract(file, callback){

    console.log('start', file, typeof file)
    if(typeof file === 'string'){
        getFileFromUrl(file, callback)
        
    } else {

        kraken_file_processor(file, callback)
    }
    
}


function getFileFromUrl(fileUrl, callback){

    var filename = fileUrl.split('/').pop()
    fetch(fileUrl)
       .then( r => r.blob() )
       .then( t => kraken_file_processor(new File([t], filename), callback))

}


export function kraken_file_processor(file, callback){

    let record = {
        "@type": "digitalDocument",
        "@id": String(crypto.randomUUID()),
        name: file.name,
        dateMOdified: file.LastModified,
        size: {"@type": "quantitativeValue", value: file.size, unitText: "Byte", unitCode: "B"},
        type: file.type
    };

    
    if (file?.type == 'application/zip'  || file.name.slice(-4) == '.zip'){

            process_zip_file(file, kraken_file_processor);
    }

    if (file?.type == 'image/png'  || file.name.slice(-4) == '.png'){

            process_zip_file(file, kraken_file_processor);
    }

    
    if (file?.type == 'text/csv' || file.name.slice(-4) == '.csv'){

            process_csv_file(file, callback);
    }

    if (file?.type == 'text/xml' || file.name.slice(-4) == '.xml'){

            process_xml_file(file, callback);
    }

    if (file?.type == 'application/json' || file.name.slice(-5) == '.json'){

            process_json_file(file, callback);
    }

    if (file?.type == 'application/pdf'&&  file.name.slice(-4) == '.pdf'){

            process_pdf_file(file, callback);
    }


    return record;
    
}


