import fs from "fs";
var files = ["./cli-gen/schema-ontology.nt", "./cli-gen/uxiverse-ontology.nt"];
var dest = "./cli-gen/combined-ontology.nt";

var output = files
  .map((f) => {
    return fs.readFileSync(f).toString().trim() + "\n";
  })
  .join("");

fs.writeFileSync(dest, output);