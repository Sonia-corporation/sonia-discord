import { Chalk } from 'chalk';

const CHALK = new Chalk();
const COLOR_AURORA_GREEN = `#78E08F`;
const COLOR_BLUE_CARACAO = `#3DC1D3`;
const COLOR_DEEP_ROSE = `#C44569`;
const COLOR_ROSY_HIGHLIGHT = `#F7D794`;
const COLOR_WHITE = `#FFFFFF`;
const COLOR_SOFT_BLUE = `#778BEB`;
const COLOR_PURPLE_MOUNTAIN_MAJESTY = `#786FA6`;
const COLOR_SAWTOOTH_AAK = `#F19066`;

/**
 * @param message
 */
export function success(message) {
  return CHALK.hex(COLOR_AURORA_GREEN)(message);
}

/**
 * @param message
 */
export function context(message) {
  return CHALK.hex(COLOR_ROSY_HIGHLIGHT)(message);
}

/**
 * @param message
 */
export function value(message) {
  return CHALK.hex(COLOR_BLUE_CARACAO)(message);
}

/**
 * @param message
 */
export function error(message) {
  return CHALK.hex(COLOR_DEEP_ROSE)(message);
}

/**
 * @param message
 */
export function warning(message) {
  return CHALK.hex(COLOR_SAWTOOTH_AAK)(message);
}

/**
 * @param message
 */
export function text(message) {
  return CHALK.hex(COLOR_WHITE)(message);
}

/**
 * @param message
 */
export function log(message) {
  return CHALK.hex(COLOR_SOFT_BLUE)(message);
}

/**
 * @param message
 */
export function debug(message) {
  return CHALK.hex(COLOR_PURPLE_MOUNTAIN_MAJESTY)(message);
}
