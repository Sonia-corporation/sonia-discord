import * as CHALK from './chalk.mjs';
import * as LOGGER from './logger.mjs';
import APP_ROOT_PATH from 'app-root-path';
import FS from 'fs-extra';

const CONTEXT = `build-firebase-service-account-copy`;

LOGGER.debug(CONTEXT, CHALK.text(`Copy Firebase service account file to dist...`));

FS.copy(
  `${APP_ROOT_PATH.path}/src/environment/firebase-service-account-file.json`,
  `${APP_ROOT_PATH.path}/dist/firebase-service-account-file.json`
)
  .then(() => {
    LOGGER.success(CONTEXT, CHALK.text(`Firebase service account file successfully copied to dist`));
  })
  .catch((error) => {
    LOGGER.error(CONTEXT, CHALK.text(`Failed to copy Firebase service account file to dist`));
    LOGGER.error(CONTEXT, CHALK.text(error));
    LOGGER.debug(
      CONTEXT,
      CHALK.text(`On the CI, this is not a problem since the file should be already set up on the server`)
    );
    LOGGER.debug(CONTEXT, CHALK.text(`On local development, it means that you HAVE to create the file`));
  });
