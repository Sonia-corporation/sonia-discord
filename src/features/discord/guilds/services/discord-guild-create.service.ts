import { Client, Guild, GuildChannel } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { isDiscordGuildChannel } from "../../channels/functions/is-discord-guild-channel";
import { DiscordChannelGuildService } from "../../channels/services/discord-channel-guild.service";
import { AnyDiscordChannel } from "../../channels/types/any-discord-channel";
import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordMessageCommandCookieService } from "../../messages/services/command/discord-message-command-cookie.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordGuildConfigService } from "./config/discord-guild-config.service";

export class DiscordGuildCreateService extends AbstractService {
  private static _instance: DiscordGuildCreateService;

  public static getInstance(): DiscordGuildCreateService {
    if (_.isNil(DiscordGuildCreateService._instance)) {
      DiscordGuildCreateService._instance = new DiscordGuildCreateService();
    }

    return DiscordGuildCreateService._instance;
  }

  public readonly discordClient: Client = DiscordClientService.getInstance().getClient();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordChannelGuildService: DiscordChannelGuildService = DiscordChannelGuildService.getInstance();
  private readonly _discordGuildConfigService: DiscordGuildConfigService = DiscordGuildConfigService.getInstance();
  private readonly _discordMessageCommandCookieService: DiscordMessageCommandCookieService = DiscordMessageCommandCookieService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_CREATE_SERVICE);
    this.init();
  }

  public init(): void {
    this._listen();
  }

  private _listen(): void {
    this.discordClient.on(`guildCreate`, (guild: Readonly<Guild>): void => {
      this._handleGuildCreate(guild);
    });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `listen ${wrapInQuotes(`guildCreate`)} event`
      ),
    });
  }

  private _handleGuildCreate(guild: Readonly<Guild>): void {
    if (this._canSendMessage()) {
      const memberChannel: GuildChannel | null = this._discordChannelGuildService.getPrimary(
        guild
      );

      if (isDiscordGuildChannel(memberChannel)) {
        this._sendMessage(memberChannel);
      }
    }
  }

  private _canSendMessage(): boolean {
    if (this._discordGuildConfigService.shouldSendCookiesOnCreate()) {
      return true;
    }

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `guild create cookies message sending disabled`
      ),
    });

    return false;
  }

  private _sendMessage(channel: Readonly<GuildChannel>): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse();

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `sending message for the guild create...`
      ),
    });

    (channel as AnyDiscordChannel)
      .send(messageResponse.response, messageResponse.options)
      .then((): void => {
        this._loggerService.log({
          context: this._serviceName,
          message: this._chalkService.text(
            `cookies message for the create guild sent`
          ),
        });
      })
      .catch((error: unknown): void => {
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.text(
            `cookies message sending for the create guild failed`
          ),
        });
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.error(error),
        });
      });
  }

  private _getMessageResponse(): IDiscordMessageResponse {
    return this._discordMessageCommandCookieService.getMessageResponse();
  }
}
