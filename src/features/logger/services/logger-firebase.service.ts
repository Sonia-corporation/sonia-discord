import { ChalkService } from './chalk/chalk.service';
import { LoggerService } from './logger.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { Guild } from 'discord.js';
import _ from 'lodash';

export class LoggerFirebaseService extends AbstractService {
  private static _instance: LoggerFirebaseService;

  public static getInstance(): LoggerFirebaseService {
    if (_.isNil(LoggerFirebaseService._instance)) {
      LoggerFirebaseService._instance = new LoggerFirebaseService();
    }

    return LoggerFirebaseService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.LOGGER_FIREBASE_SERVICE);
  }

  public logFetchingGuild(serviceName: ServiceNameEnum, guildId: Guild['id']): void {
    LoggerService.getInstance().debug({
      context: serviceName,
      message: ChalkService.getInstance().text(`fetching Firebase guild ${ChalkService.getInstance().value(guildId)}`),
    });
  }
}
