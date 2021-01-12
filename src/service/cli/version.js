'use strict';

const packageJsonFile = require(`../../../package.json`);
const {info} = require(`../utils`);

module.exports = {
  name: `--version`,
  run() {
    info(packageJsonFile.version);
  }
};
