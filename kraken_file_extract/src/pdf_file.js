
export function process_pdf_file(file, callback) {
    console.log("pdf");
    extractPDFTextFromFile(file).then((records) => {
        console.log("pdf", records);
        var record = {
            "@type": "digitalDocument",
            "@id": String(crypto.randomUUID()),
            name: file.name,
            dateMOdified: file.LastModified,
            size: {"@type": "quantitativeValue", value: file.size, unitText: "Byte", unitCode: "B"},
            type: file.type,
            hasPart: records
        };

        callback(record);
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
