'use strict';

const testing = require('./base');
const util = require('util');
const parseString = util.promisify(require('xml2js').parseString);
const AttributeError = require('./error').AttributeError;

describe('src/common/base.js', () => {
    test('getFilenameWithoutPath()', () => {
        expect(testing.getFilenameWithoutPath('./dir/filename.ext')).toBe('filename.ext');
        expect(testing.getFilenameWithoutPath('dir/subdir/filename')).toBe('filename');
        expect(testing.getFilenameWithoutPath('filename')).toBe('filename');
    });
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
    test('get attribute from Card - #1: correct attribute', (done) => {
        const src = '<card id="someID"></card>';
        parseString(src)
            .then((data) => {
                const card = testing.getNode({path: 'path', data }, ['card']);
                const id = testing.getAttributeFromNode(card, 'id');
                expect(id).toBe('someID');
                done();
            });
    });
    test('get attribute from Card - #2: throw AttributeError', (done) => {
        const src = '<card id="someID"></card>';
        parseString(src)
            .then((data) => {
                const t = () => {
                    const card = testing.getNode( {path: 'path', data }, ['card']);
                    return testing.getAttributeFromNode(card, 'anotherAttribute');
                };
                expect(t).toThrow(AttributeError);
                done();
            });
    });
    test('get attribute from Card - #3: throw AttributeError', (done) => {
        const src = '<card></card>';
        parseString(src)
            .then((data) => {
                const t = () => {
                    const card = testing.getNode( {path: 'path', data }, ['card']);
                    return testing.getAttributeFromNode(card, 'anotherAttribute');
                };
                expect(t).toThrow(AttributeError);
                done();
            });
    });
    test('getNestedElementsItem() - #1: correct attribute', (done) => {
        const src = '<card id="value"></card>';
        parseString(src)
            .then((data) => {
                const t = () => {
                    const attrs = ['card', '$', 'id'];
                    return testing.getNestedElementsItem(data, 'path', ...attrs);
                };
                expect(t()).toBe('value');
                done();
            });
    });
    test('getNestedElementsItem() - #2: throw AttributeError', (done) => {
        const src = '<card></card>';
        parseString(src)
            .then((data) => {
                const t = () => {
                    const attrs = ['card', '$', 'id'];
                    return testing.getNestedElementsItem(data, 'path', ...attrs);
                };
                expect(t).toThrow(AttributeError);
                done();
            });
    });
});
