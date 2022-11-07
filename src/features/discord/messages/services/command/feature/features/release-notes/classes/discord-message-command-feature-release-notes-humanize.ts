import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { hasFirebaseGuildChannels } from '../../../../../../../../firebase/functions/guilds/checks/has-firebase-guild-channels';
import { FirebaseGuildsChannelsService } from '../../../../../../../../firebase/services/guilds/channels/firebase-guilds-channels.service';
import { FirebaseGuildsStoreQuery } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.query';
import { IFirebaseGuildChannelFeatureReleaseNotesState } from '../../../../../../../../firebase/types/guilds/channels/features/firebase-guild-channel-feature-release-notes-state';
import { IFirebaseGuildChannel } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuildChannelVFinal } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { ChalkService } from '../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { DiscordCommandFlagActionValueless } from '../../../../../../classes/commands/flags/discord-command-flag-action-valueless';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageHelpService } from '../../../../../helpers/discord-message-help.service';
import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_DISABLED_MESSAGES } from '../constants/discord-message-command-feature-release-notes-humanize-disabled-messages';
import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_ENABLED_MESSAGES } from '../constants/discord-message-command-feature-release-notes-humanize-enabled-messages';
import { MessageEmbedOptions, Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureReleaseNotesHumanize<T extends string>
  implements DiscordCommandFlagActionValueless<T>
{
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE;

  public execute(anyDiscordMessage: Readonly<IAnyDiscordMessage>): Promise<IDiscordMessageResponse> {
    this._logExecuteAction(anyDiscordMessage.id);

    return this.getStates(anyDiscordMessage).then(
      (state: Readonly<IFirebaseGuildChannelFeatureReleaseNotesState>): Promise<IDiscordMessageResponse> => {
        if (_.isNil(anyDiscordMessage.guild)) {
          return Promise.reject(new Error(`Firebase guild invalid`));
        }

        if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
          return Promise.reject(new Error(`Firebase channel invalid`));
        }

        return this.getMessageResponse(state);
      }
    );
  }

  public getStates(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>
  ): Promise<IFirebaseGuildChannelFeatureReleaseNotesState> {
    if (_.isNil(anyDiscordMessage.guild)) {
      return this._getNoGuildMessageError(anyDiscordMessage.id);
    }

    const firebaseGuild: IFirebaseGuild | undefined = FirebaseGuildsStoreQuery.getInstance().getEntity(
      anyDiscordMessage.guild.id
    );

    if (_.isNil(firebaseGuild)) {
      return this._getNoFirebaseGuildError(anyDiscordMessage.id, anyDiscordMessage.guild.id);
    }

    const state: IFirebaseGuildChannelFeatureReleaseNotesState = {
      isEnabled: this._isReleaseNotesEnabled(firebaseGuild, anyDiscordMessage.channel.id),
    };

    return Promise.resolve(state);
  }

  public getMessageResponse(
    state: Readonly<IFirebaseGuildChannelFeatureReleaseNotesState>
  ): Promise<IDiscordMessageResponse> {
    return DiscordMessageHelpService.getInstance()
      .getMessageResponse()
      .then((helpMessageResponse: Readonly<IDiscordMessageResponse>): Promise<IDiscordMessageResponse> => {
        const message: IDiscordMessageResponse = {
          content: ``,
          options: {
            embeds: [this._getMessageEmbed(state)],
          },
        };

        return Promise.resolve(_.merge({}, helpMessageResponse, message));
      });
  }

  private _isReleaseNotesEnabled(
    firebaseGuild: Readonly<IFirebaseGuild>,
    channelId: Readonly<Snowflake>
  ): boolean | undefined {
    const firebaseGuildChannel: IFirebaseGuildChannel | undefined = this._getFirebaseGuildChannel(
      firebaseGuild,
      channelId
    );

    if (
      !FirebaseGuildsChannelsService.getInstance().isValid(firebaseGuildChannel) ||
      !FirebaseGuildsChannelsService.getInstance().isUpToDate(firebaseGuildChannel)
    ) {
      return undefined;
    }

    return this._getFirebaseEnabledState(firebaseGuildChannel);
  }

  private _getFirebaseEnabledState(firebaseGuildChannel: Readonly<IFirebaseGuildChannelVFinal>): boolean | undefined {
    return firebaseGuildChannel.features?.releaseNotes?.isEnabled;
  }

  private _getFirebaseGuildChannel(
    firebaseGuild: Readonly<IFirebaseGuild>,
    channelId: Readonly<Snowflake>
  ): IFirebaseGuildChannel | undefined {
    if (!hasFirebaseGuildChannels(firebaseGuild)) {
      return undefined;
    }

    return _.get(firebaseGuild.channels, channelId);
  }

  private _getNoFirebaseGuildError(
    discordMessageId: Readonly<Snowflake>,
    guildId: Readonly<Snowflake>
  ): Promise<never> {
    LoggerService.getInstance().error({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `could not find the guild ${ChalkService.getInstance().value(guildId)} in Firebase`
      ),
    });

    return Promise.reject(new Error(`Could not find the guild ${guildId} in Firebase`));
  }

  private _getNoGuildMessageError(discordMessageId: Readonly<Snowflake>): Promise<never> {
    LoggerService.getInstance().error({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `could not get the guild from the message`
      ),
    });

    return Promise.reject(new Error(`Could not get the guild from the message`));
  }

  private _logExecuteAction(discordMessageId: Readonly<Snowflake>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `executing ${ChalkService.getInstance().value(`humanize`)} action`
      ),
    });
  }

  private _getMessageEmbed(state: Readonly<IFirebaseGuildChannelFeatureReleaseNotesState>): MessageEmbedOptions {
    return {
      description: this._getMessageDescription(state),
      title: this._getMessageEmbedTitle(state),
    };
  }

  private _getMessageDescription(state: Readonly<IFirebaseGuildChannelFeatureReleaseNotesState>): string {
    if (_.isNil(state.isEnabled)) {
      return `I will not send a message containing the release notes when a new feature is deployed since it was never enabled on this channel.`;
    } else if (_.isEqual(state.isEnabled, true)) {
      return `I will send a message on this channel containing the release notes when a new feature is deployed.`;
    }

    return `I will not send a message containing the release notes when a new feature is deployed since it was disabled on this channel.`;
  }

  private _getMessageEmbedTitle(state: Readonly<IFirebaseGuildChannelFeatureReleaseNotesState>): string {
    if (_.isNil(state.isEnabled) || _.isEqual(state.isEnabled, false)) {
      return DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_DISABLED_MESSAGES.getRandomMessage();
    }

    return DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_ENABLED_MESSAGES.getRandomMessage();
  }
}
