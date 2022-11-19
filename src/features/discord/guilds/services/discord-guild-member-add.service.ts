import { DiscordGuildConfigService } from './config/discord-guild-config.service';
import { DiscordGuildSoniaService } from './discord-guild-sonia.service';
import { AbstractService } from '../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { AppConfigService } from '../../../app/services/config/app-config.service';
import { ChalkService } from '../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { ProfileConfigService } from '../../../profile/services/config/profile-config.service';
import { getDiscordHumanizedChannel } from '../../channels/functions/get-discord-humanized-channel';
import { isDiscordTextChannel } from '../../channels/functions/is-discord-text-channel';
import { DiscordChannelGuildService } from '../../channels/services/discord-channel-guild.service';
import { IAnyDiscordWritableChannel } from '../../channels/types/any-discord-writable-channel';
import { addDiscordDevPrefix } from '../../functions/dev-prefix/add-discord-dev-prefix';
import { DiscordLoggerErrorService } from '../../logger/services/discord-logger-error.service';
import { wrapUserIdIntoMention } from '../../mentions/functions/wrap-user-id-into-mention';
import { IDiscordMessageResponse } from '../../messages/interfaces/discord-message-response';
import { DiscordMessageRightsService } from '../../messages/services/rights/discord-message-rights.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { DiscordGuildSoniaChannelNameEnum } from '../enums/discord-guild-sonia-channel-name.enum';
import { IAnyGuildMember } from '../types/any-guild-member';
import { Guild } from 'discord.js';
import _ from 'lodash';

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

  public sendMessage(member: IAnyGuildMember): void {
    if (this._canSendMessage(member.guild)) {
      const primaryGuildBasedChannel: IAnyDiscordWritableChannel | null =
        DiscordChannelGuildService.getInstance().getPrimary(member.guild);

      if (_.isNil(primaryGuildBasedChannel)) {
        throw new Error(`No primary guild channel found`);
      }

      this._sendMessage(primaryGuildBasedChannel, member);
    }
  }

  private _listen(): void {
    DiscordClientService.getInstance()
      .getClient()
      .on(`guildMemberAdd`, (member: IAnyGuildMember): void => {
        LoggerService.getInstance().debug({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`${wrapInQuotes(`guildMemberAdd`)} event triggered`),
        });

        this.sendMessage(member);
      });

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`listen ${wrapInQuotes(`guildMemberAdd`)} event`),
    });
  }

  private _canSendMessage(guild: Guild): boolean {
    if (!DiscordMessageRightsService.getInstance().isSoniaAuthorizedForThisGuild(guild)) {
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Sonia is not authorized to send messages to this guild in local environment`
        ),
      });
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `add the guild id ${ChalkService.getInstance().value(
            guild.id
          )} to your secret environment under 'discord.sonia.devGuildIdWhitelist' to allow Sonia to interact with it`
        ),
      });

      return false;
    }

    if (!DiscordGuildConfigService.getInstance().shouldWelcomeNewMembers()) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`welcome new members message sending disabled`),
      });

      return false;
    }

    return true;
  }

  private _sendMessage(primaryGuildBasedChannel: IAnyDiscordWritableChannel, member: IAnyGuildMember): void {
    const messageResponse: IDiscordMessageResponse = this._getMessageResponse(member);

    if (!isDiscordTextChannel(primaryGuildBasedChannel)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(`the guild channel is not a text channel`),
      });
      LoggerService.getInstance().warning({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `The channel ${ChalkService.getInstance().value(
            primaryGuildBasedChannel.name
          )} is not a text channel. The support for ${ChalkService.getInstance().value(
            getDiscordHumanizedChannel(primaryGuildBasedChannel)
          )} is not yet there.`
        ),
      });

      return;
    }

    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`sending message for the new guild member...`),
    });

    primaryGuildBasedChannel
      .send({
        ...messageResponse.options,
        content: messageResponse.content,
      })
      .then((): void => {
        // @todo add coverage
        LoggerService.getInstance().log({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`welcome message for the new guild sent`),
        });
      })
      .catch((error: Error | string): void => {
        // @todo add coverage
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().text(`message sending for the new guild member failed`),
        });
        LoggerService.getInstance().error({
          context: this._serviceName,
          message: ChalkService.getInstance().error(error),
        });
        DiscordGuildSoniaService.getInstance().sendMessageToChannel({
          channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
          messageResponse: DiscordLoggerErrorService.getInstance().getErrorMessageResponse(error),
        });
      });
  }

  private _getMessageResponse({ id }: IAnyGuildMember): IDiscordMessageResponse {
    return {
      content: this._getMessageResponseWithEnvPrefix(`Welcome ${wrapUserIdIntoMention(id)}! il est midi!`),
      options: {},
    };
  }

  private _getMessageResponseWithEnvPrefix(response: string): string {
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
