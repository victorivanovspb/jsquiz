'use strict';

const testing = require('./card');
const util = require('util');
const parseString = util.promisify(require('xml2js').parseString);
const AttributeError = require('./error').AttributeError;

describe('src/parser/card.js', () => {
    test('parseAttrString()', () => {
        expect(testing.parseAttrString('a, b, c')).toEqual(['a', 'b', 'c']);
    });
    test('getCardInfo() - #1', (done) => {
        const src = '<card id="someID" languages="ru, en" tags="a, b, c"></card>';
        parseString(src)
            .then((data) => {
                const { id, path, languages, tags } = testing.getCardInfo({ path: './dir/filename', data });
                expect(id).toBe('someID');
                expect(path).toBe('filename');
                expect(languages).toEqual(['ru', 'en']);
                expect(tags).toEqual(['a', 'b', 'c']);
                done();
            });
    });
    test('getCardInfo() - #2: throw AttributeError', (done) => {
        const src = '<card></card>';
        parseString(src)
            .then((data) => {
                const t = () => testing.getCardInfo({ path: './dir/filename', data });
                expect(t).toThrow(AttributeError);
                done();
            });
    });
    test('getCardMode() - #1: enabled', (done) => {
        const src = '<card mode="enabled"></card>';
        parseString(src)
            .then((data) => {
                const m = testing.getCardMode({ path: 'example', data });
                expect(m).toBe('enabled');
                done();
            });
    });
    test('getCardMode() - #2: disabled', (done) => {
        const src = '<card mode="disabled"></card>';
        parseString(src)
            .then((data) => {
                const m = testing.getCardMode({ path: 'example', data });
                expect(m).toBe('disabled');
                done();
            });
    });
    test('getCardMode() - #3: throw AttributeError', (done) => {
        const src = '<card></card>';
        parseString(src)
            .then((data) => {
                const t = () => testing.getCardMode( { path: 'example', data });
                expect(t).toThrow(AttributeError);
                done();
            });
    });
    test('getChainInfo() - #1', (done) => {
        const src = '<card><chain><element id="1"></element><element id="2"></element></chain></card>';
        parseString(src)
            .then((data) => {
                const t = () => testing.getChainInfo( { path: 'example', data });
                expect(t()).toEqual(['1', '2']);
                done();
            });
    });
    test('getChainInfo() - #2', (done) => {
        const src = '<card></card>';
        parseString(src)
            .then((data) => {
                const t = () => testing.getChainInfo( { path: 'example', data });
                expect(t).toThrow(AttributeError);
                done();
            });
    });
});
