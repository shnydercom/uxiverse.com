import * as UXIverse from "@uxiverse.com/ontology/cli-gen/ontology";
import * as JSONLD from "jsonld";

const uxiSchemaContext = { uxi: "https://uxiverse.com/ontology#", "schema": "https://schema.org/" };

/**
 * typescript: works with uxi:-prefix and schema:-prefix
 */
const testButton: UXIverse.WithContext<UXIverse.Button> = {
	"@context": { "uxi": "https://uxiverse.com/ontology#", "schema": "https://schema.org/" },// uxiSchemaContext produces type-error
	"@type": "uxi:Button",
	"uxi:isProminent": true,
	"@id": "testButton",
	"schema:name": "A very rare and beautiful button",
	"uxi:valueText": "Click Me!"
}
console.log("starting with this:-------");
console.dir(testButton);
/**
 * creates json from the above json-ld, with the graph based on uxiverse
 */
async function manuallyTestJSONLD() {
	console.log("expanded result: ------");
	const expandedTestButton = await JSONLD.expand(testButton);
	console.dir(expandedTestButton);
	console.log("flattened result: ------");
	const flattenedTestButton = await JSONLD.flatten(testButton);
	console.dir(flattenedTestButton);
	console.log("relative to uxiverse:-------")
	const uxiTestButton = await JSONLD.compact(testButton, { "@vocab": "https://uxiverse.com/ontology#" });
	console.dir(uxiTestButton);
	console.log("relative to schema:-------")
	const schemaTestButton = await JSONLD.compact(testButton, { "@vocab": "https://schema.org/" });
	console.dir(schemaTestButton);
	console.log("relative to uxiverse and schema:--------")
	const uxiSchemaTestButton = await JSONLD.compact(testButton, uxiSchemaContext);
	console.dir(uxiSchemaTestButton);
}
manuallyTestJSONLD();