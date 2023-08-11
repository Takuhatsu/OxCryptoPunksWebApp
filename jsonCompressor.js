const fs = require("fs");

const jFile = fs.readFileSync('./src/OxPunkAttributesStorage.json');

const jsonCompressor = function (s) {

    fs.writeFileSync('newOxPunkAttributesStorage.json', JSON.stringify(JSON.parse(s)));

};

jsonCompressor(jFile);

