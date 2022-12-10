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

export class DiscordMessageCommandFeatureReleaseNotesDisabled<T extends string>
  implements DiscordCommandFlagActionBoolean<T>
{
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_DISABLED;

  public execute(
    anyDiscordMessage: IAnyDiscordMessage,
    value?: string | null | undefined
  ): Promise<IDiscordCommandFlagSuccess> {
    const shouldDisable: boolean = toBoolean(value, true);

    this._logExecuteAction(anyDiscordMessage.id);
    this._logNewState(anyDiscordMessage.id, shouldDisable);

    if (isDiscordDmChannel(anyDiscordMessage.channel)) {
      return this.isDisabledForThisDm(anyDiscordMessage).then(
        (isDisabled: boolean | undefined): Promise<IDiscordCommandFlagSuccess> => {
          this._logCurrentState(anyDiscordMessage.id, isDisabled);

          if (!_.isNil(anyDiscordMessage.author)) {
            if (DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
              return this.updateDatabaseForThisDm(
                shouldDisable,
                isDisabled,
                anyDiscordMessage.author,
                anyDiscordMessage.channel
              );
            }

            return Promise.reject(new Error(`Firebase channel invalid`));
          }

          return Promise.reject(new Error(`Firebase author invalid`));
        }
      );
    }

    return this.isDisabledForThisGuild(anyDiscordMessage).then(
      (isDisabled: boolean | undefined): Promise<IDiscordCommandFlagSuccess> => {
        this._logCurrentState(anyDiscordMessage.id, isDisabled);

        if (!_.isNil(anyDiscordMessage.guild)) {
          if (DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
            return this.updateDatabaseForThisGuild(
              shouldDisable,
              isDisabled,
              anyDiscordMessage.guild,
              anyDiscordMessage.channel
            );
          }

          return Promise.reject(new Error(`Firebase channel invalid`));
        }

        return Promise.reject(new Error(`Firebase guild invalid`));
      }
    );
  }

  public isDisabledForThisDm(anyDiscordMessage: IAnyDiscordMessage): Promise<boolean | undefined> {
    if (_.isNil(anyDiscordMessage.author)) {
      return this._getNoAuthorMessageError(anyDiscordMessage);
    }

    const firebaseDm: IFirebaseDm | undefined = FirebaseDmsStoreService.getInstance().getEntity(
      anyDiscordMessage.author.id
    );

    if (_.isNil(firebaseDm)) {
      return this._getNoFirebaseDmError(anyDiscordMessage, anyDiscordMessage.author.id);
    }

    return Promise.resolve(this._isReleaseNotesDisabledForThisDm(firebaseDm));
  }

  public isDisabledForThisGuild(anyDiscordMessage: IAnyDiscordMessage): Promise<boolean | undefined> {
    if (_.isNil(anyDiscordMessage.guild)) {
      return this._getNoGuildMessageError(anyDiscordMessage);
    }

    const firebaseGuild: IFirebaseGuild | undefined = FirebaseGuildsStoreService.getInstance().getEntity(
      anyDiscordMessage.guild.id
    );

    if (_.isNil(firebaseGuild)) {
      return this._getNoFirebaseGuildError(anyDiscordMessage, anyDiscordMessage.guild.id);
    }

    return Promise.resolve(this._isReleaseNotesDisabledForThisGuild(firebaseGuild, anyDiscordMessage.channel.id));
  }

  public updateDatabaseForThisDm(
    shouldDisable: boolean,
    isDisabled: boolean | undefined,
    { id }: IFirebaseDm,
    discordChannel: IAnyDiscordChannel
  ): Promise<IDiscordCommandFlagSuccess> {
    if (_.isNil(id)) {
      return Promise.reject(new Error(`Firebase DM ID invalid`));
    }

    const humanizedChannel: IDiscordHumanizedChannel = getDiscordHumanizedChannelFromClass(discordChannel);

    return FirebaseDmsFeaturesReleaseNotesEnabledService.getInstance()
      .updateStateByDmId(id, !shouldDisable)
      .then(
        (): Promise<IDiscordCommandFlagSuccess> =>
          Promise.resolve(this._getCommandFlagSuccess(shouldDisable, isDisabled, humanizedChannel))
      );
  }

  public updateDatabaseForThisGuild(
    shouldDisable: boolean,
    isDisabled: boolean | undefined,
    { id }: IFirebaseGuild,
    discordChannel: IAnyDiscordChannel
  ): Promise<IDiscordCommandFlagSuccess> {
    if (_.isNil(id)) {
      return Promise.reject(new Error(`Firebase guild id invalid`));
    }

    const humanizedChannel: IDiscordHumanizedChannel = getDiscordHumanizedChannelFromClass(discordChannel);

    return FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService.getInstance()
      .updateStateByGuildId(id, discordChannel.id, !shouldDisable)
      .then(
        (): Promise<IDiscordCommandFlagSuccess> =>
          Promise.resolve(this._getCommandFlagSuccess(shouldDisable, isDisabled, humanizedChannel))
      );
  }

  private _isReleaseNotesDisabledForThisDm(firebaseDm: IFirebaseDm): boolean | undefined {
    if (
      !FirebaseDmsFeaturesService.getInstance().isValid(firebaseDm.features) ||
      !FirebaseDmsFeaturesService.getInstance().isUpToDate(firebaseDm.features)
    ) {
      return undefined;
    }

    return this._getFirebaseDisabledStateForThisDm(firebaseDm);
  }

  private _isReleaseNotesDisabledForThisGuild(
    firebaseGuild: IFirebaseGuild,
    channelId: Snowflake
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

    return this._getFirebaseDisabledStateForThisGuild(firebaseGuildChannel);
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

  private _getFirebaseDisabledStateForThisDm(firebaseDm: IFirebaseDmVFinal): boolean | undefined {
    const isEnabled: boolean | undefined = firebaseDm.features?.releaseNotes?.isEnabled;

    if (!_.isBoolean(isEnabled)) {
      return undefined;
    }

    /**
     * @description
     * Reverse the enabled state since there is no disabled state in the model.
     */
    return !isEnabled;
  }

  private _getFirebaseDisabledStateForThisGuild(
    firebaseGuildChannel: IFirebaseGuildChannelVFinal
  ): boolean | undefined {
    const isEnabled: boolean | undefined = firebaseGuildChannel.features?.releaseNotes?.isEnabled;

    if (!_.isBoolean(isEnabled)) {
      return undefined;
    }

    /**
     * @description
     * Reverse the enabled state since there is no disabled state in the model.
     */
    return !isEnabled;
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
        `executing ${ChalkService.getInstance().value(`disabled`)} action`
      ),
    });
  }

  private _logNewState(discordMessageId: Snowflake, isDisabled: boolean): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        discordMessageId,
        `new state: ${ChalkService.getInstance().value(isDisabled)}`
      ),
    });
  }

  private _logCurrentState(discordMessageId: Snowflake, isDisabled: boolean | undefined): void {
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
    shouldDisable: boolean,
    isDisabled: boolean | undefined,
    humanizedChannel: IDiscordHumanizedChannel
  ): IDiscordCommandFlagSuccess {
    return DiscordMessageCommandFeatureReleaseNotesEnabledSuccessFlagService.getInstance().getFlag(
      !shouldDisable,
      _.isBoolean(isDisabled) ? !isDisabled : undefined,
      humanizedChannel
    );
  }
}
