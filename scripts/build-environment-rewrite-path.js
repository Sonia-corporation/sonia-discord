const FS = require(`fs-extra`);
// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = require(`lodash`);
const CHALK = require(`./chalk`);
const LOGGER = require(`./logger`);
const APP_ROOT_PATH = require(`app-root-path`);

const CONTEXT = `build-environment-rewrite-path`;

function updateEnvironmentPath(index) {
  const updatedIndex = _.replace(
    index,
    `/src/environment/secret-environment.json`,
    `/dist/environment.json`
  );

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
        LOGGER.success(
          CONTEXT,
          CHALK.text(`Index file successfully updated from dist`)
        );
      })
      .catch((error) => {
        LOGGER.error(
          CONTEXT,
          CHALK.text(`Failed to update index file from dist`)
        );
        LOGGER.error(CONTEXT, CHALK.text(error));
      });
  })
  .catch((error) => {
    LOGGER.error(CONTEXT, CHALK.text(`Failed to read index file from dist`));
    LOGGER.error(CONTEXT, CHALK.text(error));
    throw new Error(`The update of the index file from dist failed`);
  });
