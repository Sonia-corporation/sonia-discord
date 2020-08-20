import { Guild, GuildChannel } from "discord.js";
import _ from "lodash";
import { filter, take } from "rxjs/operators";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { IAnyDiscordChannel } from "../../channels/types/any-discord-channel";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordGuildSoniaChannelNameEnum } from "../enums/discord-guild-sonia-channel-name.enum";
import { IDiscordGuildSoniaSendMessageToChannel } from "../interfaces/discord-guild-sonia-send-message-to-channel";
import { DiscordGuildConfigService } from "./config/discord-guild-config.service";
import { DiscordGuildService } from "./discord-guild.service";

export class DiscordGuildSoniaService extends AbstractService {
  private static _instance: DiscordGuildSoniaService;

  public static getInstance(): DiscordGuildSoniaService {
    if (_.isNil(DiscordGuildSoniaService._instance)) {
      DiscordGuildSoniaService._instance = new DiscordGuildSoniaService();
    }

    return DiscordGuildSoniaService._instance;
  }

  private _soniaGuild: Guild | undefined = undefined;

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_SONIA_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  public sendMessageToChannel(
    sendMessageToChannel: Readonly<IDiscordGuildSoniaSendMessageToChannel>
  ): void {
    if (!_.isNil(this._soniaGuild)) {
      const guildChannel:
        | GuildChannel
        | null
        | undefined = this.getSoniaGuildChannelByName(
        sendMessageToChannel.channelName
      );

      if (!_.isNil(guildChannel)) {
        this._sendMessageToChannel(
          sendMessageToChannel,
          guildChannel as IAnyDiscordChannel
        );
      } else {
        LoggerService.getInstance().warning({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `Could not find channel with name: ${ChalkService.getInstance().value(
              sendMessageToChannel.channelName
            )}`
          ),
        });
      }
    } else {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Sonia guild does not exists`),
      });
    }
  }

  public getSoniaGuildChannelByName(
    channelName: Readonly<DiscordGuildSoniaChannelNameEnum>
  ): GuildChannel | null | undefined {
    if (!_.isNil(this._soniaGuild)) {
      return this._soniaGuild.channels.cache.find(
        ({ name }: Readonly<GuildChannel>): boolean =>
          _.isEqual(_.toLower(_.deburr(name)), _.toLower(channelName))
      );
    }

    LoggerService.getInstance().warning({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Sonia guild does not exists`),
    });

    return null;
  }

  public setSoniaGuild(): void {
    this._soniaGuild = this._getSoniaGuild();

    if (_.isNil(this._soniaGuild)) {
      LoggerService.getInstance().error({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Sonia guild not found`),
      });
    } else {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`Sonia guild found`),
      });
    }
  }

  private _sendMessageToChannel(
    { messageResponse }: Readonly<IDiscordGuildSoniaSendMessageToChannel>,
    guildChannel: Readonly<IAnyDiscordChannel>
  ): void {
    guildChannel
      .send(messageResponse.response, messageResponse.options)
      .then((): void => {
        LoggerService.getInstance().log({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`channel message sent`),
        });
      })
      .catch((error: unknown): void => {
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `channel message sending failed`
          ),
        });
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().error(error),
        });
      });
  }

  private _getSoniaGuild(): Guild | undefined {
    return DiscordGuildService.getInstance().getGuildById(
      DiscordGuildConfigService.getInstance().getSoniaGuildId()
    );
  }

  private _listen(): void {
    DiscordClientService.getInstance()
      .isReady$()
      .pipe(
        filter((isReady: Readonly<boolean>): boolean =>
          _.isEqual(isReady, true)
        ),
        take(1)
      )
      .subscribe({
        next: (): void => {
          this.setSoniaGuild();
        },
      });

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `listen ${wrapInQuotes(`ready`)} Discord client state`
      ),
    });
  }
}
