import {
  Symbol as TSSymbol,
  FunctionDeclaration,
  InterfaceDeclaration,
  ExportSpecifier,
  CallSignatureDeclaration,
  SourceFile,
} from "ts-morph";

export interface ExportsMatcherSummary {
  matchingExports: string[];
  otherExports: string[];
}

export function retrieveReactAndJSXexportsFromSourceFile(
  sourceFile: SourceFile,
  isLogging: boolean = false
): ExportsMatcherSummary {
  const rv: ExportsMatcherSummary = { matchingExports: [], otherExports: [] };
  for (const importDeclaration of sourceFile.getImportDeclarations()) {
    const moduleSpecifierSymbol = importDeclaration
      .getModuleSpecifier()
      .getSymbolOrThrow();
    for (const symbol of moduleSpecifierSymbol.getExports()) {
      const symbolName = symbol.getName();
      const searchResult = recursiveRootTypeSearch(
        symbol,
        ["ReactElement", "JSX.Element"],
        false
      );
      if (searchResult) {
        rv.matchingExports.push(symbolName);
      } else {
        rv.otherExports.push(symbolName);
      }
      if (isLogging)
        console.log(
          `root type search result for ${symbolName} was: ${searchResult}`
        );
    }
  }
  return rv;
}

export function recursiveRootTypeSearch(
  symb: TSSymbol,
  acceptedInterfaceNames: string[] = [],
  isLogging: boolean = false
): boolean {
  return !!symb
    .getDeclarations()
    .map((decl) => {
      if (!decl.compilerNode.parent) {
        if (isLogging) console.log("decl has no parent");
        return false;
      }
      const kindName = decl.getKindName();
      const declType = decl.getType();
      //"work" code to search and find
      if (kindName === "CallSignature" || kindName === "FunctionDeclaration") {
        const callSig = decl as CallSignatureDeclaration | FunctionDeclaration;
        const callSigReturnTypeSymbol = callSig
          .getReturnType()
          .getAliasSymbol();
        const returnTypeText = callSig.getReturnType().getText();
        if (
          acceptedInterfaceNames.findIndex(
            (acceptedInterfaceName) => acceptedInterfaceName === returnTypeText
          ) >= 0
        ) {
          if (isLogging)
            console.log(
              `found call signature with return type: ${returnTypeText}`
            );
          return true;
        }
        if (callSigReturnTypeSymbol)
          return recursiveRootTypeSearch(
            symb,
            acceptedInterfaceNames,
            isLogging
          );
      }
      if (kindName === "InterfaceDeclaration") {
        const idecl = decl as InterfaceDeclaration;
        const ideclName = idecl.getName();
        if (
          acceptedInterfaceNames.findIndex(
            (acceptedInterfaceName) => acceptedInterfaceName === ideclName
          ) >= 0
        ) {
          if (isLogging)
            console.log(`found declaration with name: ${ideclName}`);
          return true;
        }
        const extensions = idecl.getExtends();
        if (extensions.length > 0) {
          return extensions
            .map((extendsClause) => {
              const extClauseSymbol = extendsClause.getType().getSymbol();
              if (extClauseSymbol)
                return recursiveRootTypeSearch(
                  extClauseSymbol,
                  acceptedInterfaceNames,
                  isLogging
                );
            })
            .reduce(onceTruth, false);
        }
        return idecl
          .getMembers()
          .map((member) => {
            const memberSymbol = member.getSymbol();
            if (memberSymbol) {
              return recursiveRootTypeSearch(
                memberSymbol,
                acceptedInterfaceNames,
                isLogging
              );
            }
          })
          .reduce(onceTruth, false);
      }
      //traversal code
      if (kindName === "FunctionType") {
        const fnReturnTypeSymbol = (decl as FunctionDeclaration)
          .getReturnType()
          .getSymbol();
        if (fnReturnTypeSymbol)
          return recursiveRootTypeSearch(
            fnReturnTypeSymbol,
            acceptedInterfaceNames,
            isLogging
          );
      }
      if (kindName === "TypeAliasDeclaration") {
        const unionTypes = declType.getUnionTypes();
        const intersectionTypes = declType.getIntersectionTypes();
        const utsFound = unionTypes
          .map((utype) => {
            const utypeSymbol = utype.getSymbol();
            if (utypeSymbol)
              return recursiveRootTypeSearch(
                utypeSymbol,
                acceptedInterfaceNames,
                isLogging
              );
          })
          .reduce(onceTruth, false);
        const itsFound = intersectionTypes
          .map((itype) => {
            const itypeSymbol = itype.getSymbol();
            if (itypeSymbol)
              return recursiveRootTypeSearch(
                itypeSymbol,
                acceptedInterfaceNames,
                isLogging
              );
          })
          .reduce(onceTruth, false);
        return utsFound || itsFound;
      }
      const aliasSymb = decl.getType().getAliasSymbol();
      if (aliasSymb) {
        return recursiveRootTypeSearch(
          aliasSymb,
          acceptedInterfaceNames,
          isLogging
        );
      }
      if (kindName === "ExportSpecifier") {
        const exportTypeSymbol = (decl as ExportSpecifier)
          .getType()
          .getSymbol();
        if (exportTypeSymbol) {
          return recursiveRootTypeSearch(
            exportTypeSymbol,
            acceptedInterfaceNames,
            isLogging
          );
        }
      }
      return false;
    })
    .reduce(onceTruth, false);
}

const onceTruth = (pV?: boolean, cV?: boolean) => {
  return pV || cV;
};
