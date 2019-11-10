'use strict';

const AttributeError = require('./error').AttributeError;

/**
 * @param data
 * @throws {AttributeError} An exception is thrown when a document does not have a suitable attribute.
 */
function getCardInfo(data) {
    const getFilenameWithoutPath = n => n.replace(/^.*[\\\/]/, '');
    const getAttribute = (argument) => {
        const result = data.data['card']['$'][argument];
        if (result === undefined) {
            throw new AttributeError(`${data.path}: ${argument}`);
        }
        return result;
    };
    const parse = (data, argument) => {
        const f = (acc, item) => {
            acc.push(item.trim());
            return acc;
        };
        return getAttribute(argument)
            .split(',')
            .reduce(f, []);
    };

    let result = {};
    try {
        const id = getAttribute('id'); // data['card']['$']['id'];
        const path = getFilenameWithoutPath(data.path);
        const languages = parse(data.data, 'languages');
        const tags = parse(data.data, 'tags');
        result = { id, path, languages, tags };
    } catch (e) {
        throw e;
    }
    return result;
}

module.exports = {
    getCardInfo
};
