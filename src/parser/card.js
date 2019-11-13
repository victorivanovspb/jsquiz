'use strict';

const AttributeError = require('./error').AttributeError;
const base = require('./base');

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
    const parse = str => parseAttrString(str);
    const at = card => arg => base.getAttributeFromNode(card, arg);
    const card = base.getNode(data, ['card']);
    const id = at(card)('id');
    const languages = parse(at(card)('languages'));
    const tags = parse(at(card)('tags'));
    const path = base.getFilenameWithoutPath(data.path);
    return { id, path, languages, tags };
}

/**
 * @param {object} data
 * @returns {string}
 * @throws {AttributeError} An exception is thrown when a document does not have a suitable attribute.
 */
function getCardMode(data) {
    const card = base.getNode(data, ['card']); // getNodeCard(data);
    return base.getAttributeFromNode(card, 'mode');
}

/**
 * @param {object} data
 * @returns {array} Returns array of elements ids.
 * @throws {AttributeError}
 */
function getChainInfo(data) {
    const parseIds = (chain) => {
        const result = [];
        const e = chain[0].element;
        for (let i = 0; i < e.length; i += 1) {
            result.push(e[i]['$'].id);
        }
        return result;
    };
    const chain = base.getNode(data, ['card', 'chain']).data;
    return parseIds(chain);
}

module.exports = {
    parseAttrString,
    getCardInfo,
    getCardMode,
    getChainInfo,
};
