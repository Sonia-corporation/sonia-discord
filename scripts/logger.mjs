import * as CHALK from './chalk.mjs';
import _ from 'lodash';
import MOMENT from 'moment-timezone';

const LOG_PREFIX = `● `;

/**
 * @param logType
 */
function getLogTypePrefix(logType) {
  return CHALK[logType](LOG_PREFIX);
}

/**
 * @param scope
 */
function getContext(scope) {
  /* eslint-disable new-cap */
  return CHALK.context(`[${_.toString(scope)}][${MOMENT().format(`HH:mm:ss:SSS`)}] `);

  /* eslint-enable new-cap */
}

/**
 * @param scope
 * @param message
 */
export function error(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`error`))}${getContext(scope)}${_.toString(message)}`);
}

/**
 * @param scope
 * @param message
 */
export function warning(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`warning`))}${getContext(scope)}${_.toString(message)}`);
}

/**
 * @param scope
 * @param message
 */
export function success(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`success`))}${getContext(scope)}${_.toString(message)}`);
}

/**
 * @param scope
 * @param message
 */
export function log(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`log`))}${getContext(scope)}${_.toString(message)}`);
}

/**
 * @param scope
 * @param message
 */
export function debug(scope, message) {
  console.log(`${_.toString(getLogTypePrefix(`debug`))}${getContext(scope)}${_.toString(message)}`);
}
