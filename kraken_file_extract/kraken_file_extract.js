//import {kraken_analyze_data} from '../../kraken_analyze_data/kraken_analyze_data.js';

import { process_csv_file } from './src/csv_file.js';

import { process_xml_file } from './src/xml_file.js';

import { process_json_file } from './src/json_file.js';
import { process_pdf_file } from './src/pdf_file.js';
import { process_zip_file } from './src/zip_file.js';
import { process_ocr_file } from './src/ocr_file.js';
import { fileHelpers } from './src/file_helpers.js';
import { getFileFromUrl } from './src/getFile.js';

export function krakenFileExtract(file, callback) {

    console.log('start', file, typeof file)
    if (typeof file === 'string') {
        return getFileFromUrl(file).then(file => kraken_file_processor(file, callback))
    } else {
        return kraken_file_processor(file, callback)
    }
}


export function kraken_file_processor(file, callback) {


    if (file?.type == 'application/zip' || file.name.slice(-4) == '.zip') {

        return process_zip_file(file, kraken_file_processor);
    }

    if (file?.type == 'image/png' || file.name.slice(-4) == '.png') {

        return process_zip_file(file, kraken_file_processor);
    }


    if (file?.type == 'text/csv' || file.name.slice(-4) == '.csv') {

        return process_csv_file(file, callback);
    }

    if (file?.type == 'text/xml' || file.name.slice(-4) == '.xml') {

        return process_xml_file(file, callback);
    }

    if (file?.type == 'application/json' || file.name.slice(-5) == '.json') {

        return process_json_file(file, callback);
    }

    if (file?.type == 'application/pdf' && file.name.slice(-4) == '.pdf') {

        return process_pdf_file(file, callback);
    }

}


