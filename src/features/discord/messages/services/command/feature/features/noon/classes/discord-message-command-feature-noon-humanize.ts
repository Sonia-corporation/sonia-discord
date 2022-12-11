import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { hasFirebaseGuildChannels } from '../../../../../../../../firebase/functions/guilds/checks/has-firebase-guild-channels';
import { FirebaseDmsStoreService } from '../../../../../../../../firebase/stores/dms/services/firebase-dms-store.service';
import { FirebaseGuildsStoreService } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.service';
import { IFirebaseDmFeatureNoonState } from '../../../../../../../../firebase/types/dms/features/firebase-dm-feature-noon-state';
import { IFirebaseDm } from '../../../../../../../../firebase/types/dms/firebase-dm';
import { IFirebaseGuildChannelFeatureNoonState } from '../../../../../../../../firebase/types/guilds/channels/features/firebase-guild-channel-feature-noon-state';
import { IFirebaseGuildChannel } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { ChalkService } from '../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { getDiscordHumanizedChannelFromClass } from '../../../../../../../channels/functions/get-discord-humanized-channel-from-class';
import { isDiscordDmChannel } from '../../../../../../../channels/functions/is-discord-dm-channel';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { IDiscordHumanizedChannel } from '../../../../../../../channels/types/discord-humanized-channel';
import { wrapUserIdIntoMention } from '../../../../../../../mentions/functions/wrap-user-id-into-mention';
import { DiscordCommandFlagActionValueless } from '../../../../../../classes/commands/flags/discord-command-flag-action-valueless';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageErrorService } from '../../../../../helpers/discord-message-error.service';
import { DiscordMessageHelpService } from '../../../../../helpers/discord-message-help.service';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_DISABLED_MESSAGES } from '../constants/discord-message-command-feature-noon-humanize-disabled-messages';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_ENABLED_MESSAGES } from '../constants/discord-message-command-feature-noon-humanize-enabled-messages';
import { EmbedData, Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonHumanize<T extends string>
  implements DiscordCommandFlagActionValueless<T>
{
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE;

  public execute(anyDiscordMessage: IAnyDiscordMessage): Promise<IDiscordMessageResponse> {
    this._logExecuteAction(anyDiscordMessage.id);

    const humanizedChannel: IDiscordHumanizedChannel = getDiscordHumanizedChannelFromClass(anyDiscordMessage.channel);

    if (isDiscordDmChannel(anyDiscordMessage.channel)) {
      return this.getStatesForThisDm(anyDiscordMessage).then(
        (state: IFirebaseDmFeatureNoonState): Promise<IDiscordMessageResponse> => {
          if (_.isNil(anyDiscordMessage.author)) {
            return Promise.reject(new Error(`Firebase author invalid`));
          }

          if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
            return Promise.reject(new Error(`Firebase channel invalid`));
          }

          return this.getMessageResponse(state, humanizedChannel);
        }
      );
    }

    return this.getStatesForThisGuild(anyDiscordMessage).then(
      (state: IFirebaseGuildChannelFeatureNoonState): Promise<IDiscordMessageResponse> => {
        if (_.isNil(anyDiscordMessage.guild)) {
          return Promise.reject(new Error(`Firebase guild invalid`));
        }

        if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
          return Promise.reject(new Error(`Firebase channel invalid`));
        }

        return this.getMessageResponse(state, humanizedChannel);
      }
    );
  }

  public getStatesForThisDm(anyDiscordMessage: IAnyDiscordMessage): Promise<IFirebaseDmFeatureNoonState> {
    if (_.isNil(anyDiscordMessage.author)) {
      return this._getNoAuthorMessageError(anyDiscordMessage);
    }

    const firebaseDm: IFirebaseDm | undefined = FirebaseDmsStoreService.getInstance().getEntity(
      anyDiscordMessage.author.id
    );

    if (_.isNil(firebaseDm)) {
      return this._getNoFirebaseDmError(anyDiscordMessage, anyDiscordMessage.author.id);
    }

    const state: IFirebaseDmFeatureNoonState = {
      isEnabled: this._isNoonEnabledForThisDm(firebaseDm),
    };

    return Promise.resolve(state);
  }

  public getStatesForThisGuild(anyDiscordMessage: IAnyDiscordMessage): Promise<IFirebaseGuildChannelFeatureNoonState> {
    if (_.isNil(anyDiscordMessage.guild)) {
      return this._getNoGuildMessageError(anyDiscordMessage);
    }

    const firebaseGuild: IFirebaseGuild | undefined = FirebaseGuildsStoreService.getInstance().getEntity(
      anyDiscordMessage.guild.id
    );

    if (_.isNil(firebaseGuild)) {
      return this._getNoFirebaseGuildError(anyDiscordMessage, anyDiscordMessage.guild.id);
    }

    const state: IFirebaseGuildChannelFeatureNoonState = {
      isEnabled: this._isNoonEnabledForThisGuild(firebaseGuild, anyDiscordMessage.channel.id),
    };

    return Promise.resolve(state);
  }

  public getMessageResponse(
    state: IFirebaseGuildChannelFeatureNoonState | IFirebaseDmFeatureNoonState,
    humanizedChannel: IDiscordHumanizedChannel
  ): Promise<IDiscordMessageResponse> {
    return DiscordMessageHelpService.getInstance()
      .getMessageResponse()
      .then((helpMessageResponse: IDiscordMessageResponse): Promise<IDiscordMessageResponse> => {
        const message: IDiscordMessageResponse = {
          options: {
            embeds: [this._getMessageEmbed(state, humanizedChannel)],
          },
        };

        return Promise.resolve(_.merge({}, helpMessageResponse, message));
      });
  }

  private _isNoonEnabledForThisDm(firebaseDm: IFirebaseDm): boolean | undefined {
    return this._getFirebaseEnabledStateForThisDm(firebaseDm);
  }

  private _isNoonEnabledForThisGuild(firebaseGuild: IFirebaseGuild, channelId: Snowflake): boolean | undefined {
    const firebaseGuildChannel: IFirebaseGuildChannel | undefined = this._getFirebaseGuildChannel(
      firebaseGuild,
      channelId
    );

    if (_.isNil(firebaseGuildChannel)) {
      return undefined;
    }

    return this._getFirebaseEnabledStateForThisGuild(firebaseGuildChannel);
  }

  private _getFirebaseEnabledStateForThisDm(firebaseDm: IFirebaseDm): boolean | undefined {
    return firebaseDm.features?.noon?.isEnabled;
  }

  private _getFirebaseEnabledStateForThisGuild(firebaseGuildChannel: IFirebaseGuildChannel): boolean | undefined {
    return firebaseGuildChannel.features?.noon?.isEnabled;
  }

  private _getFirebaseGuildChannel(
    firebaseGuild: IFirebaseGuild,
    channelId: Snowflake
  ): IFirebaseGuildChannel | undefined {
    if (!hasFirebaseGuildChannels(firebaseGuild)) {
      return undefined;
    }

    return _.get(firebaseGuild.channels, channelId);
  }

  private _getNoFirebaseDmError(anyDiscordMessage: IAnyDiscordMessage, userId: Snowflake): Promise<never> {
    const error: Error = new Error(`Could not find the DM ${wrapUserIdIntoMention(userId)} in Firebase`);

    DiscordMessageErrorService.getInstance().handleError(
      error,
      anyDiscordMessage,
      `could not find the DM ${ChalkService.getInstance().value(userId)} in Firebase`
    );

    return Promise.reject(error);
  }

  private _getNoFirebaseGuildError(anyDiscordMessage: IAnyDiscordMessage, guildId: Snowflake): Promise<never> {
    const error: Error = new Error(`Could not find the guild ${guildId} in Firebase`);

    DiscordMessageErrorService.getInstance().handleError(
      error,
      anyDiscordMessage,
      `could not find the guild ${ChalkService.getInstance().value(guildId)} in Firebase`
    );

    return Promise.reject(error);
  }

  private _getNoAuthorMessageError(anyDiscordMessage: IAnyDiscordMessage): Promise<never> {
    const error: Error = new Error(`Could not get the author from the message`);

    DiscordMessageErrorService.getInstance().handleError(
      error,
      anyDiscordMessage,
      `could not get the author from the message`
    );

    return Promise.reject(error);
  }

  private _getNoGuildMessageError(anyDiscordMessage: IAnyDiscordMessage): Promise<never> {
    const error: Error = new Error(`Could not get the guild from the message`);

    DiscordMessageErrorService.getInstance().handleError(
      error,
      anyDiscordMessage,
      `could not get the guild from the message`
    );

    return Promise.reject(error);
  }

  private _logExecuteAction(discordMessageId: Snowflake): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `executing ${ChalkService.getInstance().value(`humanize`)} action`
      ),
    });
  }

  private _getMessageEmbed(
    state: IFirebaseGuildChannelFeatureNoonState | IFirebaseDmFeatureNoonState,
    humanizedChannel: IDiscordHumanizedChannel
  ): EmbedData {
    return {
      description: this._getMessageDescription(state, humanizedChannel),
      title: this._getMessageEmbedTitle(state, humanizedChannel),
    };
  }

  private _getMessageDescription(
    state: IFirebaseGuildChannelFeatureNoonState | IFirebaseDmFeatureNoonState,
    humanizedChannel: IDiscordHumanizedChannel
  ): string {
    if (_.isNil(state.isEnabled)) {
      return `I will not send a message at noon since it was never enabled on this ${humanizedChannel}.`;
    } else if (_.isEqual(state.isEnabled, true)) {
      return `I will send a message each day at noon (12 A.M) on Paris timezone on this ${humanizedChannel}.`;
    }

    return `I will not send a message at noon since it was disabled on this ${humanizedChannel}.`;
  }

  private _getMessageEmbedTitle(
    state: IFirebaseGuildChannelFeatureNoonState | IFirebaseDmFeatureNoonState,
    humanizedChannel: IDiscordHumanizedChannel
  ): string {
    if (_.isNil(state.isEnabled) || _.isEqual(state.isEnabled, false)) {
      return DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_DISABLED_MESSAGES.getHumanizedRandomMessage({
        channelType: humanizedChannel,
      });
    }

    return DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_ENABLED_MESSAGES.getRandomMessage();
  }
}
