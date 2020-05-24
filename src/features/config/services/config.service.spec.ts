import moment from "moment-timezone";
import { ILoggerLog } from "../../logger/interfaces/logger-log";
import { LoggerService } from "../../logger/services/logger.service";
import { IConfigUpdateBoolean } from "../interfaces/config-update-boolean";
import { IConfigUpdateDate } from "../interfaces/config-update-date";
import { IConfigUpdateNumber } from "../interfaces/config-update-number";
import { IConfigUpdateString } from "../interfaces/config-update-string";
import { IConfigUpdateStringOrArray } from "../interfaces/config-update-string-or-array";
import { ConfigService } from "./config.service";

jest.mock(`../../logger/services/chalk/chalk.service`);
jest.mock(`../../logger/services/logger.service`);

describe(`ConfigService`, (): void => {
  let service: ConfigService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    service = ConfigService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getUpdatedNumber()`, (): void => {
    let configUpdateNumber: IConfigUpdateNumber;

    let loggerServiceLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      configUpdateNumber = {
        context: `dummy-context`,
        newValue: 0,
        oldValue: 8,
        valueName: `dummy-value-name`,
      };

      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
    });

    describe(`when the given config update number new value is undefined`, (): void => {
      beforeEach((): void => {
        configUpdateNumber.newValue = undefined;
      });

      it(`should not log`, (): void => {
        expect.assertions(1);

        service.getUpdatedNumber(configUpdateNumber);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should return the old value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedNumber(configUpdateNumber);

        expect(result).toStrictEqual(8);
      });
    });

    describe(`when the given config update number new value is 5`, (): void => {
      beforeEach((): void => {
        configUpdateNumber.newValue = 5;
      });

      it(`should log`, (): void => {
        expect.assertions(2);

        service.getUpdatedNumber(configUpdateNumber);

        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith({
          context: `dummy-context`,
          message: `text-dummy-value-name updated to: value-5`,
        } as ILoggerLog);
      });

      it(`should return the new value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedNumber(configUpdateNumber);

        expect(result).toStrictEqual(5);
      });
    });

    describe(`when the given config update number new value is 6`, (): void => {
      beforeEach((): void => {
        configUpdateNumber.newValue = 6;
      });

      it(`should log`, (): void => {
        expect.assertions(2);

        service.getUpdatedNumber(configUpdateNumber);

        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith({
          context: `dummy-context`,
          message: `text-dummy-value-name updated to: value-6`,
        } as ILoggerLog);
      });

      it(`should return the new value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedNumber(configUpdateNumber);

        expect(result).toStrictEqual(6);
      });
    });
  });

  describe(`getUpdatedString()`, (): void => {
    let configUpdateString: IConfigUpdateString;

    let loggerServiceLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      configUpdateString = {
        context: `dummy-context`,
        newValue: `dummy-new-value`,
        oldValue: `dummy-old-value`,
        valueName: `dummy-value-name`,
      };

      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
    });

    describe(`when the given config update string new value is undefined`, (): void => {
      beforeEach((): void => {
        configUpdateString.newValue = undefined;
      });

      it(`should not log`, (): void => {
        expect.assertions(1);

        service.getUpdatedString(configUpdateString);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should return the old value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedString(configUpdateString);

        expect(result).toStrictEqual(`dummy-old-value`);
      });
    });

    describe(`when the given config update string new value is "new-value"`, (): void => {
      beforeEach((): void => {
        configUpdateString.newValue = `new-value`;
      });

      describe(`when the given config update string value hidden state is undefined`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = undefined;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`new-value`);
        });
      });

      describe(`when the given config update string value hidden state is false`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = false;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`new-value`);
        });
      });

      describe(`when the given config update string value hidden state is true`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = true;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`new-value`);
        });
      });
    });

    describe(`when the given config update string new value is "marco-polo"`, (): void => {
      beforeEach((): void => {
        configUpdateString.newValue = `marco-polo`;
      });

      describe(`when the given config update string value hidden state is undefined`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = undefined;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`marco-polo`);
        });
      });

      describe(`when the given config update string value hidden state is false`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = false;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`marco-polo`);
        });
      });

      describe(`when the given config update string value hidden state is true`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = true;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`marco-polo`);
        });
      });
    });
  });

  describe(`getUpdatedStringOrArray()`, (): void => {
    let configUpdateStringOrArray: IConfigUpdateStringOrArray;

    let loggerServiceLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      configUpdateStringOrArray = {
        context: `dummy-context`,
        newValue: `dummy-new-value`,
        oldValue: `dummy-old-value`,
        valueName: `dummy-value-name`,
      };

      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
    });

    describe(`when the given config update string or array new value is undefined`, (): void => {
      beforeEach((): void => {
        configUpdateStringOrArray.newValue = undefined;
      });

      it(`should not log`, (): void => {
        expect.assertions(1);

        service.getUpdatedStringOrArray(configUpdateStringOrArray);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should return the old value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedStringOrArray(
          configUpdateStringOrArray
        );

        expect(result).toStrictEqual(`dummy-old-value`);
      });
    });

    describe(`when the given config update string or array new value is "new-value"`, (): void => {
      beforeEach((): void => {
        configUpdateStringOrArray.newValue = `new-value`;
      });

      describe(`when the given config update string or array value hidden state is undefined`, (): void => {
        beforeEach((): void => {
          configUpdateStringOrArray.isValueHidden = undefined;
        });

        describe(`when the given config update string or array value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedStringOrArray(
            configUpdateStringOrArray
          );

          expect(result).toStrictEqual(`new-value`);
        });
      });

      describe(`when the given config update string or array value hidden state is false`, (): void => {
        beforeEach((): void => {
          configUpdateStringOrArray.isValueHidden = false;
        });

        describe(`when the given config update string or array value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedStringOrArray(
            configUpdateStringOrArray
          );

          expect(result).toStrictEqual(`new-value`);
        });
      });

      describe(`when the given config update string or array value hidden state is true`, (): void => {
        beforeEach((): void => {
          configUpdateStringOrArray.isValueHidden = true;
        });

        describe(`when the given config update string or array value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = undefined;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = false;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = true;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedStringOrArray(
            configUpdateStringOrArray
          );

          expect(result).toStrictEqual(`new-value`);
        });
      });
    });

    describe(`when the given config update string or array new value is "marco-polo"`, (): void => {
      beforeEach((): void => {
        configUpdateStringOrArray.newValue = `marco-polo`;
      });

      describe(`when the given config update string or array value hidden state is undefined`, (): void => {
        beforeEach((): void => {
          configUpdateStringOrArray.isValueHidden = undefined;
        });

        describe(`when the given config update string or array value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedStringOrArray(
            configUpdateStringOrArray
          );

          expect(result).toStrictEqual(`marco-polo`);
        });
      });

      describe(`when the given config update string or array value hidden state is false`, (): void => {
        beforeEach((): void => {
          configUpdateStringOrArray.isValueHidden = false;
        });

        describe(`when the given config update string or array value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedStringOrArray(
            configUpdateStringOrArray
          );

          expect(result).toStrictEqual(`marco-polo`);
        });
      });

      describe(`when the given config update string or array value hidden state is true`, (): void => {
        beforeEach((): void => {
          configUpdateStringOrArray.isValueHidden = true;
        });

        describe(`when the given config update string or array value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = undefined;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = false;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = true;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedStringOrArray(
            configUpdateStringOrArray
          );

          expect(result).toStrictEqual(`marco-polo`);
        });
      });
    });

    describe(`when the given config update string or array new value is ["new-value","marco-polo"]`, (): void => {
      beforeEach((): void => {
        configUpdateStringOrArray.newValue = [`new-value`, `marco-polo`];
      });

      describe(`when the given config update string or array value hidden state is undefined`, (): void => {
        beforeEach((): void => {
          configUpdateStringOrArray.isValueHidden = undefined;
        });

        describe(`when the given config update string or array value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-[ "new-value", "marco-polo" ]`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-[ "new-value", "marco-polo" ]`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedStringOrArray(
            configUpdateStringOrArray
          );

          expect(result).toStrictEqual([`new-value`, `marco-polo`]);
        });
      });

      describe(`when the given config update string or array value hidden state is false`, (): void => {
        beforeEach((): void => {
          configUpdateStringOrArray.isValueHidden = false;
        });

        describe(`when the given config update string or array value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-[ "new-value", "marco-polo" ]`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-[ "new-value", "marco-polo" ]`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedStringOrArray(
            configUpdateStringOrArray
          );

          expect(result).toStrictEqual([`new-value`, `marco-polo`]);
        });
      });

      describe(`when the given config update string or array value hidden state is true`, (): void => {
        beforeEach((): void => {
          configUpdateStringOrArray.isValueHidden = true;
        });

        describe(`when the given config update string or array value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = undefined;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: [ "********" ] (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = false;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: [ "********" ] (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string or array value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateStringOrArray.isValueDisplay = true;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedStringOrArray(configUpdateStringOrArray);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: [ "********" ] (hidden)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedStringOrArray(
            configUpdateStringOrArray
          );

          expect(result).toStrictEqual([`new-value`, `marco-polo`]);
        });
      });
    });
  });

  describe(`getUpdatedDate()`, (): void => {
    let configUpdateDate: IConfigUpdateDate;
    let newValue: string;

    let loggerServiceLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      configUpdateDate = {
        context: `dummy-context`,
        newValue: `dummy-new-value`,
        oldValue: `dummy-old-value`,
        valueName: `dummy-value-name`,
      };

      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
    });

    describe(`when the given config update date new value is undefined`, (): void => {
      beforeEach((): void => {
        configUpdateDate.newValue = undefined;
      });

      it(`should not log`, (): void => {
        expect.assertions(1);

        service.getUpdatedDate(configUpdateDate);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should return the old value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedDate(configUpdateDate);

        expect(result).toStrictEqual(`dummy-old-value`);
      });
    });

    describe(`when the given config update date new value is today as ISO string`, (): void => {
      beforeEach((): void => {
        newValue = moment().format();
        configUpdateDate.newValue = newValue;
      });

      describe(`when the given config update date value hidden state is undefined`, (): void => {
        beforeEach((): void => {
          configUpdateDate.isValueHidden = undefined;
        });

        describe(`when the given config update date value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateDate.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedDate(configUpdateDate);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"${newValue}" hint-(a few seconds ago)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update date value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateDate.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedDate(configUpdateDate);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update date value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateDate.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedDate(configUpdateDate);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"${newValue}" hint-(a few seconds ago)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedDate(configUpdateDate);

          expect(result).toStrictEqual(newValue);
        });
      });

      describe(`when the given config update date value hidden state is false`, (): void => {
        beforeEach((): void => {
          configUpdateDate.isValueHidden = false;
        });

        describe(`when the given config update date value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateDate.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedDate(configUpdateDate);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"${newValue}" hint-(a few seconds ago)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update date value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateDate.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedDate(configUpdateDate);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update date value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateDate.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedDate(configUpdateDate);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"${newValue}" hint-(a few seconds ago)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedDate(configUpdateDate);

          expect(result).toStrictEqual(newValue);
        });
      });

      describe(`when the given config update date value hidden state is true`, (): void => {
        beforeEach((): void => {
          configUpdateDate.isValueHidden = true;
        });

        describe(`when the given config update date value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateDate.isValueDisplay = undefined;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedDate(configUpdateDate);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update date value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateDate.isValueDisplay = false;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedDate(configUpdateDate);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update date value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateDate.isValueDisplay = true;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedDate(configUpdateDate);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedDate(configUpdateDate);

          expect(result).toStrictEqual(newValue);
        });
      });
    });
  });

  describe(`getUpdatedBoolean()`, (): void => {
    let configUpdateBoolean: IConfigUpdateBoolean;

    let loggerServiceLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      configUpdateBoolean = {
        context: `dummy-context`,
        newValue: true,
        oldValue: false,
        valueName: `dummy-value-name`,
      };

      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
    });

    describe(`when the given config update boolean new value is undefined`, (): void => {
      beforeEach((): void => {
        configUpdateBoolean.newValue = undefined;
      });

      it(`should not log`, (): void => {
        expect.assertions(1);

        service.getUpdatedBoolean(configUpdateBoolean);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should return the old value`, (): void => {
        expect.assertions(1);

        const isTrue = service.getUpdatedBoolean(configUpdateBoolean);

        expect(isTrue).toStrictEqual(false);
      });
    });

    describe(`when the given config update boolean new value is false`, (): void => {
      beforeEach((): void => {
        configUpdateBoolean.newValue = false;
      });

      it(`should log`, (): void => {
        expect.assertions(2);

        service.getUpdatedBoolean(configUpdateBoolean);

        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith({
          context: `dummy-context`,
          message: `text-dummy-value-name updated to: value-false`,
        } as ILoggerLog);
      });

      it(`should return the new value`, (): void => {
        expect.assertions(1);

        const isTrue = service.getUpdatedBoolean(configUpdateBoolean);

        expect(isTrue).toStrictEqual(false);
      });
    });

    describe(`when the given config update boolean new value is true`, (): void => {
      beforeEach((): void => {
        configUpdateBoolean.newValue = true;
      });

      it(`should log`, (): void => {
        expect.assertions(2);

        service.getUpdatedBoolean(configUpdateBoolean);

        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith({
          context: `dummy-context`,
          message: `text-dummy-value-name updated to: value-true`,
        } as ILoggerLog);
      });

      it(`should return the new value`, (): void => {
        expect.assertions(1);

        const isTrue = service.getUpdatedBoolean(configUpdateBoolean);

        expect(isTrue).toStrictEqual(true);
      });
    });
  });
});
