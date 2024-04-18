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


export function process_zip_file(file, callback) {
    console.log(typeof file);
    
        unzipAndSelect(file).then((files) => {

        for (let fileName in files) {
            
            callback(files[fileName]);
        }
    });
}
async function extractFilesFromZip(file) {
    try {
        const jsZip = new JSZip();
        const zipContents = await jsZip.loadAsync(file); // Load the zip file asynchronously
        const files = {};

        for (const fileName of Object.keys(zipContents.files)) {
            const fileEntry = zipContents.files[fileName];
            if (!fileEntry.dir) { // Ensure it's not a directory
                let fileType = "string"; // Default to reading as text
                if (fileName.match(/\.(png|jpg|jpeg|gif)$/i)) {
                    fileType = "blob"; // Images are read as Blob
                } else if (fileName.match(/\.(pdf)$/i)) {
                    fileType = "blob"; // PDFs are read as Blob
                }

                const fileContent = await fileEntry.async(fileType); // Read file content
                files[fileName] = {
                    content: fileContent,
                    type: fileType
                }; // Store file content with type
            }
        }

        return files; // Returns an object with file names as keys
    } catch (error) {
        console.error("Failed to extract files:", error);
        throw error; // Rethrow or handle error as needed
    }
}

async function unzipAndSelect( zipFile ) {
   var flist = [];
   var zip = await JSZip.loadAsync(zipFile);
   // async-forEach loop inspired from jszip source
   for(let filename in zip.files) {
      if (!zip.files.hasOwnProperty(filename)) {
         continue;
      }
      // Object key is the filename
      var match = filename.match( /REGEX.pdf$/ );
      if(1==1) {
         var blob = await zip.file( filename ).async("blob");
         var file = new File( [blob], filename, {type : 'application/pdf'} );
         flist.push(file);
      }
   }
   return flist;
}