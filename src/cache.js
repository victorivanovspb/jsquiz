'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');

const parser = require('./parser/card');
const AttributeError = require('./parser/error').AttributeError;

const logger = require('./cache/logger').logger;
const wrappers = require('./cache/wrappers');
const readFile = util.promisify(wrappers.readFileWrapper);
const readDirectory = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

function updateCache(dirPath) {
    const readAllFilesFromList = (list) => {
        const promises = list.map(filename => readFile(path.join(dirPath, filename)));
        return Promise.all(promises);
    };
    const someStupidCode = (contents) => { // :-)))
        const m = [];
        contents.map(data => m.push(data));
        return new Promise((resolve, reject) => {
            Promise
                .resolve(m)
                .then(m => resolve(m));
        });
    };
    const parseXmlData = (contents) => {
        const f = (item) => {
            const wrapper = wrappers.createXmlParseStringWrapper(item.path);
            const parseXml = util.promisify(wrapper);
            return parseXml(item.data);
        };
        const promises = contents.map(f);
        return Promise.all(promises);
    };
    const parseCardInfo = (mass) => {
        const f = (acc, item) => {
            try {
                const card = parser.getCardInfo(item);
                acc[card.id] = card;
            } catch (e) {
                if (e instanceof AttributeError) {
                    logger.error({ message: e.message });
                } else {
                    throw e;
                }
            }
            return acc;
        };
        return mass.reduce(f, {});
    };
    const saveCache = (cache) => {
        const filepath = path.join('../data/var', 'cache.json');
        const writeCache = () => {
            const data = JSON.stringify({ cards: cache }, undefined, 2);
            return writeFile(filepath, data);
        };
        return unlink(filepath)
            .then(writeCache)
            .catch(writeCache); // "catched" when we cannot unlink file (no such file)
    };

    return readDirectory(dirPath)
        .then(list => readAllFilesFromList(list))
        .then(contents => someStupidCode(contents)) // you may comment this line and nothing will happen
        .then(contents => parseXmlData(contents))
        .then(mass => parseCardInfo(mass))
        .then(cache => saveCache(cache));
}

async function start(dirPath) {
    const mass = await updateCache(dirPath);
    console.log('result:', mass);
}

start('../data/cards');
