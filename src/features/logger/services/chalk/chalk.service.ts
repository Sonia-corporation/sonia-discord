import chalk from "chalk";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CHALK_INSTANCE } from "../../constants/chalk/chalk-instance";
import { ChalkColorEnum } from "../../enums/chalk/chalk-color.enum";

export class ChalkService extends AbstractService {
  private static _instance: ChalkService;

  public static getInstance(): ChalkService {
    if (_.isNil(ChalkService._instance)) {
      ChalkService._instance = new ChalkService();
    }

    return ChalkService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.CHALK_SERVICE);
  }

  public success(message: Readonly<string> | unknown): string {
    if (_.isEqual(this.getLevel(), 3)) {
      return CHALK_INSTANCE.hex(ChalkColorEnum.AURORA_GREEN)(message);
    }

    return CHALK_INSTANCE.green(message);
  }

  public context(message: Readonly<string> | unknown): string {
    if (_.isEqual(this.getLevel(), 3)) {
      return CHALK_INSTANCE.hex(ChalkColorEnum.ROSY_HIGHLIGHT)(message);
    }

    return CHALK_INSTANCE.yellow(message);
  }

  public value(message: Readonly<string> | unknown): string {
    if (_.isEqual(this.getLevel(), 3)) {
      return CHALK_INSTANCE.hex(ChalkColorEnum.BLUE_CARACAO)(message);
    }

    return CHALK_INSTANCE.cyan(message);
  }

  public hint(message: Readonly<string> | unknown): string {
    if (_.isEqual(this.getLevel(), 3)) {
      return CHALK_INSTANCE.hex(ChalkColorEnum.OLD_GERANIUM)(message);
    }

    return CHALK_INSTANCE.magenta(message);
  }

  public error(message: Readonly<string> | unknown): string {
    if (_.isEqual(this.getLevel(), 3)) {
      return CHALK_INSTANCE.hex(ChalkColorEnum.DEEP_ROSE)(message);
    }

    return CHALK_INSTANCE.red(message);
  }

  public warning(message: Readonly<string> | unknown): string {
    if (_.isEqual(this.getLevel(), 3)) {
      return CHALK_INSTANCE.hex(ChalkColorEnum.SAWTOOTH_AAK)(message);
    }

    return CHALK_INSTANCE.yellow(message);
  }

  public text(message: Readonly<string> | unknown): string {
    if (_.isEqual(this.getLevel(), 3)) {
      return CHALK_INSTANCE.hex(ChalkColorEnum.WHITE)(message);
    }

    return CHALK_INSTANCE.white(message);
  }

  public log(message: Readonly<string> | unknown): string {
    if (_.isEqual(this.getLevel(), 3)) {
      return CHALK_INSTANCE.hex(ChalkColorEnum.SOFT_BLUE)(message);
    }

    return CHALK_INSTANCE.blue(message);
  }

  public debug(message: Readonly<string> | unknown): string {
    if (_.isEqual(this.getLevel(), 3)) {
      return CHALK_INSTANCE.hex(ChalkColorEnum.PURPLE_MOUNTAIN_MAJESTY)(
        message
      );
    }

    return CHALK_INSTANCE.magenta(message);
  }

  public getLevel(): chalk.Level {
    return CHALK_INSTANCE.level;
  }
}
