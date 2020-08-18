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
import { wrapUserIdIntoMention } from "../../mentions/functions/wrap-user-id-into-mention";
import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordGuildSoniaChannelNameEnum } from "../enums/discord-guild-sonia-channel-name.enum";
import { IAnyGuildMember } from "../types/any-guild-member";
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

  public constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_MEMBER_ADD_SERVICE);
  }

  public init(): void {
    this._listen();
  }

  public sendMessage(member: Readonly<IAnyGuildMember>): void {
    if (this._canSendMessage()) {
      const primaryChannel: GuildChannel | null = DiscordChannelGuildService.getInstance().getPrimary(
        member.guild
      );

      if (isDiscordGuildChannel(primaryChannel)) {
        this._sendMessage(primaryChannel, member);
      }
    }
  }

  private _listen(): void {
    DiscordClientService.getInstance()
      .getClient()
      .on(`guildMemberAdd`, (member: Readonly<IAnyGuildMember>): void => {
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(
            `${wrapInQuotes(`guildMemberAdd`)} event triggered`
          ),
        });

        this.sendMessage(member);
      });

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `listen ${wrapInQuotes(`guildMemberAdd`)} event`
      ),
    });
  }

  private _canSendMessage(): boolean {
    if (DiscordGuildConfigService.getInstance().shouldWelcomeNewMembers()) {
      return true;
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `welcome new members message sending disabled`
      ),
    });

    return false;
  }

  private _sendMessage(
    guildChannel: Readonly<GuildChannel>,
    member: Readonly<IAnyGuildMember>
  ): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse(
      member
    );

    if (isDiscordGuildChannelWritable(guildChannel)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `sending message for the new guild member...`
        ),
      });

      guildChannel
        .send(messageResponse.response, messageResponse.options)
        .then((): void => {
          // @todo add coverage
          LoggerService.getInstance().log({
            context: this._serviceName,
            message: ChalkService.getInstance().text(
              `welcome message for the new guild sent`
            ),
          });
        })
        .catch((error: Readonly<Error | string>): void => {
          // @todo add coverage
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().text(
              `message sending for the new guild member failed`
            ),
          });
          LoggerService.getInstance().error({
            context: this._serviceName,
            message: ChalkService.getInstance().error(error),
          });
          DiscordGuildSoniaService.getInstance().sendMessageToChannel({
            channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
            messageResponse: DiscordLoggerErrorService.getInstance().getErrorMessageResponse(
              error
            ),
          });
        });
    } else {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `the guild channel is not writable`
        ),
      });
    }
  }

  private _getMessageResponse(
    member: Readonly<IAnyGuildMember>
  ): IDiscordMessageResponse {
    return {
      response: this._getMessageResponseWithEnvPrefix(
        `Welcome ${wrapUserIdIntoMention(member.id)}! il est midi!`
      ),
    };
  }

  private _getMessageResponseWithEnvPrefix(response: Readonly<string>): string {
    if (!AppConfigService.getInstance().isProduction()) {
      return addDiscordDevPrefix({
        asMention: true,
        discordId: ProfileConfigService.getInstance().getDiscordId(),
        message: response,
        nickname: ProfileConfigService.getInstance().getNickname(),
      });
    }

    return response;
  }
}
