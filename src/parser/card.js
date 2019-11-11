'use strict';

const AttributeError = require('./error').AttributeError;
const base = require('./base');

function getFilenameWithoutPath(name) {
    return name.replace(/^.*[\\\/]/, ''); // eslint-disable-line
}

function getCardAttribute(data, argument) {
    const attrs = ['card', '$', argument];
    return base.getNestedElementsItem(data, ...attrs);
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
    const id = getCardAttribute(data,'id');
    const path = getFilenameWithoutPath(data.path);
    const languages = parseAttrString(getCardAttribute(data, 'languages'));
    const tags = parseAttrString(getCardAttribute(data, 'tags'));
    return { id, path, languages, tags };
}

function getCardMode(data) {
    return getCardAttribute(data,'mode');
}

function getChainInfo(data) {
    return [];
}

module.exports = {
    getFilenameWithoutPath,
    getCardAttribute,
    parseAttrString,
    getCardInfo,
    getCardMode,
    getChainInfo,
};
