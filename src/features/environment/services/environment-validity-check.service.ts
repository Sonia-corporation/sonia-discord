import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { ChalkService } from '../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../logger/services/logger.service';
import _ from 'lodash';

export class EnvironmentValidityCheckService extends AbstractService {
  private static _instance: EnvironmentValidityCheckService;

  public static getInstance(): EnvironmentValidityCheckService {
    if (_.isNil(EnvironmentValidityCheckService._instance)) {
      EnvironmentValidityCheckService._instance = new EnvironmentValidityCheckService();
    }

    return EnvironmentValidityCheckService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.ENVIRONMENT_VALIDITY_CHECK_SERVICE);
  }

  public init(): void {
    this._handleGoogleApplicationCredentials();
    this._handleShouldDisplayMoreDebugLogs();
  }

  private _handleGoogleApplicationCredentials(): void {
    this._checkGoogleApplicationCredentials();
    this._logGoogleApplicationCredentials();
  }

  private _checkGoogleApplicationCredentials(): void | never {
    if (!_.isString(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `This error should not happen. If everything is as expected this is not related to the current developer environment and it means that a breaking change happened.`
        ),
      });

      throw new Error(`GOOGLE_APPLICATION_CREDENTIALS env is not a string`);
    }
  }

  private _logGoogleApplicationCredentials(): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `GOOGLE_APPLICATION_CREDENTIALS env: ${ChalkService.getInstance().value(
          process.env.GOOGLE_APPLICATION_CREDENTIALS
        )}`
      ),
    });
  }

  private _handleShouldDisplayMoreDebugLogs(): void {
    this._checkShouldDisplayMoreDebugLogs();
    this._logShouldDisplayMoreDebugLogs();
  }

  private _checkShouldDisplayMoreDebugLogs(): void | never {
    if (!_.includes([`true`, `false`], process.env.SHOULD_DISPLAY_MORE_DEBUG_LOGS)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `This error should not happen. If everything is as expected this is not related to the current developer environment and it means that a breaking change happened.`
        ),
      });

      throw new Error(`SHOULD_DISPLAY_MORE_DEBUG_LOGS env is not either true or false (string)`);
    }
  }

  private _logShouldDisplayMoreDebugLogs(): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `SHOULD_DISPLAY_MORE_DEBUG_LOGS env: ${ChalkService.getInstance().value(
          process.env.SHOULD_DISPLAY_MORE_DEBUG_LOGS
        )}`
      ),
    });
  }
}
