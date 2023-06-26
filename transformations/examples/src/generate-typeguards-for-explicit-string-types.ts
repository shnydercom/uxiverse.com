import {
    Symbol as TSSymbol,
    FunctionDeclaration,
    InterfaceDeclaration,
    ExportSpecifier,
    CallSignatureDeclaration,
    SourceFile,
} from "ts-morph";

/**
 * the type-keys the algorithm looks for
 */
const typeKeys = ["type", "@type"]

/**
 * searches a single typescript source file and generates type guards
 * @param sourceFile the sourceFile that ts-morph can work on
 * @param isLoggingInRecursion if true, prints debug messages to the console in the recursive function(s) while traversing the syntax tree
 * @returns typescript-code with type guards
 */
export function generateTypeguardsForExplicitStringTypes(
    sourceFile: SourceFile,
    isLoggingInRecursion: boolean = false
): string {
    let result: string = "";
    const interfaces = sourceFile.getInterfaces();
    return result;
}