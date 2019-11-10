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
    const check = data => !!data;
    if (!check(data)) {
        return null;
    }
    let field = data;
    for (let i = 0; i < attrs.length; i += 1 ) {
        field = field[attrs[i]];
        if (!check(field)) {
            return null;
        }
    }
    return field;
}

module.exports = {
    checkAndMakeDirectoriesSync,
    getNestedValue,
};
