import * as CHALK from './chalk.mjs';
import * as LOGGER from './logger.mjs';
import APP_ROOT_PATH from 'app-root-path';
import FS from 'fs-extra';

const CONTEXT = `build-environment-copy`;

LOGGER.debug(CONTEXT, CHALK.text(`Copy environment file to dist...`));

FS.copy(`${APP_ROOT_PATH.path}/src/environment/secret-environment.json`, `${APP_ROOT_PATH.path}/dist/environment.json`)
  .then(() => {
    LOGGER.success(CONTEXT, CHALK.text(`Environment file successfully copied to dist`));
  })
  .catch((error) => {
    LOGGER.error(CONTEXT, CHALK.text(`Failed to copy environment file to dist`));
    LOGGER.error(CONTEXT, CHALK.text(error));
    LOGGER.debug(
      CONTEXT,
      CHALK.text(`On the CI, this is not a problem since the file should be already set up on the server`)
    );
    LOGGER.debug(
      CONTEXT,
      CHALK.text(
        `On local development, it means that you HAVE to create the file with at least a "discord.sonia.secretToken" inside it`
      )
    );
  });
