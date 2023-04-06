import * as  uxiverseOntologyJSONLDfile from "@uxiverse.com/ontology/ontology/uxiverse.com.json";
import JsonLdProcessor from 'jsonld';

describe('given flattened uxiverse json-ld without blank nodes and no language specifics', () => {
    test('flattening without context should run under 50ms on average, on 1000 iterations', async () => {
        const preTestTime = Date.now();
        const numIterations = 1000;
        for (let index = 0; index < numIterations; index++) {
            const uxiverseFlattened = await JsonLdProcessor.flatten(uxiverseOntologyJSONLDfile as any)
        }
        const postTestTime = Date.now();
        const averageRuntime = (postTestTime - preTestTime) / numIterations;
        // 7-8ms
        console.log(`average runtime was ${averageRuntime}`)
        expect(averageRuntime).toBeLessThan(50);
    });
    test('flattening with a copy of the original context should run under 50ms on average, on 1000 iterations', async () => {
        const preTestTime = Date.now();
        const numIterations = 1000;
        for (let index = 0; index < numIterations; index++) {
            const uxiverseContext = uxiverseOntologyJSONLDfile["@context"]
            const uxiverseFlattened = await JsonLdProcessor.flatten(uxiverseOntologyJSONLDfile as any, uxiverseContext as JsonLdProcessor.ContextDefinition)
        }
        const postTestTime = Date.now();
        const averageRuntime = (postTestTime - preTestTime) / numIterations;
        // 19-20ms
        console.log(`average runtime was ${averageRuntime}`)
        expect(averageRuntime).toBeLessThan(50);
    });
});
