import { DiscordMessageCommandVerifyChannelRightCoreService } from './discord-message-command-verify-channel-right-core.service';
import { DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService } from './discord-message-command-verify-channel-right-warning-unsupported-channel-type.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { GithubConfigService } from '../../../../github/services/config/github-config.service';
import { DiscordChannelEnum } from '../../../channels/enums/discord-channel.enum';
import { getDiscordHumanizedChannelPluralFromClass } from '../../../channels/functions/get-discord-humanized-channel-plural-from-class';
import { getDiscordHumanizedChannelsPlural } from '../../../channels/functions/get-discord-humanized-channels-plural';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { EmbedFieldData } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandVerifyChannelRightService extends DiscordMessageCommandVerifyChannelRightCoreService {
  private static _instance: DiscordMessageCommandVerifyChannelRightService;

  public static getInstance(): DiscordMessageCommandVerifyChannelRightService {
    if (_.isNil(DiscordMessageCommandVerifyChannelRightService._instance)) {
      DiscordMessageCommandVerifyChannelRightService._instance = new DiscordMessageCommandVerifyChannelRightService();
    }

    return DiscordMessageCommandVerifyChannelRightService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERIFY_CHANNEL_RIGHT_SERVICE);
  }

  /**
   * @description
   * Check if the given message channel is allowed to execute the command related to the message.
   * @param   {IAnyDiscordMessage}      message         The message that trigger a command.
   * @param   {Set<DiscordChannelEnum>} allowedChannels A list of channels allowed to execute the related command.
   * @returns {boolean | undefined}                     Return true when the command related to the message can be executed.
   */
  public verify(message: IAnyDiscordMessage, allowedChannels: Set<DiscordChannelEnum>): boolean | undefined {
    const isAllowed: boolean | undefined = super.verify(message, allowedChannels);

    if (_.isUndefined(isAllowed)) {
      DiscordMessageCommandVerifyChannelRightWarningUnsupportedChannelTypeService.getInstance().warn(message.id);
    }

    return isAllowed;
  }

  protected _getMessageEmbedFieldWrongChannel({ channel }: IAnyDiscordMessage): EmbedFieldData {
    return {
      name: `Wrong channel!`,
      value: `This command is not allowed on ${getDiscordHumanizedChannelPluralFromClass(channel)}.`,
    };
  }

  protected _getMessageEmbedFieldHint(allowedChannels: Set<DiscordChannelEnum>): EmbedFieldData {
    return {
      name: `Allowed channels`,
      value: `You can use this command only on ${getDiscordHumanizedChannelsPlural(Array.from(allowedChannels))}.`,
    };
  }

  protected _getMessageEmbedFieldReport({ channel }: IAnyDiscordMessage): EmbedFieldData {
    const githubFeatureRequestUrl: string = GithubConfigService.getInstance().getFeatureRequestUrl();

    return {
      name: `Help me to get better!`,
      value: `If you think that using this command on ${getDiscordHumanizedChannelPluralFromClass(
        channel
      )} should be allowed, do not hesitate to submit a [feature request](${githubFeatureRequestUrl}).`,
    };
  }
}
