const FS = require('fs-extra');
const _ = require('lodash');
const CHALK = require('./chalk');
const LOGGER = require('./logger');
const APP_ROOT_PATH = require('app-root-path');

const CONTEXT = 'build-environment-rewrite-path';

LOGGER.debug(CONTEXT, CHALK.chalkText('Read index file from dist...'));

FS.readFile(`${APP_ROOT_PATH.path}/dist/index.js`).then((index) => {
  const updatedIndex = updateEnvironmentPath(index);

  FS.writeFile(`${APP_ROOT_PATH.path}/dist/index.js`, updatedIndex).then(() => {
    LOGGER.success(CONTEXT, CHALK.chalkText('Index file successfully updated from dist'));
  }).catch((error) => {
    LOGGER.error(CONTEXT, CHALK.chalkText('Failed to update index file from dist'));
    throw new Error(error);
  });
}).catch((error) => {
  LOGGER.error(CONTEXT, CHALK.chalkText('Failed to read index file from dist'));
  throw new Error(error);
});

function updateEnvironmentPath(index) {
  const updatedIndex = _.replace(index, './src/environment/environment.json', './environment.json');

  if (_.isEqual(_.toString(index), _.toString(updatedIndex))) {
    LOGGER.warning(CONTEXT, CHALK.chalkText('Index file from dist was not updated'))
  }

  return updatedIndex;
}
