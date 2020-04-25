import { Client, GuildChannel } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { AppConfigService } from "../../../app/services/config/app-config.service";
import { ChalkService } from "../../../logger/services/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { ProfileConfigService } from "../../../profile/services/config/profile-config.service";
import { isDiscordGuildChannel } from "../../channels/functions/is-discord-guild-channel";
import { DiscordChannelGuildService } from "../../channels/services/discord-channel-guild.service";
import { AnyDiscordChannel } from "../../channels/types/any-discord-channel";
import { addDiscordDevPrefix } from "../../functions/add-discord-dev-prefix";
import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordClientService } from "../../services/discord-client.service";
import { AnyGuildMember } from "../types/any-guild-member";
import { DiscordGuildConfigService } from "./config/discord-guild-config.service";

export class DiscordGuildMemberAddService extends AbstractService {
  private static _instance: DiscordGuildMemberAddService;

  public static getInstance(): DiscordGuildMemberAddService {
    if (_.isNil(DiscordGuildMemberAddService._instance)) {
      DiscordGuildMemberAddService._instance = new DiscordGuildMemberAddService();
    }

    return DiscordGuildMemberAddService._instance;
  }

  public readonly discordClient: Client = DiscordClientService.getInstance().getClient();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordChannelGuildService: DiscordChannelGuildService = DiscordChannelGuildService.getInstance();
  private readonly _discordGuildConfigService: DiscordGuildConfigService = DiscordGuildConfigService.getInstance();
  private readonly _profileConfigService: ProfileConfigService = ProfileConfigService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _appConfigService: AppConfigService = AppConfigService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_MEMBER_ADD_SERVICE);
    this.init();
  }

  public init(): void {
    this._listen();
  }

  private _listen(): void {
    this.discordClient.on(
      `guildMemberAdd`,
      (member: Readonly<AnyGuildMember>): void => {
        this._handleGuildMemberAdd(member);
      }
    );

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `listen ${wrapInQuotes(`guildMemberAdd`)} event`
      ),
    });
  }

  private _handleGuildMemberAdd(member: Readonly<AnyGuildMember>): void {
    if (this._canSendMessage()) {
      const primaryChannel: GuildChannel | null = this._discordChannelGuildService.getPrimary(
        member.guild
      );

      if (isDiscordGuildChannel(primaryChannel)) {
        this._sendMessage(primaryChannel, member);
      }
    }
  }

  private _canSendMessage(): boolean {
    if (this._discordGuildConfigService.shouldWelcomeNewMembers()) {
      return true;
    }

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `welcome new members message sending disabled`
      ),
    });

    return false;
  }

  private _sendMessage(
    channel: Readonly<GuildChannel>,
    member: Readonly<AnyGuildMember>
  ): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse(
      member
    );

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `sending message for the new guild member...`
      ),
    });

    (channel as AnyDiscordChannel)
      .send(messageResponse.response, messageResponse.options)
      .then((): void => {
        this._loggerService.log({
          context: this._serviceName,
          message: this._chalkService.text(
            `welcome message for the new guild sent`
          ),
        });
      })
      .catch((error: unknown): void => {
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.text(
            `message sending for the new guild member failed`
          ),
        });
        this._loggerService.error({
          context: this._serviceName,
          message: this._chalkService.error(error),
        });
      });
  }

  private _getMessageResponse(
    member: Readonly<AnyGuildMember>
  ): IDiscordMessageResponse {
    return {
      response: this._getMessageResponseWithEnvPrefix(
        `Bienvenue **${member.displayName}**, il est midi !`
      ),
    };
  }

  private _getMessageResponseWithEnvPrefix(response: Readonly<string>): string {
    if (!this._appConfigService.isProduction()) {
      return addDiscordDevPrefix(
        response,
        this._profileConfigService.getNickname()
      );
    }

    return response;
  }
}
