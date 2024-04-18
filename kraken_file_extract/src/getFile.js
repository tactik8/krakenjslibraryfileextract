/**
 *
 * 
 */

let instrument = {
    "@type": "SoftwareSourceCode",
    "@id": "https://github.com/tactik8/krakenjslibraryfileextract/process_csv_file",
    "name": "process_csv_file",
    "codeRepository": "https://github.com/tactik8/krakenjslibraryfileextract"
}
import { fileHelpers } from './file_helpers.js';



export function getFileFromUrl(fileUrl) {

    let urlRecord = fileHelpers.getRecordFromUrl(fileUrl)


    var filename = fileUrl.split('/').pop()
    return fetch(fileUrl)
        .then(r => r.blob())
        .then(t => new File([t], filename))

}

