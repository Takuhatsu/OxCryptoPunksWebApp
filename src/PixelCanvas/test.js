const fs = require('fs');
const path = require('path');

const directoryPath = 'C:/CodingProjects/Image_Generator/Assets/suit';

fs.readdir(directoryPath, function(err, files) {
if (err) {
return console.log('Unable to scan directory: ' + err);
} 

files.forEach(function(file) {
console.log(file); 
});
});