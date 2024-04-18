/**
 *
 * 
 */

let instrument = {
    "@type": "SoftwareSourceCode", 
    "@id": "https://github.com/tactik8/krakenjslibraryfileextract/process_pdf_file",
    "name": "process_pdf_file",
    "codeRepository" : "https://github.com/tactik8/krakenjslibraryfileextract"
}

import { fileHelpers } from './file_helpers.js';



export function process_pdf_file(file, callback) {
    console.log("pdf");
    extractPDFTextFromFile(file).then((records) => {

        
        var action = fileHelpers.getAction(file, instrument, results)
        callback(action);
        
    });
}

// Function to extract text from a PDF file provided as a File object
async function extractPDFTextFromFile(file) {
    // Use a FileReader to read the file into memory
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onload = async (event) => {
            const arrayBuffer = event.target.result;

            // Loading the PDF file
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            try {
                const pdfDoc = await loadingTask.promise;
                let textContent = "";

                // Extract text from each page
                for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
                    const page = await pdfDoc.getPage(pageNum);
                    const text = await page.getTextContent();
                    textContent += text.items.map((item) => item.str).join(" ");
                }

                resolve(textContent);
            } catch (error) {
                console.error("Error processing PDF: ", error);
                reject(error);
            }
        };

        fileReader.onerror = (error) => {
            fileReader.abort();
            reject(error);
        };

        // Read the file as an ArrayBuffer
        fileReader.readAsArrayBuffer(file);
    });
}
