import {
  Project,
  ts,
  createWrappedNode,
  SyntaxKind,
  TypeFlags,
  Symbol as TSSymbol,
  FunctionDeclaration,
  InterfaceDeclaration,
} from "ts-morph";

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
const project = new Project({
  skipFileDependencyResolution: false,
  skipLoadingLibFiles: false,
});

const sourceFile = project.createSourceFile(
  "file.ts",
  `
import muiLib from "@mui/material";
`
);

const onceTruth = (pV?: boolean, cV?: boolean) => {
  return pV || cV;
};

function recursiveRootTypeSearch(
  symb: TSSymbol,
  acceptedInterfaceNames: string[] = ["ReactElement"]
): boolean {
  return !!symb
    .getDeclarations()
    .map((decl) => {
      const kindName = decl.getKindName();
      const declType = decl.getType();
      //console.log(kindName);
      //"work" code
      if (kindName === "InterfaceDeclaration") {
        const idecl = decl as InterfaceDeclaration;
        const ideclName = idecl.getName();
        if (
          acceptedInterfaceNames.findIndex(
            (acceptedInterfaceName) => acceptedInterfaceName === ideclName
          ) >= 0
        ) {
          console.log(`found declaration with name: ${ideclName}`);
          console.log(idecl);
          return true;
        }
        return idecl
          .getExtends()
          .map((extendsClause) => {
            const extClauseSymbol = extendsClause.getType().getSymbol();
            if (extClauseSymbol)
              return recursiveRootTypeSearch(extClauseSymbol);
          })
          .reduce(onceTruth, false);
      }
      //traversal code
      if (kindName === "FunctionType") {
        const fnReturnTypeSymbol = (decl as FunctionDeclaration)
          .getReturnType()
          .getSymbol();
        if (fnReturnTypeSymbol)
          return recursiveRootTypeSearch(fnReturnTypeSymbol);
      }
      if (kindName === "TypeAliasDeclaration") {
        const unionTypes = declType.getUnionTypes();
        const intersectionTypes = declType.getIntersectionTypes();
        const utsFound = unionTypes
          .map((utype) => {
            const utypeSymbol = utype.getSymbol();
            if (utypeSymbol) return recursiveRootTypeSearch(utypeSymbol);
          })
          .reduce(onceTruth, false);
        const itsFound = intersectionTypes
          .map((itype) => {
            const itypeSymbol = itype.getSymbol();
            if (itypeSymbol) return recursiveRootTypeSearch(itypeSymbol);
          })
          .reduce(onceTruth, false);
        return utsFound || itsFound;
      }
      const aliasSymb = decl.getType().getAliasSymbol();
      if (aliasSymb) {
        return recursiveRootTypeSearch(aliasSymb);
      }
      return false;
    })
    .reduce(onceTruth, false);
}

for (const importDeclaration of sourceFile.getImportDeclarations()) {
  //returns "@mui/material"
  const moduleSpecifierValue = importDeclaration.getModuleSpecifierValue();
  const moduleSourceFile = importDeclaration
    .getModuleSpecifierSourceFile()
    ?.getText();
  //wheter (the first 4) imports inside @mui/material/index.ts are relative or not
  const isImpRelativeArray = importDeclaration
    .getModuleSpecifierSourceFile()
    ?.getImportDeclarations()
    .map((val) => val.isModuleSpecifierRelative());
  //gets (the first 4) imports inside @mui/material/index.ts; ["react","@mui/types","./styles","./colors",]
  const moduleSpecifierValueArray = importDeclaration
    .getModuleSpecifierSourceFile()
    ?.getImportDeclarations()
    .map((val) => val.getModuleSpecifierValue());
  const moduleSpecifierSymbol = importDeclaration
    .getModuleSpecifier()
    .getSymbolOrThrow();
  for (const symbol of moduleSpecifierSymbol.getExports()) {
    //console.log(symbol.getName());
    if (
      /*symbol.getName() === "StyledEngineProvider" ||*/ symbol.getName() ===
      "Button"
    ) {
      const searchResult = recursiveRootTypeSearch(symbol);
      console.log(`root type search result for ${symbol.getName()} was: ${searchResult}`);
      // These all return false
      const isFunctionDecl = ts.isFunctionDeclaration(
        (symbol.getDeclarations()[0] as unknown) as ts.Node
      );
      const isJSXExpression = ts.isJsxExpression(
        (symbol.getDeclarations()[0] as unknown) as ts.Node
      );
      const isJSXElement = ts.isJsxElement(
        (symbol.getDeclarations()[0] as unknown) as ts.Node
      );

      const getMembers = symbol.getMembers();
      const getExports = symbol.getExports();
      const compilerSymbol =
        symbol.compilerSymbol.declarations![0].getChildren() ?? "bla";
      const defNodes = symbol.getAliasedSymbol()?.getDeclarations();
      const getAliasedSymbolPlusType = symbol
        .getAliasedSymbol()
        ?.getDeclarations()[0]
        .getFirstChild()
        ?.getType();
      const getAliasedSymbolParent = symbol
        .getAliasedSymbol()
        ?.getValueDeclaration()
        ?.getParent();
      const getDeclarationsType = symbol.getDeclarations()[0].getType();

      const getBaseTypes = symbol
        .getDeclarations()[0]
        .getType()
        .getBaseTypes();

      const getFlags = symbol.getFlags();
      //still the same source file as moduleSourceFile:
      const impDecl = symbol.getDeclarations()[0].getSourceFile();
      const getFullyQualifiedName = symbol.getFullyQualifiedName();
      //gets "JSX":
      getDeclarationsType._compilerType.aliasSymbol.declarations[0].type
        .types[0].type.type.typeName.left.escapedText;
      symbol.getDeclarations().forEach((declaration) => {
        const result = declaration.forEachDescendant((node, traversal) => {
          const subType = node.getType();
          const subBaseType = node.getType().getBaseTypes();
          const alias = node.getType().getAliasSymbol();
          const declType = alias?.getDeclaredType();
          const targetType = subType.getTargetType();
          alias?.getDeclarations().forEach((n, idx) => {
            n.for;
          });
          switch (node.getKind()) {
            case SyntaxKind.TypeAliasDeclaration:
              console.log("is an alias");
              break;
            case SyntaxKind.ClassDeclaration:
              // skips traversal of the current node's descendants
              traversal.skip();
              break;
            case SyntaxKind.Parameter:
              // skips traversal of the current node's descendants and its siblings and all their descendants
              traversal.up();
              break;
            case SyntaxKind.FunctionDeclaration:
              // stops traversal completely
              traversal.stop();
              break;
            case SyntaxKind.InterfaceDeclaration:
              // stops traversal completely and returns this value
              return node;
          }

          return undefined;
        });
      });
      //gets the @mui/material/index.ts console.log(symbol.getDeclarations()[0].getSourceFile());
    }
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
