import { Project } from "ts-morph";

const project = new Project();


const sourceFiles = project.addSourceFilesAtPaths("lib/**/*{.d.ts,.ts}");
//const sourceFile = project.getSourceFileOrThrow("./lib/Button.d.ts");

const personInterface = sourceFiles[1].getInterfaces();

console.log("bla " + personInterface[0].getName());