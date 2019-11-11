'use strict';

const testing = require('./base');

describe('src/common/base.js', () => {
    test('getNestedValue() - #1', () => {
        const data = {
            'obj': {
                '$': {
                    'attr': 'value',
                }
            }
        };
        const attrs = ['obj', '$', 'attr'];
        const v = testing.getNestedValue(data, ...attrs);
        expect(v).toBe('value');
    });
    test('getNestedValue() - #2', () => {
        const data = {
            objA: {
                objB: {
                    objC: {
                        objD: {
                            $: {
                                a: 'value-a',
                                b: 'value-b',
                                c: 'value-c',
                                d: 'value-d',
                            }
                        }
                    }
                }
            }
        };
        const attrs = ['objA', 'objB', 'objC', 'objD', '$', 'a'];
        const v = testing.getNestedValue(data, ...attrs);
        expect(v).toBe('value-a');
    });
    test('getNestedValue() - #3: source data is empty object', () => {
        const attrs = ['objA', 'objB', 'objC', 'objD'];
        const v = testing.getNestedValue({}, ...attrs);
        expect(v).toBeNull();
    });
    test('getNestedValue() - #4: source data is null', () => {
        const attrs = ['objA', 'objB', 'objC', 'objD'];
        const v = testing.getNestedValue(null, ...attrs);
        expect(v).toBeNull();
    });
    test('getNestedValue() - #5: returns source data', () => {
        const v = testing.getNestedValue({}, ...[]);
        expect(v).not.toBeNull();
        expect(v).toEqual({});
    });
    test('getNestedValue() - #6: returns source data', () => {
        const v = testing.getNestedValue({obj: 'data'}, ...[]);
        expect(v).not.toBeNull();
        expect(v).toEqual({obj: 'data'});
    });
});
