'use strict';

const fs = require('fs');

/**
 * This function iteratively checks (existsSync) all directories and subdirectories specified in the transmitted
 * string *@param path) and creates (mkdirSync) directories if they do not exist.
 * @param {string} path
 * @returns {undefined}
 */
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
    checkAndMakeDirectoriesSync,
};
