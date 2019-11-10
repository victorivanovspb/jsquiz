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

module.exports = {
    checkAndMakeDirectoriesSync
};
