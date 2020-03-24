const FS = require(`fs-extra`);
const _ = require(`lodash`);
const MOMENT = require(`moment`);
const CHALK = require(`./chalk`);
const LOGGER = require(`./logger`);
const APP_ROOT_PATH = require(`app-root-path`);

const CONTEXT = `build-update-app-initialization-date`;

function updateEnvironmentAppInitializationDate(environment) {
  if (!_.has(environment, `app`)) {
    environment.app = {};
  }

  // eslint-disable-next-line new-cap
  environment.app.initializationDate = MOMENT().format();

  return environment;
}

LOGGER.debug(CONTEXT, CHALK.chalkText(`Read environment file from dist folder...`));

FS.readJson(`${APP_ROOT_PATH.path}/dist/environment.json`).then((environment) => {
  const updatedEnvironment = updateEnvironmentAppInitializationDate(environment);

  LOGGER.debug(CONTEXT, CHALK.chalkText(`Update environment app initialization date inside dist folder...`));

  FS.writeJson(`${APP_ROOT_PATH.path}/dist/environment.json`, updatedEnvironment).then(() => {
    LOGGER.success(CONTEXT, CHALK.chalkText(`Environment app initialization date successfully updated inside dist folder`));
  }).catch((error) => {
    LOGGER.error(CONTEXT, CHALK.chalkText(`Failed to update environment app initialization date inside dist folder`));
    LOGGER.error(CONTEXT, CHALK.chalkText(error));
  });
}).catch((error) => {
  LOGGER.error(CONTEXT, CHALK.chalkText(`Failed to read environment file from dist folder`));
  LOGGER.error(CONTEXT, CHALK.chalkText(error));
  throw new Error(`The update of the environment file from dist folder failed`);
});
