import { JsonLdProcessor } from "jsonld";
import fs from "fs";
import * as ontologyJSONLDfile from "./../ontology/uxiverse.com.json"

export const flattenSchemaAndSaveToAssets = async () => {
    const flattenedDestination = "./ontology/uxiverse.com-flattened.json";
    const ontologyFlattened = await JsonLdProcessor.flatten(
        ontologyJSONLDfile as any,
        {});
    fs.writeFileSync(flattenedDestination, JSON.stringify(ontologyFlattened, undefined, 2), { flag: "w" });
}

flattenSchemaAndSaveToAssets();