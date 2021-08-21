import fs from 'fs';
import https from 'https';
import path from 'path';

/**
 * function to download over https
 * @param url 
 * @param dest 
 * @param errCB 
 */
const download = function (url, dest, errCB) {
  const file = fs.createWriteStream(dest);
  const request = https.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close();
    });
  }).on('error', function (err) {
    fs.unlink(dest, () => console.warn("no params specified in unlink")); // Delete the file async.
    if (errCB) errCB(err.message);
  });
};

const latestSchemaNT: string = "https://schema.org/version/latest/schemaorg-current-https.nt";
const dest: string = "./cli-gen/schema-ontology.nt";

const downloadIfNecessary = (url, dest, errCB) => {
  const isDestExists = fs.existsSync(path.resolve(dest));
  if (isDestExists) {
    console.warn("Not re-downloading, file found at destination: " + dest);
    return;
  }
  download(url, dest, errCB);
};

downloadIfNecessary(latestSchemaNT, dest, (args) => console.log(args));