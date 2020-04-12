import { Guild, GuildChannel } from "discord.js";
import _ from "lodash";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk-service";
import { LoggerService } from "../../../logger/services/logger-service";
import { isDiscordGuildChannel } from "../../channels/functions/is-discord-guild-channel";
import { DiscordChannelGuildService } from "../../channels/services/discord-channel-guild-service";
import { AnyDiscordChannel } from "../../channels/types/any-discord-channel";
import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordClientService } from "../../services/discord-client-service";
import { DiscordGuildConfigService } from "./config/discord-guild-config-service";

export class DiscordGuildCreateService {
  private static _instance: DiscordGuildCreateService;

  public static getInstance(): DiscordGuildCreateService {
    if (_.isNil(DiscordGuildCreateService._instance)) {
      DiscordGuildCreateService._instance = new DiscordGuildCreateService();
    }

    return DiscordGuildCreateService._instance;
  }

  public readonly discordClientServiceClient = DiscordClientService.getInstance().getClient();
  private readonly _discordChannelGuildService = DiscordChannelGuildService.getInstance();
  private readonly _discordGuildConfigService = DiscordGuildConfigService.getInstance();
  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `DiscordGuildCreateService`;

  public constructor() {
    this.init();
  }

  public init(): void {
    this._listen();
  }

  private _listen(): void {
    this.discordClientServiceClient.on(
      `guildCreate`,
      (guild: Readonly<Guild>): void => {
        this._handleGuildCreate(guild);
      }
    );

    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(
        `listen ${wrapInQuotes(`guildCreate`)} event`
      ),
    });
  }

  private _handleGuildCreate(guild: Readonly<Guild>): void {
    if (this._discordGuildConfigService.shouldSendCookiesOnCreate()) {
      const memberChannel: GuildChannel | null = this._getPrimaryChannel(guild);

      if (isDiscordGuildChannel(memberChannel)) {
        this._sendMessage(memberChannel);
      }
    }
  }

  private _sendMessage(channel: Readonly<GuildChannel>): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse();

    this._loggerService.debug({
      context: this._className,
      message: this._chalkService.text(
        `sending message for the guild create...`
      ),
    });

    (channel as AnyDiscordChannel)
      .send(messageResponse.response, messageResponse.options)
      .then((): void => {
        this._loggerService.log({
          context: this._className,
          message: this._chalkService.text(
            `cookies message for the create guild sent`
          ),
        });
      })
      .catch((error: unknown): void => {
        this._loggerService.error({
          context: this._className,
          message: this._chalkService.text(
            `cookies message sending for the create guild failed`
          ),
        });
        this._loggerService.error({
          context: this._className,
          message: this._chalkService.error(error),
        });
      });
  }

  private _getMessageResponse(): IDiscordMessageResponse {
    return {
      response: ``,
    };
  }

  private _getPrimaryChannel(guild: Readonly<Guild>): GuildChannel | null {
    const primaryChannel: GuildChannel | undefined = guild.channels.cache.find(
      (channel: Readonly<GuildChannel>): boolean => {
        return this._discordChannelGuildService.isGeneral(channel);
      }
    );

    if (isDiscordGuildChannel(primaryChannel)) {
      return primaryChannel;
    }

    return null;
  }
}
