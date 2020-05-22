const CHALK = require(`./chalk`);
const MOMENT = require(`moment-timezone`);

const LOG_PREFIX = `● `;

function getLogTypePrefix(logType) {
  return CHALK[logType](LOG_PREFIX);
}

function getContext(scope) {
  /* eslint-disable new-cap */
  return CHALK.context(`[${scope}][${MOMENT().format(`HH:mm:ss:SSS`)}] `);

  /* eslint-enable new-cap */
}

function error(scope, message) {
  console.log(`${getLogTypePrefix(`error`)}${getContext(scope)}${message}`);
}

module.exports.error = error;

function warning(scope, message) {
  console.log(`${getLogTypePrefix(`warning`)}${getContext(scope)}${message}`);
}

module.exports.warning = warning;

function success(scope, message) {
  console.log(`${getLogTypePrefix(`success`)}${getContext(scope)}${message}`);
}

module.exports.success = success;

function log(scope, message) {
  console.log(`${getLogTypePrefix(`log`)}${getContext(scope)}${message}`);
}

module.exports.log = log;

function debug(scope, message) {
  console.log(`${getLogTypePrefix(`debug`)}${getContext(scope)}${message}`);
}

module.exports.debug = debug;
