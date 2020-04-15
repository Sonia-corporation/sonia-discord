import _ from "lodash";

export class ChalkService {
  private static _instance: ChalkService;

  public static getInstance(): ChalkService {
    if (_.isNil(ChalkService._instance)) {
      ChalkService._instance = new ChalkService();
    }

    return ChalkService._instance;
  }

  public success(message: Readonly<string> | unknown): string {
    return _.toString(message);
  }

  public context(message: Readonly<string> | unknown): string {
    return _.toString(message);
  }

  public value(message: Readonly<string> | unknown): string {
    return _.toString(message);
  }

  public hint(message: Readonly<string> | unknown): string {
    return _.toString(message);
  }

  public error(message: Readonly<string> | unknown): string {
    return _.toString(message);
  }

  public warning(message: Readonly<string> | unknown): string {
    return _.toString(message);
  }

  public text(message: Readonly<string> | unknown): string {
    return _.toString(message);
  }

  public log(message: Readonly<string> | unknown): string {
    return _.toString(message);
  }

  public debug(message: Readonly<string> | unknown): string {
    return _.toString(message);
  }
}
