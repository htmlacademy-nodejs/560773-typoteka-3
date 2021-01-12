'use strict';

const fs = require(`fs`);

const {
  getRandomInt,
  shuffle,
  error,
  info
} = require(`../utils`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_COUNT,
  MAX_ANNOUNCE_COUNT,
  TITLES,
  DESCRIPTIONS,
  CATEGORIES
} = require(`./generate.data`);

const _descrLength = DESCRIPTIONS.length;
const _announceLength = _descrLength > MAX_ANNOUNCE_COUNT ? MAX_ANNOUNCE_COUNT : _descrLength;
const _curDate = new Date();
let _oldDate = new Date(_curDate);
_oldDate.setMonth(_oldDate.getMonth() - 3);

const _getRandomObjects = (dataArray, count) => {
  return shuffle(dataArray).slice(0, count);
};

const _getRandomDate = () => {
  return new Date(getRandomInt(_oldDate, _curDate));
};

const generatePosts = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createDate: _getRandomDate(),
    announce: _getRandomObjects(DESCRIPTIONS, getRandomInt(0, _announceLength)).join(` `),
    fullText: _getRandomObjects(DESCRIPTIONS, getRandomInt(_announceLength, _descrLength)).join(` `),
    category: _getRandomObjects(CATEGORIES, getRandomInt(0, _descrLength - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const postCount = Number.parseInt(args, 10) || DEFAULT_COUNT;
    if (postCount > MAX_COUNT) {
      error(`Не больше ${MAX_COUNT} публикаций`);
    }
    const content = JSON.stringify(generatePosts(postCount));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        error(`Что-то пошло не так. Не могу записать данные в файл...`);
      }

      info(`Операция выполнена. Файл mocks.json создан!`);
    });
  }
};
