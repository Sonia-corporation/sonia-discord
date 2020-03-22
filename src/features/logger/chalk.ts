import chalkI from 'chalk';

const CHALK = new chalkI.Instance();
const COLOR_AURORA_GREEN = '#78E08F';
const COLOR_BLUE_CARACAO = '#3DC1D3';
const COLOR_DEEP_ROSE = '#C44569';
const COLOR_ROSY_HIGHLIGHT = '#F7D794';
const COLOR_WHITE = '#FFFFFF';
const COLOR_SOFT_BLUE = '#778BEB';
const COLOR_PURPLE_MOUNTAIN_MAJESTY = '#786FA6';
const COLOR_SAWTOOTH_AAK = '#F19066';
const COLOR_OLD_GERANIUM = '#CF6A87';

export function chalkSuccess(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_AURORA_GREEN)(message);
}

export function chalkContext(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_ROSY_HIGHLIGHT)(message);
}

export function chalkValue(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_BLUE_CARACAO)(message);
}

export function chalkHint(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_OLD_GERANIUM)(message);
}

export function chalkError(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_DEEP_ROSE)(message);
}

export function chalkWarning(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_SAWTOOTH_AAK)(message);
}

export function chalkText(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_WHITE)(message);
}

export function chalkLog(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_SOFT_BLUE)(message);
}

export function chalkDebug(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_PURPLE_MOUNTAIN_MAJESTY)(message);
}
