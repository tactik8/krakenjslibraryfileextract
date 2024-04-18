
export function process_xml_file(file, callback) {


    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    
    reader.onload = function (event) {
      
        var content = event.target.result;
        const records = xmlTojson(content);

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




function xmlTojson(xmlString) {
   

    // Parse XML string
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Convert XML to JSON
    function xmlToJson(xml) {
        var obj = {};

        if (xml.nodeType == 1) {
            // Element
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] =
                        attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) {
            // Text
            obj = xml.nodeValue.trim();
        }

        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof obj[nodeName] == "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof obj[nodeName].push == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    }

    var jsonData = xmlToJson(xmlDoc);
    return jsonData;
    //console.log(JSON.stringify(jsonData, null, 2));
}
