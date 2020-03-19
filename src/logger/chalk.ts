const chalkI = require('chalk');
const chalk = new chalkI.Instance({
  level: 3
});

const COLOR_AURORA_GREEN = chalk.hex('#78E08F');
const COLOR_BLUE_CARACAO = chalk.hex('#3DC1D3');
const COLOR_DEEP_ROSE = chalk.hex('#C44569');
const COLOR_SUMMERTIME = chalk.hex('#F5CD79');
const COLOR_WHITE = chalk.hex('#FFFFFF');

export const CHALK = chalk;
export const CHALK_SUCCESS = COLOR_AURORA_GREEN;
export const CHALK_CONTEXT = COLOR_SUMMERTIME;
export const CHALK_CYAN = COLOR_BLUE_CARACAO;
export const CHALK_RED = COLOR_DEEP_ROSE;
export const CHALK_WHITE = COLOR_WHITE;
