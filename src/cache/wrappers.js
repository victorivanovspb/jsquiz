'use strict';

const fs = require('fs');
const xml = require('xml2js');

/**
 * Wrapper function (wraps fs.readFile) for storing file path.
 * The path to the file is necessary during further processing of the content and logging errors.
 */
function readFileWrapper(pathToFile, cb) {
    fs.readFile(pathToFile, (err, data) => {
        cb(err, {
            'path': pathToFile,
            'data': data,
        });
    });
}

/**
 * Creates wrapper function (wraps xml.parseString function) for storing file path.
 * The path to the file is necessary during further processing of the content and logging errors.
 */
function createXmlParseStringWrapper(pathToFile) {
    return function (str, cb) {
        xml.parseString(str, (err, data) => {
            cb(err, {
                'path': pathToFile,
                'data': data
            });
        });
    };
}

module.exports = {
    readFileWrapper,
    createXmlParseStringWrapper
};
