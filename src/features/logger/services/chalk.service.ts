import _ from "lodash";
import { AbstractService } from "../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CHALK } from "../constants/chalk";
import { ChalkColorEnum } from "../enums/chalk-color.enum";

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
    return CHALK.hex(ChalkColorEnum.AURORA_GREEN)(message);
  }

  public context(message: Readonly<string> | unknown): string {
    return CHALK.hex(ChalkColorEnum.ROSY_HIGHLIGHT)(message);
  }

  public value(message: Readonly<string> | unknown): string {
    return CHALK.hex(ChalkColorEnum.BLUE_CARACAO)(message);
  }

  public hint(message: Readonly<string> | unknown): string {
    return CHALK.hex(ChalkColorEnum.OLD_GERANIUM)(message);
  }

  public error(message: Readonly<string> | unknown): string {
    return CHALK.hex(ChalkColorEnum.DEEP_ROSE)(message);
  }

  public warning(message: Readonly<string> | unknown): string {
    return CHALK.hex(ChalkColorEnum.SAWTOOTH_AAK)(message);
  }

  public text(message: Readonly<string> | unknown): string {
    return CHALK.hex(ChalkColorEnum.WHITE)(message);
  }

  public log(message: Readonly<string> | unknown): string {
    return CHALK.hex(ChalkColorEnum.SOFT_BLUE)(message);
  }

  public debug(message: Readonly<string> | unknown): string {
    return CHALK.hex(ChalkColorEnum.PURPLE_MOUNTAIN_MAJESTY)(message);
  }
}
