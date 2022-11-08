import * as CHALK from './chalk.mjs';
import * as LOGGER from './logger.mjs';
import APP_ROOT_PATH from 'app-root-path';
import FS from 'fs-extra';
import _ from 'lodash';

const CONTEXT = `build-environment-rewrite-path`;

/**
 * @param index
 */
function updateEnvironmentPath(index) {
  const updatedIndex = _.replace(_.toString(index), `/src/environment/secret-environment.json`, `/environment.json`);

  if (_.isEqual(_.toString(index), _.toString(updatedIndex))) {
    LOGGER.warning(CONTEXT, CHALK.text(`Index file from dist was not updated`));
  }

  return updatedIndex;
}

LOGGER.debug(CONTEXT, CHALK.text(`Read index file from dist...`));

FS.readFile(`${APP_ROOT_PATH.path}/dist/index.js`)
  .then((index) => {
    const updatedIndex = updateEnvironmentPath(index);

    LOGGER.debug(CONTEXT, CHALK.text(`Update index file from dist...`));

    FS.writeFile(`${APP_ROOT_PATH.path}/dist/index.js`, updatedIndex)
      .then(() => {
        LOGGER.success(CONTEXT, CHALK.text(`Index file successfully updated from dist`));
      })
      .catch((error) => {
        LOGGER.error(CONTEXT, CHALK.text(`Failed to update index file from dist`));
        LOGGER.error(CONTEXT, CHALK.text(error));
      });
  })
  .catch((error) => {
    LOGGER.error(CONTEXT, CHALK.text(`Failed to read index file from dist`));
    LOGGER.error(CONTEXT, CHALK.text(error));
    throw new Error(`The update of the index file from dist failed`);
  });
