const fs = require('fs');

// Read the original JSON file
const rawData = fs.readFileSync('./src/OxPunkAttributesStorage.json');
const data = JSON.parse(rawData);

// Convert the JSON object to an array of objects
const convertedData = Object.entries(data).map(([key, value]) => ({
  OxCryptoPunk: key,
  Attributes: value
}));

// Write the converted data to a new JSON file
fs.writeFileSync('OxPunkAttributesStorage_N.json', JSON.stringify(convertedData, null, 2));

console.log('Conversion completed!');