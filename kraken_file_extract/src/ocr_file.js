


export function process_ocr_file(file, callback) {
    console.log("pdf");
    extractText(file).then((records) => {
        console.log("pdf", records);
        //callback(records);
    });
}

async function extractText(file) {
    const worker = await Tesseract.createWorker("eng");
    const ret = await worker.recognize(file);
    console.log(ret.data.text);
    await worker.terminate();
    return ret.data.text;
}
