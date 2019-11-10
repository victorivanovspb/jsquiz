'use strict';

const AttributeError = require('./error').AttributeError;
const  check = require('../common/check');

function getFilenameWithoutPath(name) {
    return name.replace(/^.*[\\\/]/, ''); // eslint-disable-line
}

function getAttribute(data, argument) {
    let result = null;
    try {
        const attrs = ['card', '$', argument];
        result = check.getNestedValue(data, ...attrs);
    } finally {
        if (!result) {
            throw new AttributeError(`${ data.path }: ${ argument }`);
        }
    }
    return result;
}

function parseAttrString(str) {
    const f = (acc, item) => {
        acc.push(item.trim());
        return acc;
    };
    return str.split(',').reduce(f, []);
}

/**
 * @param data
 * @throws {AttributeError} An exception is thrown when a document does not have a suitable attribute.
 */
function getCardInfo(data) {
    const id = getAttribute(data.data,'id');
    const path = getFilenameWithoutPath(data.path);
    const languages = parseAttrString(getAttribute(data.data, 'languages'));
    const tags = parseAttrString(getAttribute(data.data, 'tags'));
    return { id, path, languages, tags };
}

module.exports = {
    getFilenameWithoutPath,
    getAttribute,
    parseAttrString,
    getCardInfo,
};
