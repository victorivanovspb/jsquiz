'use strict';

const AttributeError = require('./error').AttributeError;
const base = require('./base');

/**
 * @param {string} name
 * @returns {string}
 */
function getFilenameWithoutPath(name) {
    return name.replace(/^.*[\\\/]/, ''); // eslint-disable-line
}

/**
 * @param {object} data
 * @param {string} argument
 * @returns {object|string|null}
 * @throws {AttributeError}
 */
function getCardAttribute(data, argument) {
    const attrs = ['card', '$', argument];
    return base.getNestedElementsItem(data, ...attrs);
}

/**
 * @param {string} str
 * @returns {array}
  */
function parseAttrString(str) {
    const f = (acc, item) => {
        acc.push(item.trim());
        return acc;
    };
    return str.split(',').reduce(f, []);
}

/**
 * @param {object} data
 * @returns {object}
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
