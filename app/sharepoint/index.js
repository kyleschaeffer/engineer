/**
 * This index file loads all other files within the same directory and exports
 * them as a single module.
 */

const fs = require('fs');

const modules = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file === 'index.js') return;
  modules[file.replace(/(\.\/|\.js)/g, '')] = require(`./${file}`);
});

module.exports = modules;
