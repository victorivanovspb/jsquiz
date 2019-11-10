'use strict';

const fs = require('fs');

function checkAndMakeDirectoriesSync(path) {
    const mass = path.split('/');
    let dir = '';
    for (let i = 0; i < mass.length; i++) {
        dir += mass[i] + '/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
}

function getNestedValue(data, ...attrs) {
    const f = (acc, item) => {
        if (!acc) {
            return null;
        }
        return acc[item];
    };
    return attrs.reduce(f, data);
}

module.exports = {
    checkAndMakeDirectoriesSync,
    getNestedValue,
};
