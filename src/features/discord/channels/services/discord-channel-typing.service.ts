import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { getDiscordHumanizedChannel } from '../functions/get-discord-humanized-channel';
import { DMChannel, NewsChannel, TextChannel, ThreadChannel } from 'discord.js';
import _ from 'lodash';

export class DiscordChannelTypingService extends AbstractService {
  private static _instance: DiscordChannelTypingService;

  public static getInstance(): DiscordChannelTypingService {
    if (_.isNil(DiscordChannelTypingService._instance)) {
      DiscordChannelTypingService._instance = new DiscordChannelTypingService();
    }

    return DiscordChannelTypingService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_CHANNEL_TYPING_SERVICE);
  }

  public sendTyping(channel: TextChannel | DMChannel | NewsChannel | ThreadChannel): Promise<void> {
    return channel.sendTyping().catch((error: Error): Promise<void> => {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `failed to show a typing indicator for the ${getDiscordHumanizedChannel(
            channel
          )} ${ChalkService.getInstance().value(channel.id)}`
        ),
      });
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(error),
      });

      return Promise.reject(error);
    });
  }
}
