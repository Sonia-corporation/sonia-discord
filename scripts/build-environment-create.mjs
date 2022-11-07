import * as CHALK from './chalk.mjs';
import * as LOGGER from './logger.mjs';
import APP_ROOT_PATH from 'app-root-path';
import FS from 'fs-extra';

const CONTEXT = `build-environment-create`;

LOGGER.debug(CONTEXT, CHALK.text(`Create environment file into dist...`));

FS.createFile(`${APP_ROOT_PATH.path}/dist/environment.json`)
  .then(() => {
    LOGGER.success(CONTEXT, CHALK.text(`Environment file successfully created into dist`));
    LOGGER.debug(CONTEXT, CHALK.text(`Rewrite environment file content into dist...`));

    FS.writeJson(`${APP_ROOT_PATH.path}/dist/environment.json`, {
      discord: {
        sonia: {
          secretToken: process.env.DISCORD_SONIA_SECRET_TOKEN || `unknown`,
        },
      },
      github: {
        personalAccessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN || `unknown`,
      },
      quote: {
        apiKey: process.env.QUOTE_API_KEY || `unknown`,
      },
    })
      .then(() => {
        LOGGER.success(CONTEXT, CHALK.text(`Environment file content successfully rewritten into dist`));
      })
      .catch((error) => {
        LOGGER.error(CONTEXT, CHALK.text(`Failed to rewrite environment file content into dist`));
        LOGGER.error(CONTEXT, CHALK.text(error));
      });
  })
  .catch((error) => {
    LOGGER.error(CONTEXT, CHALK.text(`Failed to create environment file into dist`));
    LOGGER.error(CONTEXT, CHALK.text(error));
  });
