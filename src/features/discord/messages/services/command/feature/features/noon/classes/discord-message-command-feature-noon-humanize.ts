import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { hasFirebaseGuildChannels } from '../../../../../../../../firebase/functions/guilds/checks/has-firebase-guild-channels';
import { FirebaseGuildsStoreService } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.service';
import { IFirebaseGuildChannelFeatureNoonState } from '../../../../../../../../firebase/types/guilds/channels/features/firebase-guild-channel-feature-noon-state';
import { IFirebaseGuildChannel } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { ChalkService } from '../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { DiscordCommandFlagActionValueless } from '../../../../../../classes/commands/flags/discord-command-flag-action-valueless';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageHelpService } from '../../../../../helpers/discord-message-help.service';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_DISABLED_MESSAGES } from '../constants/discord-message-command-feature-noon-humanize-disabled-messages';
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_ENABLED_MESSAGES } from '../constants/discord-message-command-feature-noon-humanize-enabled-messages';
import { MessageEmbedOptions, Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonHumanize<T extends string>
  implements DiscordCommandFlagActionValueless<T>
{
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE;

  public execute(anyDiscordMessage: Readonly<IAnyDiscordMessage>): Promise<IDiscordMessageResponse> {
    this._logExecuteAction(anyDiscordMessage.id);

    return this.getStates(anyDiscordMessage).then(
      (state: Readonly<IFirebaseGuildChannelFeatureNoonState>): Promise<IDiscordMessageResponse> => {
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

  public getStates(anyDiscordMessage: Readonly<IAnyDiscordMessage>): Promise<IFirebaseGuildChannelFeatureNoonState> {
    if (_.isNil(anyDiscordMessage.guild)) {
      return this._getNoGuildMessageError(anyDiscordMessage.id);
    }

    const firebaseGuild: IFirebaseGuild | undefined = FirebaseGuildsStoreService.getInstance().getEntity(
      anyDiscordMessage.guild.id
    );

    if (_.isNil(firebaseGuild)) {
      return this._getNoFirebaseGuildError(anyDiscordMessage.id, anyDiscordMessage.guild.id);
    }

    const state: IFirebaseGuildChannelFeatureNoonState = {
      isEnabled: this._isNoonEnabled(firebaseGuild, anyDiscordMessage.channel.id),
    };

    return Promise.resolve(state);
  }

  public getMessageResponse(state: Readonly<IFirebaseGuildChannelFeatureNoonState>): Promise<IDiscordMessageResponse> {
    return DiscordMessageHelpService.getInstance()
      .getMessageResponse()
      .then((helpMessageResponse: Readonly<IDiscordMessageResponse>): Promise<IDiscordMessageResponse> => {
        const message: IDiscordMessageResponse = {
          options: {
            embeds: [this._getMessageEmbed(state)],
          },
        };

        return Promise.resolve(_.merge({}, helpMessageResponse, message));
      });
  }

  private _isNoonEnabled(firebaseGuild: Readonly<IFirebaseGuild>, channelId: Readonly<Snowflake>): boolean | undefined {
    const firebaseGuildChannel: IFirebaseGuildChannel | undefined = this._getFirebaseGuildChannel(
      firebaseGuild,
      channelId
    );

    if (_.isNil(firebaseGuildChannel)) {
      return undefined;
    }

    return this._getFirebaseEnabledState(firebaseGuildChannel);
  }

  private _getFirebaseEnabledState(firebaseGuildChannel: Readonly<IFirebaseGuildChannel>): boolean | undefined {
    return firebaseGuildChannel.features?.noon?.isEnabled;
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

  private _getMessageEmbed(state: Readonly<IFirebaseGuildChannelFeatureNoonState>): MessageEmbedOptions {
    return {
      description: this._getMessageDescription(state),
      title: this._getMessageEmbedTitle(state),
    };
  }

  private _getMessageDescription(state: Readonly<IFirebaseGuildChannelFeatureNoonState>): string {
    if (_.isNil(state.isEnabled)) {
      return `I will not send a message at noon since it was never enabled on this channel.`;
    } else if (_.isEqual(state.isEnabled, true)) {
      return `I will send a message each day at noon (12 A.M) on Paris timezone on this channel.`;
    }

    return `I will not send a message at noon since it was disabled on this channel.`;
  }

  private _getMessageEmbedTitle(state: Readonly<IFirebaseGuildChannelFeatureNoonState>): string {
    if (_.isNil(state.isEnabled) || _.isEqual(state.isEnabled, false)) {
      return DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_DISABLED_MESSAGES.getRandomMessage();
    }

    return DISCORD_MESSAGE_COMMAND_FEATURE_NOON_HUMANIZE_ENABLED_MESSAGES.getRandomMessage();
  }
}
