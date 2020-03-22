const CHALKI = require(`chalk`);
const CHALK = new CHALKI.Instance();

const COLOR_AURORA_GREEN = `#78E08F`;
const COLOR_BLUE_CARACAO = `#3DC1D3`;
const COLOR_DEEP_ROSE = `#C44569`;
const COLOR_ROSY_HIGHLIGHT = `#F7D794`;
const COLOR_WHITE = `#FFFFFF`;
const COLOR_SOFT_BLUE = `#778BEB`;
const COLOR_PURPLE_MOUNTAIN_MAJESTY = `#786FA6`;
const COLOR_SAWTOOTH_AAK = `#F19066`;

function chalkSuccess(message) {
  return CHALK.hex(COLOR_AURORA_GREEN)(message);
}

module.exports.chalkSuccess = chalkSuccess;

function chalkContext(message) {
  return CHALK.hex(COLOR_ROSY_HIGHLIGHT)(message);
}

module.exports.chalkContext = chalkContext;

function chalkValue(message) {
  return CHALK.hex(COLOR_BLUE_CARACAO)(message);
}

module.exports.chalkValue = chalkValue;

function chalkError(message) {
  return CHALK.hex(COLOR_DEEP_ROSE)(message);
}

module.exports.chalkError = chalkError;

function chalkWarning(message) {
  return CHALK.hex(COLOR_SAWTOOTH_AAK)(message);
}

module.exports.chalkWarning = chalkWarning;

function chalkText(message) {
  return CHALK.hex(COLOR_WHITE)(message);
}

module.exports.chalkText = chalkText;

function chalkLog(message) {
  return CHALK.hex(COLOR_SOFT_BLUE)(message);
}

module.exports.chalkLog = chalkLog;

function chalkDebug(message) {
  return CHALK.hex(COLOR_PURPLE_MOUNTAIN_MAJESTY)(message);
}

module.exports.chalkDebug = chalkDebug;
