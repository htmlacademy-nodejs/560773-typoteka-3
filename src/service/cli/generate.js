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

const descrLength = DESCRIPTIONS.length;
const announceLength = descrLength > MAX_ANNOUNCE_COUNT ? MAX_ANNOUNCE_COUNT : descrLength;
const curDate = new Date();
let oldDate = new Date(curDate);
oldDate.setMonth(oldDate.getMonth() - 3);

const getRandomObjects = (dataArray, count) => {
  return shuffle(dataArray).slice(0, count);
};

const getRandomDate = () => {
  return new Date(getRandomInt(oldDate, curDate));
};

const generatePosts = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createDate: getRandomDate(),
    announce: getRandomObjects(DESCRIPTIONS, getRandomInt(0, announceLength)).join(` `),
    fullText: getRandomObjects(DESCRIPTIONS, getRandomInt(announceLength, descrLength)).join(` `),
    category: getRandomObjects(CATEGORIES, getRandomInt(0, descrLength - 1)),
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
