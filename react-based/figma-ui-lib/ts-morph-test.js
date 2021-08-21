"use strict";
exports.__esModule = true;
var ts_morph_1 = require("ts-morph");
var project = new ts_morph_1.Project();
var sourceFiles = project.addSourceFilesAtPaths("lib/**/*{.d.ts,.ts}");
//const sourceFile = project.getSourceFileOrThrow("./lib/Button.d.ts");
var personInterface = sourceFiles[2].getInterfaces();
console.log("bla " + personInterface[0].getName());
//prints the key on the interface
console.log(personInterface[0].getMembers()[1].getSymbol().getName());
//prints "__type", if that member doesn't have a named type, otherwise the named type
console.log(personInterface[0].getMembers()[1].getType().getSymbol().getName());
console.log(personInterface[0].getMembers()[1].getStructure());
