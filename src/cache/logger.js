'use strict';

const winston = require('winston');
const check = require('../common/check');
const path = require('path');

const dirPath = '../data/var';
const filename = 'cache-error.json';
check.checkAndMakeDirectoriesSync(dirPath);

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: path.join(dirPath, filename),
            options: { flags: 'w' }
        })
    ]
});

module.exports = {
    logger
};
