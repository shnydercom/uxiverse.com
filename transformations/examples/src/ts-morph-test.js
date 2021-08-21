"use strict";
exports.__esModule = true;
var ts_morph_1 = require("ts-morph");
var project = new ts_morph_1.Project();
var sourceFiles = project.addSourceFilesAtPaths("testdata/Header.d.ts"); //"lib/**/*{.d.ts,.ts}");
//const sourceFile = project.getSourceFileOrThrow("./lib/Button.d.ts");
var personInterface = sourceFiles[0].getInterfaces();
console.log("bla " + personInterface[0].getName());
//prints the key on the interface
console.log(personInterface[0].getMembers()[1].getSymbol().getName());
//prints "__type", if that member doesn't have a named type, otherwise the named type
console.log(personInterface[0].getMembers()[1].getType().getSymbol().getName());
/**
 * returns this for the `interface IBla {onLogin: () => void}`
 * {
  name: 'onLogin',
  type: '() => void',
  initializer: undefined,
  hasQuestionToken: false,
  isReadonly: false,
  docs: [],
  kind: 31
}
 */
console.log(personInterface[0].getMembers()[1].getStructure());
