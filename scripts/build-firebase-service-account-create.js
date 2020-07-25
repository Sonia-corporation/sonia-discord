const FS = require(`fs-extra`);
const CHALK = require(`./chalk`);
const LOGGER = require(`./logger`);
const APP_ROOT_PATH = require(`app-root-path`);

const CONTEXT = `build-firebase-service-account-create`;

LOGGER.debug(
  CONTEXT,
  CHALK.text(`Create Firebase service account file into dist...`)
);

FS.createFile(`${APP_ROOT_PATH.path}/dist/firebase-service-account-file.json`)
  .then(() => {
    LOGGER.success(
      CONTEXT,
      CHALK.text(`Firebase service account file successfully created into dist`)
    );
    LOGGER.debug(
      CONTEXT,
      CHALK.text(`Rewrite Firebase service account file content into dist...`)
    );

    FS.writeJson(
      `${APP_ROOT_PATH.path}/dist/firebase-service-account-file.json`,
      {
        /* eslint-disable @typescript-eslint/naming-convention */
        auth_provider_x509_cert_url: `https://www.googleapis.com/oauth2/v1/certs`,
        auth_uri: `https://accounts.google.com/o/oauth2/auth`,
        client_email:
          process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL || `unknown`,
        client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID || `unknown`,
        client_x509_cert_url:
          process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL ||
          `unknown`,
        private_key:
          process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY || `unknown`,
        private_key_id:
          process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID || `unknown`,
        project_id: `sonia-il-est-midi-discord-api`,
        token_uri: `https://oauth2.googleapis.com/token`,
        type: `service_account`,
        /* eslint-enable @typescript-eslint/naming-convention */
      }
    )
      .then(() => {
        LOGGER.success(
          CONTEXT,
          CHALK.text(
            `Firebase service account file content successfully rewritten into dist`
          )
        );
      })
      .catch((error) => {
        LOGGER.error(
          CONTEXT,
          CHALK.text(
            `Failed to rewrite Firebase service account file content into dist`
          )
        );
        LOGGER.error(CONTEXT, CHALK.text(error));
      });
  })
  .catch((error) => {
    LOGGER.error(
      CONTEXT,
      CHALK.text(`Failed to create Firebase service account file into dist`)
    );
    LOGGER.error(CONTEXT, CHALK.text(error));
  });
