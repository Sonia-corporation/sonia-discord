import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { toBoolean } from '../../../../../../../../../functions/formatters/to-boolean';
import { hasFirebaseGuildChannels } from '../../../../../../../../firebase/functions/guilds/checks/has-firebase-guild-channels';
import { FirebaseDmsFeaturesService } from '../../../../../../../../firebase/services/dms/features/firebase-dms-features.service';
import { FirebaseDmsFeaturesReleaseNotesEnabledService } from '../../../../../../../../firebase/services/dms/features/release-notes/firebase-dms-features-release-notes-enabled.service';
import { FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService } from '../../../../../../../../firebase/services/guilds/channels/features/release-notes/firebase-guilds-channels-features-release-notes-enabled.service';
import { FirebaseGuildsChannelsService } from '../../../../../../../../firebase/services/guilds/channels/firebase-guilds-channels.service';
import { FirebaseDmsStoreService } from '../../../../../../../../firebase/stores/dms/services/firebase-dms-store.service';
import { FirebaseGuildsStoreService } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.service';
import { IFirebaseDm } from '../../../../../../../../firebase/types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../../../../../../../firebase/types/dms/firebase-dm-v-final';
import { IFirebaseGuildChannel } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuildChannelVFinal } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { ChalkService } from '../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { getDiscordHumanizedChannelFromClass } from '../../../../../../../channels/functions/get-discord-humanized-channel-from-class';
import { isDiscordDmChannel } from '../../../../../../../channels/functions/is-discord-dm-channel';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { IAnyDiscordChannel } from '../../../../../../../channels/types/any-discord-channel';
import { IDiscordHumanizedChannel } from '../../../../../../../channels/types/discord-humanized-channel';
import { wrapUserIdIntoMention } from '../../../../../../../mentions/functions/wrap-user-id-into-mention';
import { DiscordCommandFlagActionBoolean } from '../../../../../../classes/commands/flags/discord-command-flag-action-boolean';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageErrorService } from '../../../../../helpers/discord-message-error.service';
import { DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService } from '../services/discord-message-command-feature-release-notes-enabled-success-flag.service';
import { Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureReleaseNotesEnabled<T extends string>
  implements DiscordCommandFlagActionBoolean<T>
{
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_ENABLED;

  public execute(
    anyDiscordMessage: IAnyDiscordMessage,
    value?: string | null | undefined
  ): Promise<IDiscordCommandFlagSuccess> {
    const shouldEnable: boolean = toBoolean(value, true);

    this._logExecuteAction(anyDiscordMessage.id);
    this._logNewState(anyDiscordMessage.id, shouldEnable);

    if (isDiscordDmChannel(anyDiscordMessage.channel)) {
      return this.isEnabledForThisDm(anyDiscordMessage).then(
        (isEnabled: boolean | undefined): Promise<IDiscordCommandFlagSuccess> => {
          this._logCurrentState(anyDiscordMessage.id, isEnabled);

          if (_.isNil(anyDiscordMessage.author)) {
            return Promise.reject(new Error(`Firebase author invalid`));
          }

          if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
            return Promise.reject(new Error(`Firebase channel invalid`));
          }

          return this.updateDatabaseForThisDm(
            shouldEnable,
            isEnabled,
            anyDiscordMessage.author,
            anyDiscordMessage.channel
          );
        }
      );
    }

    return this.isEnabledForThisGuild(anyDiscordMessage).then(
      (isEnabled: boolean | undefined): Promise<IDiscordCommandFlagSuccess> => {
        this._logCurrentState(anyDiscordMessage.id, isEnabled);

        if (_.isNil(anyDiscordMessage.guild)) {
          return Promise.reject(new Error(`Firebase guild invalid`));
        }

        if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
          return Promise.reject(new Error(`Firebase channel invalid`));
        }

        return this.updateDatabaseForThisGuild(
          shouldEnable,
          isEnabled,
          anyDiscordMessage.guild,
          anyDiscordMessage.channel
        );
      }
    );
  }

  public isEnabledForThisDm(anyDiscordMessage: IAnyDiscordMessage): Promise<boolean | undefined> {
    if (_.isNil(anyDiscordMessage.author)) {
      return this._getNoAuthorMessageError(anyDiscordMessage);
    }

    const firebaseDm: IFirebaseDm | undefined = FirebaseDmsStoreService.getInstance().getEntity(
      anyDiscordMessage.author.id
    );

    if (_.isNil(firebaseDm)) {
      return this._getNoFirebaseDmError(anyDiscordMessage, anyDiscordMessage.author.id);
    }

    return Promise.resolve(this._isReleaseNotesEnabledForThisDm(firebaseDm));
  }

  public isEnabledForThisGuild(anyDiscordMessage: IAnyDiscordMessage): Promise<boolean | undefined> {
    if (_.isNil(anyDiscordMessage.guild)) {
      return this._getNoGuildMessageError(anyDiscordMessage);
    }

    const firebaseGuild: IFirebaseGuild | undefined = FirebaseGuildsStoreService.getInstance().getEntity(
      anyDiscordMessage.guild.id
    );

    if (_.isNil(firebaseGuild)) {
      return this._getNoFirebaseGuildError(anyDiscordMessage, anyDiscordMessage.guild.id);
    }

    return Promise.resolve(this._isReleaseNotesEnabledForThisGuild(firebaseGuild, anyDiscordMessage.channel.id));
  }

  public updateDatabaseForThisDm(
    shouldEnable: boolean,
    isEnabled: boolean | undefined,
    { id }: IFirebaseDm,
    discordChannel: IAnyDiscordChannel
  ): Promise<IDiscordCommandFlagSuccess> {
    if (_.isNil(id)) {
      return Promise.reject(new Error(`Firebase DM ID invalid`));
    }

    const humanizedChannel: IDiscordHumanizedChannel = getDiscordHumanizedChannelFromClass(discordChannel);

    return FirebaseDmsFeaturesReleaseNotesEnabledService.getInstance()
      .updateStateByDmId(id, shouldEnable)
      .then(
        (): Promise<IDiscordCommandFlagSuccess> =>
          Promise.resolve(this._getCommandFlagSuccess(shouldEnable, isEnabled, humanizedChannel))
      );
  }

  public updateDatabaseForThisGuild(
    shouldEnable: boolean,
    isEnabled: boolean | undefined,
    { id }: IFirebaseGuild,
    discordChannel: IAnyDiscordChannel
  ): Promise<IDiscordCommandFlagSuccess> {
    if (_.isNil(id)) {
      return Promise.reject(new Error(`Firebase guild id invalid`));
    }

    const humanizedChannel: IDiscordHumanizedChannel = getDiscordHumanizedChannelFromClass(discordChannel);

    return FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService.getInstance()
      .updateStateByGuildId(id, discordChannel.id, shouldEnable)
      .then(
        (): Promise<IDiscordCommandFlagSuccess> =>
          Promise.resolve(this._getCommandFlagSuccess(shouldEnable, isEnabled, humanizedChannel))
      );
  }

  private _isReleaseNotesEnabledForThisDm(firebaseDm: IFirebaseDm): boolean | undefined {
    if (
      !FirebaseDmsFeaturesService.getInstance().isValid(firebaseDm.features) ||
      !FirebaseDmsFeaturesService.getInstance().isUpToDate(firebaseDm.features)
    ) {
      return undefined;
    }

    return this._getFirebaseEnabledStateForThisDm(firebaseDm);
  }

  private _isReleaseNotesEnabledForThisGuild(firebaseGuild: IFirebaseGuild, channelId: Snowflake): boolean | undefined {
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

    return this._getFirebaseEnabledStateForThisGuild(firebaseGuildChannel);
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

  private _getFirebaseEnabledStateForThisDm(firebaseDm: IFirebaseDmVFinal): boolean | undefined {
    return firebaseDm.features?.releaseNotes?.isEnabled;
  }

  private _getFirebaseEnabledStateForThisGuild(firebaseGuildChannel: IFirebaseGuildChannelVFinal): boolean | undefined {
    return firebaseGuildChannel.features?.releaseNotes?.isEnabled;
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

  private _logExecuteAction(discordMessageId: Snowflake): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `executing ${ChalkService.getInstance().value(`enabled`)} action`
      ),
    });
  }

  private _logNewState(discordMessageId: Snowflake, isEnabled: boolean): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `new state: ${ChalkService.getInstance().value(isEnabled)}`
      ),
    });
  }

  private _logCurrentState(discordMessageId: Snowflake, isEnabled: boolean | undefined): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `current state: ${ChalkService.getInstance().value(_.isNil(isEnabled) ? `undefined` : isEnabled)}`
      ),
    });
  }

  private _getCommandFlagSuccess(
    shouldEnable: boolean,
    isEnabled: boolean | undefined,
    humanizedChannel: IDiscordHumanizedChannel
  ): IDiscordCommandFlagSuccess {
    return DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService.getInstance().getFlag(
      shouldEnable,
      isEnabled,
      humanizedChannel
    );
  }
}
