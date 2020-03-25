import chalkI from 'chalk';
import _ from 'lodash';

const CHALK = new chalkI.Instance();
const COLOR_AURORA_GREEN = `#78E08F`;
const COLOR_BLUE_CARACAO = `#3DC1D3`;
const COLOR_DEEP_ROSE = `#C44569`;
const COLOR_ROSY_HIGHLIGHT = `#F7D794`;
const COLOR_WHITE = `#FFFFFF`;
const COLOR_SOFT_BLUE = `#778BEB`;
const COLOR_PURPLE_MOUNTAIN_MAJESTY = `#786FA6`;
const COLOR_SAWTOOTH_AAK = `#F19066`;
const COLOR_OLD_GERANIUM = `#CF6A87`;

export class ChalkService {
  private static _instance: ChalkService;

  public static getInstance(): ChalkService {
    if (_.isNil(ChalkService._instance)) {
      ChalkService._instance = new ChalkService();
    }

    return ChalkService._instance;
  }

  public success(message: Readonly<string> | unknown): string {
    return CHALK.hex(COLOR_AURORA_GREEN)(message);
  }

  public context(message: Readonly<string> | unknown): string {
    return CHALK.hex(COLOR_ROSY_HIGHLIGHT)(message);
  }

  public value(message: Readonly<string> | unknown): string {
    return CHALK.hex(COLOR_BLUE_CARACAO)(message);
  }

  public hint(message: Readonly<string> | unknown): string {
    return CHALK.hex(COLOR_OLD_GERANIUM)(message);
  }

  public error(message: Readonly<string> | unknown): string {
    return CHALK.hex(COLOR_DEEP_ROSE)(message);
  }

  public warning(message: Readonly<string> | unknown): string {
    return CHALK.hex(COLOR_SAWTOOTH_AAK)(message);
  }

  public text(message: Readonly<string> | unknown): string {
    return CHALK.hex(COLOR_WHITE)(message);
  }

  public log(message: Readonly<string> | unknown): string {
    return CHALK.hex(COLOR_SOFT_BLUE)(message);
  }

  public debug(message: Readonly<string> | unknown): string {
    return CHALK.hex(COLOR_PURPLE_MOUNTAIN_MAJESTY)(message);
  }
}
