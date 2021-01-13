'use strict';

const {
  ExitCode
} = require(`./constants`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const error = (message) => {
  console.error(message);
  process.exit(ExitCode.ERROR);
};

const info = (message) => {
  console.info(message);
  process.exit(ExitCode.SUCCESS);
};

module.exports = {
  getRandomInt,
  shuffle,
  error,
  info
};
