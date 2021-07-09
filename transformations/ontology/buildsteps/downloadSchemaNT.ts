import fs from 'fs';
import https from 'https';

/**
 * function to download over https
 * @param url 
 * @param dest 
 * @param errCB 
 */
var download = function(url, dest, errCB) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();  
    });
  }).on('error', function(err) {
    fs.unlink(dest, () => console.warn("no params specified in unlink")); // Delete the file async.
    if (errCB) errCB(err.message);
  });
};

const latestSchemaNT: string = "https://schema.org/version/latest/schemaorg-current-https.nt";
const dest: string = "./cli-gen/schema-ontology.nt";

download(latestSchemaNT, dest, (args) => console.log(args));