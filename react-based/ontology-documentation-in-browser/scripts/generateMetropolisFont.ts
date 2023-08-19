import { writeFileSync } from "fs"

//this file is necessary because of following error: "Font loader values must be explicitly written literals"

// weights according to: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
const fontWeightMapping = [
    { name: "Black", weight: "900" },
    { name: "Bold", weight: "700" },
    { name: "ExtraBold", weight: "800" },
    { name: "ExtraLight", weight: "200" },
    { name: "Light", weight: "300" },
    { name: "Medium", weight: "500" },
    { name: "Regular", weight: "400" },
    { name: "SemiBold", weight: "600" },
    { name: "Thin", weight: "100" },] as const;

const normal = fontWeightMapping.map((mapping) => {
    return {
        path: `./font/Metropolis-${mapping.name}`,
        weight: mapping.weight,
        style: "normal"
    }
});

const italic = fontWeightMapping.map((mapping) => {
    return {
        path: `./font/Metropolis-${mapping.name}Italic`,
        weight: mapping.weight,
        style: "italic"
    }
})

const arrayContent = [...normal, ...italic];
const fileExportName = "metropolisFontloaderValues"
const fileContent = `export const ${fileExportName} = [${JSON.stringify(arrayContent)}];`

writeFileSync("./src/generated/metropolisFontloaderValues.ts", fileContent)
