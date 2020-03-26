const CHALK = require(`./chalk`);
const MOMENT = require(`moment`);

const LOG_PREFIX = `● `;

function _getLogTypePrefix(logType) {
  return CHALK[ logType ](LOG_PREFIX);
}

function _getContext(scope) {
  /* eslint-disable new-cap */
  return CHALK.context(`[${scope}][${MOMENT().format(`HH:mm:ss:SSS`)}] `);

  /* eslint-enable new-cap */
}

function error(scope, message) {
  console.log(`${_getLogTypePrefix(`error`)}${_getContext(scope)}${message}`);
}

module.exports.error = error;

function warning(scope, message) {
  console.log(`${_getLogTypePrefix(`warning`)}${_getContext(scope)}${message}`);
}

module.exports.warning = warning;

function success(scope, message) {
  console.log(`${_getLogTypePrefix(`success`)}${_getContext(scope)}${message}`);
}

module.exports.success = success;

function log(scope, message) {
  console.log(`${_getLogTypePrefix(`log`)}${_getContext(scope)}${message}`);
}

module.exports.log = log;

function debug(scope, message) {
  console.log(`${_getLogTypePrefix(`debug`)}${_getContext(scope)}${message}`);
}

module.exports.debug = debug;
