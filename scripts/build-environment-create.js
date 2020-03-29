const FS = require(`fs-extra`);
const CHALK = require(`./chalk`);
const LOGGER = require(`./logger`);
const APP_ROOT_PATH = require(`app-root-path`);

const CONTEXT = `build-environment-create`;

LOGGER.debug(CONTEXT, CHALK.text(`Create environment file into dist...`));

FS.writeJson(`${APP_ROOT_PATH.path}/dist/environment.json`, {
  discord: {
    sonia: {
      secretToken: `{{ DISCORD_SONIA_SECRET_TOKEN }}`
    }
  },
  github: {
    personalAccessToken: `{{ GITHUB_PERSONAL_ACCESS_TOKEN }}`
  }
}).then(() => {
  LOGGER.success(CONTEXT, CHALK.text(`Environment file successfully created into dist`));
}).catch((error) => {
  LOGGER.error(CONTEXT, CHALK.text(`Failed to create environment file into dist`));
  LOGGER.error(CONTEXT, CHALK.text(error));
});
