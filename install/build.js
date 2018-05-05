const fs = require('fs'),
_ = require('lodash');


var toMove = [{
    "src":"materialize/dist/css/materialize",
    "dest":""
  }]

// destination.txt will be created or overwritten by default.
fs.copyFile('source.txt', 'destination.txt', (err) => {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
});
