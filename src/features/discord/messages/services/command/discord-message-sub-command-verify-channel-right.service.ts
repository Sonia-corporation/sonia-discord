import { DiscordMessageCommandVerifyChannelRightCoreService } from './discord-message-command-verify-channel-right-core.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { GithubConfigService } from '../../../../github/services/config/github-config.service';
import { DiscordChannelEnum } from '../../../channels/enums/discord-channel.enum';
import { getDiscordHumanizedChannelPluralFromClass } from '../../../channels/functions/get-discord-humanized-channel-plural-from-class';
import { getDiscordHumanizedChannelsPlural } from '../../../channels/functions/get-discord-humanized-channels-plural';
import { IAnyDiscordMessage } from '../../types/any-discord-message';
import { EmbedFieldData } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageSubCommandVerifyChannelRightService extends DiscordMessageCommandVerifyChannelRightCoreService {
  private static _instance: DiscordMessageSubCommandVerifyChannelRightService;

  public static getInstance(): DiscordMessageSubCommandVerifyChannelRightService {
    if (_.isNil(DiscordMessageSubCommandVerifyChannelRightService._instance)) {
      DiscordMessageSubCommandVerifyChannelRightService._instance =
        new DiscordMessageSubCommandVerifyChannelRightService();
    }

    return DiscordMessageSubCommandVerifyChannelRightService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_SUB_COMMAND_VERIFY_CHANNEL_RIGHT_SERVICE);
  }

  protected _getMessageEmbedFieldWrongChannel({ channel }: IAnyDiscordMessage): EmbedFieldData {
    return {
      name: `Wrong channel!`,
      value: `This sub-command is not allowed on ${getDiscordHumanizedChannelPluralFromClass(channel)}.`,
    };
  }

  protected _getMessageEmbedFieldHint(allowedChannels: Set<DiscordChannelEnum>): EmbedFieldData {
    return {
      name: `Allowed channels`,
      value: `You can use this sub-command only on ${getDiscordHumanizedChannelsPlural(Array.from(allowedChannels))}.`,
    };
  }

  protected _getMessageEmbedFieldReport({ channel }: IAnyDiscordMessage): EmbedFieldData {
    const githubFeatureRequestUrl: string = GithubConfigService.getInstance().getFeatureRequestUrl();

    return {
      name: `Help me to get better!`,
      value: `If you think that using this sub-command on ${getDiscordHumanizedChannelPluralFromClass(
        channel
      )} should be allowed, do not hesitate to submit a [feature request](${githubFeatureRequestUrl}).`,
    };
  }
}
