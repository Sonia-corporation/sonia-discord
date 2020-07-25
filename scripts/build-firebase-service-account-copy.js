const FS = require(`fs-extra`);
const CHALK = require(`./chalk`);
const LOGGER = require(`./logger`);
const APP_ROOT_PATH = require(`app-root-path`);

const CONTEXT = `build-firebase-service-account-copy`;

LOGGER.debug(
  CONTEXT,
  CHALK.text(`Copy Firebase service account file to dist...`)
);

FS.copy(
  `${APP_ROOT_PATH.path}/src/environment/firebase-service-account-file.json`,
  `${APP_ROOT_PATH.path}/dist/firebase-service-account-file.json`
)
  .then(() => {
    LOGGER.success(
      CONTEXT,
      CHALK.text(`Firebase service account file successfully copied to dist`)
    );
  })
  .catch((error) => {
    LOGGER.error(
      CONTEXT,
      CHALK.text(`Failed to copy Firebase service account file to dist`)
    );
    LOGGER.error(CONTEXT, CHALK.text(error));
    LOGGER.debug(
      CONTEXT,
      CHALK.text(
        `On the CI, this is not a problem since the file should be already set up on the server`
      )
    );
    LOGGER.debug(
      CONTEXT,
      CHALK.text(
        `On local development, it means that you HAVE to create the file`
      )
    );
  });
