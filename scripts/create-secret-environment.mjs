import * as CHALK from './chalk.mjs';
import * as LOGGER from './logger.mjs';
import APP_ROOT_PATH from 'app-root-path';
import FS from 'fs-extra';

const CONTEXT = `create-secret-environment`;

LOGGER.debug(CONTEXT, CHALK.text(`Read secret environment file...`));

FS.access(`${APP_ROOT_PATH.path}/src/environment/secret-environment.json`)
  .then(() => {
    LOGGER.error(CONTEXT, CHALK.text(`Secret environment file already created`));
  })
  .catch(() => {
    LOGGER.debug(CONTEXT, CHALK.text(`Secret environment file not found`));
    LOGGER.debug(CONTEXT, CHALK.text(`Create secret environment file...`));

    FS.createFile(`${APP_ROOT_PATH.path}/src/environment/secret-environment.json`)
      .then(() => {
        LOGGER.success(CONTEXT, CHALK.text(`Secret environment file successfully created`));
        LOGGER.debug(CONTEXT, CHALK.text(`Rewrite secret environment file content...`));

        FS.writeJson(`${APP_ROOT_PATH.path}/src/environment/secret-environment.json`, {
          discord: {
            sonia: {
              devGuildIdWhitelist: [],
              secretToken: `TO_DEFINE_BY_ASKING_IT`,
            },
          },
          github: {
            personalAccessToken: `TO_DEFINE_BY_YOU`,
          },
          profile: {
            discordId: undefined,
            nickname: undefined,
          },
          quote: {
            apiKey: ``,
          },
        })
          .then(() => {
            LOGGER.success(CONTEXT, CHALK.text(`Secret environment file content successfully rewritten`));
            LOGGER.debug(
              CONTEXT,
              CHALK.text(
                `Follow the instructions about the secret environment to update it with the right information and tokens:`
              )
            );
            LOGGER.debug(
              CONTEXT,
              CHALK.text(
                `https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#create-the-secret-environment-file`
              )
            );
          })
          .catch((error) => {
            LOGGER.error(CONTEXT, CHALK.text(`Failed to rewrite secret environment file content`));
            LOGGER.error(CONTEXT, CHALK.text(error));
          });
      })
      .catch((error) => {
        LOGGER.error(CONTEXT, CHALK.text(`Failed to create secret environment file`));
        LOGGER.error(CONTEXT, CHALK.text(error));
      });
  });
