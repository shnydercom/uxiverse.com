import { describe, expect, test } from '@jest/globals';
import { createGraph } from './createGraph';

describe('ts jest runner test', () => {
    test('takes a simple object and returns a simple object', () => {
        expect(createGraph({})).toStrictEqual({});
    });
});