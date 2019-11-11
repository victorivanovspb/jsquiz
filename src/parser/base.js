'use strict';

const AttributeError = require('./error').AttributeError;

function getNestedValue(data, ...attrs) {
    const f = (acc, item) => {
        if (!acc) {
            return null;
        }
        return acc[item];
    };
    return attrs.reduce(f, data);
}

function getNestedElementsItem(data, ...attrs) {
    let result = null;
    try {
        result = getNestedValue(data.data, ...attrs);
    } finally {
        if (!result) {
            throw new AttributeError(`${ data.path }: ${ attrs[attrs.length] }`);
        }
    }
    return result;
}

module.exports = {
    getNestedValue,
    getNestedElementsItem,
};
