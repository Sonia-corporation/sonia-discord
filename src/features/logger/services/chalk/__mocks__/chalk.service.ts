import { CHALK_INSTANCE } from '../../../constants/chalk/chalk-instance';
import chalk from 'chalk';
import _ from 'lodash';

export class ChalkService {
  private static _instance: ChalkService;

  public static getInstance(): ChalkService {
    if (_.isNil(ChalkService._instance)) {
      ChalkService._instance = new ChalkService();
    }

    return ChalkService._instance;
  }

  public success(message: string | unknown): string {
    return `success-${_.toString(message)}`;
  }

  public context(message: string | unknown): string {
    return `context-${_.toString(message)}`;
  }

  public value(message: string | unknown): string {
    return `value-${_.toString(message)}`;
  }

  public hint(message: string | unknown): string {
    return `hint-${_.toString(message)}`;
  }

  public error(message: string | unknown): string {
    return `error-${_.toString(message)}`;
  }

  public warning(message: string | unknown): string {
    return `warning-${_.toString(message)}`;
  }

  public text(message: string | unknown): string {
    return `text-${_.toString(message)}`;
  }

  public log(message: string | unknown): string {
    return `log-${_.toString(message)}`;
  }

  public debug(message: string | unknown): string {
    return `debug-${_.toString(message)}`;
  }

  public getLevel(): chalk.Level {
    return CHALK_INSTANCE.level;
  }
}
