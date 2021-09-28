"use strict";
var _a, _b, _c, _d, _e, _f, _g;
exports.__esModule = true;
var ts_morph_1 = require("ts-morph");
var project = new ts_morph_1.Project();
var sourceFiles = project.addSourceFilesAtPaths("testdata/Header.d.ts"); //"lib/**/*{.d.ts,.ts}");
//const sourceFile = project.getSourceFileOrThrow("./lib/Button.d.ts");
var interfacesInFile = sourceFiles[0].getInterfaces();
console.log("interfaceName: " + interfacesInFile[0].getName());
//prints the key on the interface
console.log((_c = (_b = (_a = interfacesInFile[0]) === null || _a === void 0 ? void 0 : _a.getMembers()[1]) === null || _b === void 0 ? void 0 : _b.getSymbol()) === null || _c === void 0 ? void 0 : _c.getName());
//prints "__type", if that member doesn't have a named type, otherwise the named type
console.log((_g = (_f = (_e = (_d = interfacesInFile[0]) === null || _d === void 0 ? void 0 : _d.getMembers()[1]) === null || _e === void 0 ? void 0 : _e.getType()) === null || _f === void 0 ? void 0 : _f.getSymbol()) === null || _g === void 0 ? void 0 : _g.getName());
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
console.log(interfacesInFile[0].getMembers()[1].getStructure());
