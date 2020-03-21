const CHALK = require('./chalk');
const MOMENT = require('moment');

const LOG_PREFIX = '● ';

function getLogTypePrefix(logType) {
  if (logType === 'error') {
    return CHALK.chalkError(LOG_PREFIX);
  } else if (logType === 'warning') {
    return CHALK.chalkWarning(LOG_PREFIX);
  } else if (logType === 'success') {
    return CHALK.chalkSuccess(LOG_PREFIX);
  } else if (logType === 'log') {
    return CHALK.chalkLog(LOG_PREFIX);
  } else if (logType === 'debug') {
    return CHALK.chalkDebug(LOG_PREFIX);
  }

  return CHALK.chalkDebug(LOG_PREFIX);
}

function context(scope) {
  /* eslint-disable new-cap */
  return CHALK.chalkContext(`[${scope}][${MOMENT().format('HH:mm:ss:SSS')}] `);

  /* eslint-enable new-cap */
}

function error(scope, message) {
  console.log(`${getLogTypePrefix('error')}${context(scope)}${message}`);
}

module.exports.error = error;

function warning(scope, message) {
  console.log(`${getLogTypePrefix('warning')}${context(scope)}${message}`);
}

module.exports.warning = warning;

function success(scope, message) {
  console.log(`${getLogTypePrefix('success')}${context(scope)}${message}`);
}

module.exports.success = success;

function log(scope, message) {
  console.log(`${getLogTypePrefix('log')}${context(scope)}${message}`);
}

module.exports.log = log;

function debug(scope, message) {
  console.log(`${getLogTypePrefix('debug')}${context(scope)}${message}`);
}

module.exports.debug = debug;
