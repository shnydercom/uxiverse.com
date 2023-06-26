import { Project } from "ts-morph";

import { retrieveReactAndJSXexportsFromSourceFile } from "./retrieve-react-and-jsx-from-sourcefile";

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

const reactJSXexports = retrieveReactAndJSXexportsFromSourceFile(
  sourceFile,
  true
);
console.log(reactJSXexports);
