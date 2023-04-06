import { describe, expect, test } from '@jest/globals';
import { createGraph } from './createGraph';
import * as  uxiverseOntologyJSONLDfile from "@uxiverse.com/ontology/ontology/uxiverse.com.json";
import JsonLdProcessor from 'jsonld';
import jsonLdLint from "jsonld-lint"

describe('given empty input object', () => {
    test('then should return empty output object', async () => {
        expect(createGraph({})).toStrictEqual({});
    });
});
describe('given flattened json-ld without blank nodes and no language specifics', () => {
    test('takes an empty POJO and returns an empty POJO', async () => {
        expect(createGraph({})).toStrictEqual({});
    });
});

describe('given flattened json-ld including blank nodes and no language specifics', () => {
    test('takes an empty POJO and returns an empty POJO', () => {
        expect(createGraph({})).toStrictEqual({});
    });
});

// should be able to handle json-ld keywords
// should be able to handle "@id"
// should be able to handle "@type"

// should create a runtime-graph
// should create a class list
// should create a property list
// should create arbitrary lists
// classes should have a "subclassOf" that resolves to another class-Node
// properties should have a "subPropertyOf" that resolves to another property-Node
// objects should have arbitrary keys that resolve to arbitrary graph nodes

// context should be handled
// blank node identifiers like "@id": "_:b0" should have a place
// nodes with "http://..." should have a place
// nodes with a namespace like "uxi:..." should have a place

describe('given flattened uxiverse json-ld without blank nodes and no language specifics', () => {
    test('takes an empty POJO and returns an empty POJO', async () => {

        const getProcessedUxiverse = await jsonLdLint.process(JSON.stringify(uxiverseOntologyJSONLDfile))
        const getUxiverseFlattened = () => JsonLdProcessor.flatten(uxiverseOntologyJSONLDfile as any)
        const flattenedLD = await getUxiverseFlattened()
        expect(createGraph({})).toStrictEqual({});
    });
});

export default {}