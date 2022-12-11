import { ChalkService } from './chalk/chalk.service';
import { LoggerService } from './logger.service';
import { AbstractService } from '../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../enums/service-name.enum';
import { IFirebaseGuildChannel } from '../../firebase/types/guilds/channels/firebase-guild-channel';
import { Guild } from 'discord.js';
import _ from 'lodash';

export class LoggerDiscordService extends AbstractService {
  private static _instance: LoggerDiscordService;

  public static getInstance(): LoggerDiscordService {
    if (_.isNil(LoggerDiscordService._instance)) {
      LoggerDiscordService._instance = new LoggerDiscordService();
    }

    return LoggerDiscordService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.LOGGER_DISCORD_SERVICE);
  }

  public logValidGuildChannel(
    serviceName: ServiceNameEnum,
    guildId: Guild['id'],
    guildChannelId: IFirebaseGuildChannel['id']
  ): void {
    LoggerService.getInstance().debug({
      context: serviceName,
      message: ChalkService.getInstance().text(
        `Discord guild ${ChalkService.getInstance().value(guildId)} channel ${ChalkService.getInstance().value(
          guildChannelId
        )} is valid`
      ),
    });
  }

  public logInValidGuildChannel(
    serviceName: ServiceNameEnum,
    guildId: Guild['id'],
    guildChannelId: IFirebaseGuildChannel['id']
  ): void {
    LoggerService.getInstance().debug({
      context: serviceName,
      message: ChalkService.getInstance().text(
        `Discord guild ${ChalkService.getInstance().value(guildId)} channel ${ChalkService.getInstance().value(
          guildChannelId
        )} is invalid`
      ),
    });
  }
}
