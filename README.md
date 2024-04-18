# kraken_file_extract

Library to extract raw data from a url or input file. 

## How to use

```
import { krakenFileExtract } from '<url>'

let url = 'https://....'

krakenFileExtract(url, ((record) => do something with results or callback fn )

```

## Response format 

```
{
    "@type": "action",
    "@id": "d227f395-f764-4b7d-a70b-9e4a7aca3ad8",
    "name": "Extract data from test.csv",
    "timeStart": "2024-04-18T12:29:46.363Z",
    "timeEnd": "2024-04-18T12:29:46.363Z",
    "actionStatus": "completedActionStatus",
    "object": {
        "@type": "digitalDocument",
        "@id": "98c0ab93-bc17-45d0-8b4d-9d551b4ce24d",
        "name": "test.csv",
        "size": {
            "@type": "quantitativeValue",
            "value": 637809,
            "unitText": "Byte",
            "unitCode": "B"
        },
        "type": "text/csv"
    },
    "instrument": {
        "@type": "SoftwareSourceCode",
        "@id": "https://github.com/tactik8/krakenjslibraryfileextract/process_csv_file",
        "name": "process_csv_file",
        "codeRepository": "https://github.com/tactik8/krakenjslibraryfileextract"
    },
    "result": <<THE JSON RECORDS EXTRACTED >>
}

```