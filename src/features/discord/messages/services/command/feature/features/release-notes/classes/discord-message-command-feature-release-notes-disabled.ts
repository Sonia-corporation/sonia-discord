import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { toBoolean } from '../../../../../../../../../functions/formatters/to-boolean';
import { hasFirebaseGuildChannels } from '../../../../../../../../firebase/functions/guilds/checks/has-firebase-guild-channels';
import { FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService } from '../../../../../../../../firebase/services/guilds/channels/features/release-notes/firebase-guilds-channels-features-release-notes-enabled.service';
import { FirebaseGuildsChannelsService } from '../../../../../../../../firebase/services/guilds/channels/firebase-guilds-channels.service';
import { FirebaseGuildsStoreQuery } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.query';
import { IFirebaseGuildChannelVFinal } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuildChannel } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { ChalkService } from '../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { IAnyDiscordChannel } from '../../../../../../../channels/types/any-discord-channel';
import { DiscordCommandFlagActionBoolean } from '../../../../../../classes/commands/flags/discord-command-flag-action-boolean';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService } from '../services/discord-message-command-feature-release-notes-enabled-success-flag.service';
import { Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureReleaseNotesDisabled<T extends string>
  implements DiscordCommandFlagActionBoolean<T>
{
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_DISABLED;

  public execute(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    value?: Readonly<string | null | undefined>
  ): Promise<IDiscordCommandFlagSuccess> {
    const shouldDisable: boolean = toBoolean(value, true);

    this._logExecuteAction(anyDiscordMessage.id);
    this._logNewState(anyDiscordMessage.id, shouldDisable);

    return this.isDisabled(anyDiscordMessage).then(
      (isDisabled: Readonly<boolean | undefined>): Promise<IDiscordCommandFlagSuccess> => {
        this._logCurrentState(anyDiscordMessage.id, isDisabled);

        if (!_.isNil(anyDiscordMessage.guild)) {
          if (DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
            return this.updateDatabase(shouldDisable, isDisabled, anyDiscordMessage.guild, anyDiscordMessage.channel);
          }

          return Promise.reject(new Error(`Firebase channel invalid`));
        }

        return Promise.reject(new Error(`Firebase guild invalid`));
      }
    );
  }

  public isDisabled(anyDiscordMessage: Readonly<IAnyDiscordMessage>): Promise<boolean | undefined> {
    if (_.isNil(anyDiscordMessage.guild)) {
      return this._getNoGuildMessageError(anyDiscordMessage.id);
    }

    const firebaseGuild: IFirebaseGuild | undefined = FirebaseGuildsStoreQuery.getInstance().getEntity(
      anyDiscordMessage.guild.id
    );

    if (_.isNil(firebaseGuild)) {
      return this._getNoFirebaseGuildError(anyDiscordMessage.id, anyDiscordMessage.guild.id);
    }

    return Promise.resolve(this._isReleaseNotesDisabled(firebaseGuild, anyDiscordMessage.channel.id));
  }

  public updateDatabase(
    shouldDisable: Readonly<boolean>,
    isDisabled: Readonly<boolean | undefined>,
    { id }: Readonly<IFirebaseGuild>,
    discordChannel: Readonly<IAnyDiscordChannel>
  ): Promise<IDiscordCommandFlagSuccess> {
    if (_.isNil(id)) {
      return Promise.reject(new Error(`Firebase guild id invalid`));
    }

    return FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService.getInstance()
      .updateStateByGuildId(id, discordChannel.id, !shouldDisable)
      .then(
        (): Promise<IDiscordCommandFlagSuccess> =>
          Promise.resolve(this._getCommandFlagSuccess(shouldDisable, isDisabled))
      );
  }

  private _isReleaseNotesDisabled(
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

    return this._getFirebaseDisabledState(firebaseGuildChannel);
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

  private _getFirebaseDisabledState(firebaseGuildChannel: Readonly<IFirebaseGuildChannelVFinal>): boolean | undefined {
    const isEnabled: boolean | undefined = firebaseGuildChannel.features?.releaseNotes?.isEnabled;

    if (!_.isBoolean(isEnabled)) {
      return undefined;
    }

    /**
     * @description
     * Reverse the enabled state since there is no disabled state in the model
     */
    return !isEnabled;
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

  private _logExecuteAction(discordMessageId: Readonly<Snowflake>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `executing ${ChalkService.getInstance().value(`disabled`)} action`
      ),
    });
  }

  private _logNewState(discordMessageId: Readonly<Snowflake>, isDisabled: Readonly<boolean>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `new state: ${ChalkService.getInstance().value(isDisabled)}`
      ),
    });
  }

  private _logCurrentState(discordMessageId: Readonly<Snowflake>, isDisabled: Readonly<boolean | undefined>): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `current state: ${ChalkService.getInstance().value(_.isNil(isDisabled) ? `undefined` : isDisabled)}`
      ),
    });
  }

  private _getCommandFlagSuccess(
    shouldDisable: Readonly<boolean>,
    isDisabled: Readonly<boolean | undefined>
  ): IDiscordCommandFlagSuccess {
    return DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService.getInstance().getFlag(
      !shouldDisable,
      _.isBoolean(isDisabled) ? !isDisabled : undefined
    );
  }
}
