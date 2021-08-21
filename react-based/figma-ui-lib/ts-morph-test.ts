import { Project } from "ts-morph";

const project = new Project();


const sourceFiles = project.addSourceFilesAtPaths("lib/**/*{.d.ts,.ts}");
//const sourceFile = project.getSourceFileOrThrow("./lib/Button.d.ts");

const personInterface = sourceFiles[2].getInterfaces();

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