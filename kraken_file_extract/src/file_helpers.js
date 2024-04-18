
/*


*/


export const fileHelpers = {

    getRecord: getRecordFromFile,
    getAction: getActionFromFile
    
}


function getRecordFromFile(file){

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
        object: getRecordFromFile(file),
        instrument: instrument,
        result: result
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