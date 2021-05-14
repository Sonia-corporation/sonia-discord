const CHALK = require(`./chalk`);
const LOGGER = require(`./logger`);
const CONTEXT = `can-run-post-install`;
// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = require(`lodash`);
const EXIT_CODE = 1;

/**
 * @description
 * The goal of this script is to exit if the environment is the production
 * The husky hooks installation is fucked up on Heroku and create a deployment issue
 */
LOGGER.debug(CONTEXT, CHALK.text(`NODE_ENV: "${_.toString(process.env.NODE_ENV)}"`));

if (_.isEqual(process.env.NODE_ENV, `production`)) {
  LOGGER.debug(CONTEXT, CHALK.text(`Skipping postinstall`));
} else {
  LOGGER.debug(CONTEXT, CHALK.text(`Running postinstall`));

  // Used with || to fallback
  process.exit(EXIT_CODE);
}
