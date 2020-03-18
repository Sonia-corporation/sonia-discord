const chalkI = require('chalk');
const chalk = new chalkI.Instance({
  level: 3
});

const auroraGreen = chalk.hex('#78E08F');
const blueCaracao = chalk.hex('#3dc1d3');
const porcelainRose = chalk.hex('#E66767');
const summertime = chalk.hex('#F5CD79');
const white = chalk.hex('#FFFFFF');

module.exports.chalk = chalk;
module.exports.success = auroraGreen;
module.exports.context = summertime;
module.exports.cyan = blueCaracao;
module.exports.red = porcelainRose;
module.exports.white = white;
