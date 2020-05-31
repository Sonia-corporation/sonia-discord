import { GuildChannel } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { AppConfigService } from "../../../app/services/config/app-config.service";
import { ChalkService } from "../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { ProfileConfigService } from "../../../profile/services/config/profile-config.service";
import { isDiscordGuildChannel } from "../../channels/functions/is-discord-guild-channel";
import { isDiscordGuildChannelWritable } from "../../channels/functions/types/is-discord-guild-channel-writable";
import { DiscordChannelGuildService } from "../../channels/services/discord-channel-guild.service";
import { addDiscordDevPrefix } from "../../functions/dev-prefix/add-discord-dev-prefix";
import { DiscordLoggerErrorService } from "../../logger/services/discord-logger-error.service";
import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordGuildSoniaChannelNameEnum } from "../enums/discord-guild-sonia-channel-name.enum";
import { AnyGuildMember } from "../types/any-guild-member";
import { DiscordGuildConfigService } from "./config/discord-guild-config.service";
import { DiscordGuildSoniaService } from "./discord-guild-sonia.service";

export class DiscordGuildMemberAddService extends AbstractService {
  private static _instance: DiscordGuildMemberAddService;

  public static getInstance(): DiscordGuildMemberAddService {
    if (_.isNil(DiscordGuildMemberAddService._instance)) {
      DiscordGuildMemberAddService._instance = new DiscordGuildMemberAddService();
    }

    return DiscordGuildMemberAddService._instance;
  }

  private readonly _discordClientService: DiscordClientService = DiscordClientService.getInstance();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _discordChannelGuildService: DiscordChannelGuildService = DiscordChannelGuildService.getInstance();
  private readonly _discordGuildConfigService: DiscordGuildConfigService = DiscordGuildConfigService.getInstance();
  private readonly _profileConfigService: ProfileConfigService = ProfileConfigService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();
  private readonly _appConfigService: AppConfigService = AppConfigService.getInstance();
  private readonly _discordGuildSoniaService: DiscordGuildSoniaService = DiscordGuildSoniaService.getInstance();
  private readonly _discordLoggerErrorService: DiscordLoggerErrorService = DiscordLoggerErrorService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_MEMBER_ADD_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  public sendMessage(member: Readonly<AnyGuildMember>): void {
    if (this._canSendMessage()) {
      const primaryChannel: GuildChannel | null = this._discordChannelGuildService.getPrimary(
        member.guild
      );

      if (isDiscordGuildChannel(primaryChannel)) {
        this._sendMessage(primaryChannel, member);
      }
    }
  }

  private _listen(): void {
    this._discordClientService
      .getClient()
      .on(`guildMemberAdd`, (member: Readonly<AnyGuildMember>): void => {
        this._loggerService.debug({
          context: this._serviceName,
          message: this._chalkService.text(
            `${wrapInQuotes(`guildMemberAdd`)} event triggered`
          ),
        });

        this.sendMessage(member);
      });

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(
        `listen ${wrapInQuotes(`guildMemberAdd`)} event`
      ),
    });
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
    guildChannel: Readonly<GuildChannel>,
    member: Readonly<AnyGuildMember>
  ): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse(
      member
    );

    if (isDiscordGuildChannelWritable(guildChannel)) {
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(
          `sending message for the new guild member...`
        ),
      });

      guildChannel
        .send(messageResponse.response, messageResponse.options)
        .then((): void => {
          // @todo add coverage
          this._loggerService.log({
            context: this._serviceName,
            message: this._chalkService.text(
              `welcome message for the new guild sent`
            ),
          });
        })
        .catch((error: Readonly<Error | string>): void => {
          // @todo add coverage
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
          this._discordGuildSoniaService.sendMessageToChannel({
            channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
            messageResponse: this._discordLoggerErrorService.getErrorMessageResponse(
              error
            ),
          });
        });
    } else {
      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`the guild channel is not writable`),
      });
    }
  }

  private _getMessageResponse(
    member: Readonly<AnyGuildMember>
  ): IDiscordMessageResponse {
    return {
      response: this._getMessageResponseWithEnvPrefix(
        `Welcome <@!${member.id}>! il est midi!`
      ),
    };
  }

  private _getMessageResponseWithEnvPrefix(response: Readonly<string>): string {
    if (!this._appConfigService.isProduction()) {
      return addDiscordDevPrefix({
        asMention: true,
        discordId: this._profileConfigService.getDiscordId(),
        message: response,
        nickname: this._profileConfigService.getNickname(),
      });
    }

    return response;
  }
}
