/**
 * This index file loads all other files within the same directory and exports
 * them as a single module. This makes it easy to import all modules within this
 * directory using a single require statement.
 */

const fs = require('fs');

const modules = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file === 'index.js') return;
  modules[file.replace(/(\.\/|\.js)/g, '')] = require(`./${file}`);
});

module.exports = modules;
