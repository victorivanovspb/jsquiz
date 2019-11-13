'use strict';

const AttributeError = require('./error').AttributeError;

/**
 * @param {object} data
 * @param {array} attrs
 * @returns {object|string|null}
  */
function getNestedValue(data, ...attrs) {
    const f = (acc, item) => {
        if (!acc) {
            return null;
        }
        return acc[item];
    };
    return attrs.reduce(f, data);
}

/**
 * @param {object} data
 * @param {string} path
 * @param {array} attrs
 * @returns {object|string}
 * @throws {AttributeError}
 */
function getNestedElementsItem(data, path, ...attrs) {
    let result = null;
    try {
        result = getNestedValue(data, ...attrs);
    } finally {
        if (!result) {
            throw new AttributeError(`${ path }: ${ attrs[attrs.length] }`);
        }
    }
    return result;
}

/**
 * @param {object} node
 * @param {string} argument
 * @returns {string}
 * @throws {AttributeError}
 */
function getAttributeFromNode(node, argument) {
    const attrs = ['$', argument];
    return getNestedElementsItem(node.data, node.path, ...attrs);
}

/**
 * @param {object} data
 * @param {array} nestedElements
 * @returns {object}
 * @throws {AttributeError}
 */
function getNode(data, nestedElements) {
    const node = Object.assign({}, data); // copies fields from data (data.path, etc)
    node.data = getNestedElementsItem(data.data, data.path, ...nestedElements);
    return node;
}

/**
 * @param {string} name
 * @returns {string}
 */
function getFilenameWithoutPath(name) {
    return name.replace(/^.*[\\\/]/, ''); // eslint-disable-line
}

module.exports = {
    getNestedValue,
    getNestedElementsItem,
    getAttributeFromNode,
    getNode,
    getFilenameWithoutPath,
};
