import chalkI from 'chalk';

const CHALK = new chalkI.Instance({
  level: 3
});
const COLOR_AURORA_GREEN = '#78E08F';
const COLOR_BLUE_CARACAO = '#3DC1D3';
const COLOR_DEEP_ROSE = '#C44569';
const COLOR_SUMMERTIME = '#F5CD79';
const COLOR_WHITE = '#FFFFFF';

export function chalkSuccess(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_AURORA_GREEN)(message);
}

export function chalkContext(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_SUMMERTIME)(message);
}

export function chalkCyan(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_BLUE_CARACAO)(message);
}

export function chalkRed(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_DEEP_ROSE)(message);
}

export function chalkWhite(message: Readonly<string> | unknown): string {
  return CHALK.hex(COLOR_WHITE)(message);
}
