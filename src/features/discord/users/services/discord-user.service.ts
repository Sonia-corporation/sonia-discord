import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { Snowflake, User } from 'discord.js';
import _ from 'lodash';

export class DiscordUserService extends AbstractService {
  private static _instance: DiscordUserService;

  public static getInstance(): DiscordUserService {
    if (_.isNil(DiscordUserService._instance)) {
      DiscordUserService._instance = new DiscordUserService();
    }

    return DiscordUserService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_USER_SERVICE);
  }

  public init(): Promise<void> {
    return this._listen();
  }

  public getUsers(): User[] {
    return DiscordClientService.getInstance().getClient().users.cache.toJSON();
  }

  public getUserById(userId: Snowflake): User | undefined {
    return DiscordClientService.getInstance()
      .getClient()
      .users.cache.find((user: User): boolean => _.isEqual(user.id, userId));
  }

  private _listen(): Promise<void> {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`listen ${wrapInQuotes(`ready`)} Discord client state`),
    });

    return DiscordClientService.getInstance().isReady().then();
  }
}
