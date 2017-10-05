const fs = require('fs');

const modules = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file === 'index.js') return;
  modules[file.replace(/(\.\/|\.js)/g, '')] = require(`./${file}`);
});

module.exports = modules;
