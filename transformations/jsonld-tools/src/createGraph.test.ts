import { describe, expect, test } from '@jest/globals';
import { createGraph } from './createGraph';

describe('creates a basic graph', () => {
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
// local "orphans" like "@id": "_:b0" should have a place
// nodes with "http://..." should have a place
// nodes with a namespace like "uxi:..." should have a place