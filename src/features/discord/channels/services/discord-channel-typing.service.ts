import { DMChannel, NewsChannel, TextChannel } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";

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

  public addOneIndicator(
    channel: Readonly<TextChannel | DMChannel | NewsChannel>
  ): Promise<void> {
    return channel.startTyping().catch((): void => {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `failed to show a typing indicator for the channel ${ChalkService.getInstance().value(
            channel.id
          )}`
        ),
      });
    });
  }

  public removeOneIndicator(
    channel: Readonly<TextChannel | DMChannel | NewsChannel>
  ): void {
    channel.stopTyping();
  }
}
