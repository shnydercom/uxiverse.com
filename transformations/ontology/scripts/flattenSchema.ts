import { flatten } from "jsonld";
import fs from "fs";
import * as ontologyJSONLDfile from "./../ontology/uxiverse.com.json"

export const flattenSchemaAndSaveToAssets = async () => {
    const flattenedDestination = "./ontology/uxiverse.com.json-flattened.json";
    const ontologyFlattened = await flatten(
        ontologyJSONLDfile as any,
        {},
        {
            base: '',
            // @ts-ignore
            compactArrays: false,
            // typescript @types for jsonld haven't been updated, @ts-ignore
            compactToRelative: false
        }
        , (err) => {
            console.error(err)
        });
    fs.writeFileSync(flattenedDestination, JSON.stringify(ontologyFlattened, undefined, 2), { flag: "w" });

}

flattenSchemaAndSaveToAssets();