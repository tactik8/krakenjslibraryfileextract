
/*


*/


export const fileHelpers = {

    getRecord: getDocumentRecordFromFile,
    getRecordFromUrl: getDocumentRecordFromUrl,
    getAction: getActionFromFile,
    getError: getActionError
    
}


function getDocumentRecordFromUrl(fileUrl){

    var record = {
        "@type": "digitalDocument",
        "@id": String(crypto.randomUUID()),
        name: fileUrl.split('/').pop(),
        url: fileUrl
    };
    return record
}



function getDocumentRecordFromFile(file){

    var record = {
        "@type": "digitalDocument",
        "@id": String(crypto.randomUUID()),
        name: file.name,
        dateModified: file.LastModified,
        size: {"@type": "quantitativeValue", value: file.size, unitText: "Byte", unitCode: "B"},
        type: file.type
    };
    return record
}

function getActionFromFile(file, instrument, result){

    var record = {
        "@type": "action",
        "@id": String(crypto.randomUUID()),
        name: `Extract data from ${file.name}`,
        timeStart: new Date(),
        timeEnd: new Date(),
        actionStatus: 'completedActionStatus',
        object: getDocumentRecordFromFile(file),
        instrument: instrument,
        result: result
    };
    return record

    
}

function getActionError(object, instrument, errorMessage){

    var record = {
        "@type": "action",
        "@id": String(crypto.randomUUID()),
        name: `Extract data from ${object?.name}`,
        timeStart: new Date(),
        timeEnd: new Date(),
        actionStatus: 'failedActionStatus',
        object: object,
        instrument: instrument,
        error: errorMessage
    };
    return record


}

function getInstrument(file, instrument, result){

    var record = {
        "@type": "action",
        "@id": String(crypto.randomUUID()),
        name: `Extract data from ${file.name}`,
        timeStart: new Date(),
        timeEnd: new Date(),
        actionStatus: 'completedActionStatus',
        object: getRecordFromFile(file),
        instrument: instrument,
        result: result
    };
    return record


}