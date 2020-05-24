import { Guild, GuildChannel } from "discord.js";
import _ from "lodash";
import { filter, take } from "rxjs/operators";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { AnyDiscordChannel } from "../../channels/types/any-discord-channel";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordGuildSoniaChannelNameEnum } from "../enums/discord-guild-sonia-channel-name.enum";
import { IDiscordGuildSoniaSendMessageToChannel } from "../interfaces/discord-guild-sonia-send-message-to-channel";
import { DiscordGuildConfigService } from "./config/discord-guild-config.service";

export class DiscordGuildSoniaService extends AbstractService {
  private static _instance: DiscordGuildSoniaService;

  public static getInstance(): DiscordGuildSoniaService {
    if (_.isNil(DiscordGuildSoniaService._instance)) {
      DiscordGuildSoniaService._instance = new DiscordGuildSoniaService();
    }

    return DiscordGuildSoniaService._instance;
  }

  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _discordGuildConfigService: DiscordGuildConfigService = DiscordGuildConfigService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
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
          guildChannel as AnyDiscordChannel
        );
      } else {
        this._loggerService.warning({
          context: this._serviceName,
          message: this._chalkService.text(
            `Could not find channel with name: ${this._chalkService.value(
              sendMessageToChannel.channelName
            )}`
          ),
        });
      }
    } else {
      this._loggerService.warning({
        context: this._serviceName,
        message: this._chalkService.text(`Sonia guild does not exists`),
      });
    }
  }

  public getSoniaGuildChannelByName(
    channelName: Readonly<DiscordGuildSoniaChannelNameEnum>
  ): GuildChannel | null | undefined {
    if (!_.isNil(this._soniaGuild)) {
      return this._soniaGuild.channels.cache.find(
        (guildChannel: Readonly<GuildChannel>): boolean => {
          return _.isEqual(
            _.toLower(_.deburr(guildChannel.name)),
            _.toLower(channelName)
          );
        }
      );
    }

    this._loggerService.warning({
      context: this._serviceName,
      message: this._chalkService.text(`Sonia guild does not exists`),
    });

    return null;
  }

  public setSoniaGuild(): void {
    this._soniaGuild = this._getSoniaGuild();

    if (_.isNil(this._soniaGuild)) {
      this._loggerService.error({
        context: this._serviceName,
        message: this._chalkService.text(`Sonia guild not found`),
      });
    } else {
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`Sonia guild found`),
      });
    }
  }

  private _sendMessageToChannel(
    sendMessageToChannel: Readonly<IDiscordGuildSoniaSendMessageToChannel>,
    guildChannel: Readonly<AnyDiscordChannel>
  ): void {
    guildChannel
      .send(
        sendMessageToChannel.messageResponse.response,
        sendMessageToChannel.messageResponse.options
      )
      .then((): void => {
        this._loggerService.log({
          context: this._serviceName,
          message: this._chalkService.text(`channel message sent`),
        });
      })
      .catch((error: unknown): void => {
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.text(`channel message sending failed`),
        });
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.error(error),
        });
      });
  }

  private _getSoniaGuild(): Guild | undefined {
    return this._discordClientService
      .getClient()
      .guilds.cache.find((guild: Readonly<Guild>): boolean => {
        return _.isEqual(
          guild.id,
          this._discordGuildConfigService.getSoniaGuildId()
        );
      });
  }

  private _listen(): void {
    this._discordClientService
      .isReady$()
      .pipe(
        filter((isReady: Readonly<boolean>): boolean => {
          return _.isEqual(isReady, true);
        }),
        take(1)
      )
      .subscribe({
        next: (): void => {
          this.setSoniaGuild();
        },
      });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `listen ${wrapInQuotes(`ready`)} Discord client state`
      ),
    });
  }
}
