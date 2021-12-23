import { Project } from "ts-morph";

//const project = new Project( {skipFileDependencyResolution: false, skipLoadingLibFiles: false});

//const sourceFiles = project.addSourceFilesAtPaths("testdata/mui-lib-file.ts");//"lib/**/*{.d.ts,.ts}");
/*project.getProgram().emitToMemory()
//const sourceFile = project.getSourceFileOrThrow("./lib/Button.d.ts");
const importDeclarations = sourceFiles[0].getImportDeclarations();
console.log(project.getAmbientModules().map((symbol => {return symbol.getEscapedName()})).filter((escName) => escName.startsWith('"s'))
)
//console.log(importDeclarations[0].getImportClause())
const defaultImport = importDeclarations[0].getDefaultImportOrThrow();
const defaultImportType = defaultImport.getType();
console.log(defaultImportType.getBaseTypes())
for (const property of defaultImportType.getProperties()) {
  console.log(property.getName());
}*/


const project = new Project( {skipFileDependencyResolution: false, skipLoadingLibFiles: false});

const sourceFile = project.createSourceFile("file.ts", `
import muiLib from "@mui/material";
`);

for (const importDeclaration of sourceFile.getImportDeclarations()) {
    const moduleSpecifierSymbol = importDeclaration.getModuleSpecifier().getSymbolOrThrow();
    for (const symbol of moduleSpecifierSymbol.getExports()) {
      console.log(symbol.getName());
    }
  }

//console.log(sourceFiles[0].getExportSymbols()[0].compilerSymbol.declarations)
/*
const interfacesInFile = sourceFiles[0].getInterfaces();

console.log("interfaceName: " + interfacesInFile[0].getName());
//prints the key on the interface
console.log(interfacesInFile[0]?.getMembers()[1]?.getSymbol()?.getName());
//prints "__type", if that member doesn't have a named type, otherwise the named type
console.log(interfacesInFile[0]?.getMembers()[1]?.getType()?.getSymbol()?.getName());
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
 *
console.log(interfacesInFile[0].getMembers()[1].getStructure());*/