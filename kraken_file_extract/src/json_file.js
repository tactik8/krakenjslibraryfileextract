
export function process_json_file(file, callback) {


    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    
    reader.onload = function (event) {
      
        var content = event.target.result;
        const records = JSON.parse(content);
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
        
    };

    
    return 
}


