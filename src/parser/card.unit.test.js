'use strict';

const testing = require('./card');
const util = require('util');
const parseString = util.promisify(require('xml2js').parseString);
const AttributeError = require('./error').AttributeError;

describe('src/parser/card.js', () => {
    test('getFilenameWithoutPath()', () => {
        expect(testing.getFilenameWithoutPath('./dir/filename.ext')).toBe('filename.ext');
        expect(testing.getFilenameWithoutPath('dir/subdir/filename')).toBe('filename');
        expect(testing.getFilenameWithoutPath('filename')).toBe('filename');
    });
    test('parseAttrString()', () => {
        expect(testing.parseAttrString('a, b, c')).toEqual(['a', 'b', 'c']);
    });
    test('getCardInfo() - #1', (done) => {
        const src = '<card id=\"someID\" languages=\"ru, en\" tags=\"a, b, c\"></card>';
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
});
