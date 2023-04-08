import { JsonLdProcessor, NodeObject } from 'jsonld';
import { createGraph } from './createGraph';
import * as  uxiverseOntologyJSONLDfile from "@uxiverse.com/ontology/ontology/uxiverse.com.json";

const findDuplicates = (arr: string[]) => arr.filter((item, index) => arr.indexOf(item) !== index)

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
// should be able to handle "@value"

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

describe('given flattened uxiverse json-ld without blank nodes and no language specifics, no context supplied', () => {
    test('should contain only IRIs', async () => {
        console.time("flatten graph")
        const uxiverseFlattened = await JsonLdProcessor.flatten(uxiverseOntologyJSONLDfile as any, {})
        console.timeEnd("flatten graph")
        console.time("createGraph");
        const runtimeGraph = createGraph(uxiverseFlattened)
        console.timeEnd("createGraph");
        runtimeGraph.identifiableNodes.forEach((node) => {
            expect(node['@id']).toMatch(new RegExp("http(s)?:\/\/"))
        })
    });
    test('should "define" the same number of entries behind the URL of "https://uxiverse.com/ontology"',
        async () => {
            const uxiverseRootIRI: string = "https://uxiverse.com/ontology#";
            const uxiverseFlattened = await JsonLdProcessor.flatten(uxiverseOntologyJSONLDfile as any, {})
            const runtimeGraph = createGraph(uxiverseFlattened);
            const flattenedUxiEntries = (uxiverseFlattened as any as Array<NodeObject>).filter(
                (nObj) => (nObj['@id'] as string).startsWith(uxiverseRootIRI)
            )
            const rtUxiEntries = runtimeGraph.identifiableNodes.filter((node) => {
                return node['@id'].startsWith(uxiverseRootIRI);
            })
            expect(flattenedUxiEntries.length).toBeGreaterThan(0)
            const duplicates = findDuplicates(rtUxiEntries.map((entry) => entry['@id']))
            expect(duplicates.length).toBe(0)
            expect(rtUxiEntries.length).toEqual(flattenedUxiEntries.length);
        }
    )
});

export default {}