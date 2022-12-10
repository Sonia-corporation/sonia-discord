import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { toBoolean } from '../../../../../../../../../functions/formatters/to-boolean';
import { hasFirebaseGuildChannels } from '../../../../../../../../firebase/functions/guilds/checks/has-firebase-guild-channels';
import { FirebaseDmsFeaturesNoonEnabledService } from '../../../../../../../../firebase/services/dms/features/noon/firebase-dms-features-noon-enabled.service';
import { FirebaseGuildsChannelsFeaturesNoonEnabledService } from '../../../../../../../../firebase/services/guilds/channels/features/noon/firebase-guilds-channels-features-noon-enabled.service';
import { FirebaseDmsStoreService } from '../../../../../../../../firebase/stores/dms/services/firebase-dms-store.service';
import { FirebaseGuildsStoreService } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.service';
import { IFirebaseDm } from '../../../../../../../../firebase/types/dms/firebase-dm';
import { IFirebaseGuildChannel } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { ChalkService } from '../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { getDiscordHumanizedChannelFromClass } from '../../../../../../../channels/functions/get-discord-humanized-channel-from-class';
import { isDiscordDmChannel } from '../../../../../../../channels/functions/is-discord-dm-channel';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { IAnyDiscordChannel } from '../../../../../../../channels/types/any-discord-channel';
import { wrapUserIdIntoMention } from '../../../../../../../mentions/functions/wrap-user-id-into-mention';
import { DiscordCommandFlagActionBoolean } from '../../../../../../classes/commands/flags/discord-command-flag-action-boolean';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageErrorService } from '../../../../../helpers/discord-message-error.service';
import { DiscordMessageCommandFeatureNoonEnabledSuccessFlagService } from '../services/discord-message-command-feature-noon-enabled-success-flag.service';
import { Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonEnabled<T extends string> implements DiscordCommandFlagActionBoolean<T> {
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED;

  public execute(
    anyDiscordMessage: IAnyDiscordMessage,
    value?: string | null | undefined
  ): Promise<IDiscordCommandFlagSuccess> {
    const shouldEnable: boolean = toBoolean(value, true);

    this._logExecuteAction(anyDiscordMessage.id);
    this._logNewState(anyDiscordMessage.id, shouldEnable);

    if (isDiscordDmChannel(anyDiscordMessage.channel)) {
      return this.executeForDm(anyDiscordMessage, shouldEnable);
    }

    return this.executeForGuild(anyDiscordMessage, shouldEnable);
  }

  public executeForDm(
    anyDiscordMessage: IAnyDiscordMessage,
    shouldEnable: boolean
  ): Promise<IDiscordCommandFlagSuccess> {
    return this.isEnabledForThisDm(anyDiscordMessage).then(
      (isEnabled: boolean | undefined): Promise<IDiscordCommandFlagSuccess> => {
        this._logCurrentState(anyDiscordMessage.id, isEnabled);

        if (_.isNil(anyDiscordMessage.author)) {
          return Promise.reject(new Error(`Firebase author invalid`));
        }

        if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
          return Promise.reject(new Error(`Firebase channel invalid`));
        }

        return this.updateDatabaseForThisDm(shouldEnable, isEnabled, anyDiscordMessage.author, anyDiscordMessage);
      }
    );
  }

  public executeForGuild(
    anyDiscordMessage: IAnyDiscordMessage,
    shouldEnable: boolean
  ): Promise<IDiscordCommandFlagSuccess> {
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
          anyDiscordMessage.channel,
          anyDiscordMessage
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

    return Promise.resolve(this._isNoonEnabledForThisDm(firebaseDm));
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

    return Promise.resolve(this._isNoonEnabledForThisGuild(firebaseGuild, anyDiscordMessage.channel.id));
  }

  public updateDatabaseForThisDm(
    shouldEnable: boolean,
    isEnabled: boolean | undefined,
    { id }: IFirebaseDm,
    anyDiscordMessage: IAnyDiscordMessage
  ): Promise<IDiscordCommandFlagSuccess> {
    if (_.isNil(id)) {
      return Promise.reject(new Error(`Firebase DM ID invalid`));
    }

    return FirebaseDmsFeaturesNoonEnabledService.getInstance()
      .updateStateByDmId(id, shouldEnable)
      .then(
        (): Promise<IDiscordCommandFlagSuccess> =>
          Promise.resolve(this._getCommandFlagSuccess(shouldEnable, isEnabled, anyDiscordMessage))
      );
  }

  public updateDatabaseForThisGuild(
    shouldEnable: boolean,
    isEnabled: boolean | undefined,
    { id }: IFirebaseGuild,
    discordChannel: IAnyDiscordChannel,
    anyDiscordMessage: IAnyDiscordMessage
  ): Promise<IDiscordCommandFlagSuccess> {
    if (_.isNil(id)) {
      return Promise.reject(new Error(`Firebase guild id invalid`));
    }

    return FirebaseGuildsChannelsFeaturesNoonEnabledService.getInstance()
      .updateStateByGuildId(id, discordChannel.id, shouldEnable)
      .then(
        (): Promise<IDiscordCommandFlagSuccess> =>
          Promise.resolve(this._getCommandFlagSuccess(shouldEnable, isEnabled, anyDiscordMessage))
      );
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

  private _getFirebaseGuildChannel(
    firebaseGuild: IFirebaseGuild,
    channelId: Snowflake
  ): IFirebaseGuildChannel | undefined {
    if (!hasFirebaseGuildChannels(firebaseGuild)) {
      return undefined;
    }

    return _.get(firebaseGuild.channels, channelId);
  }

  private _getFirebaseEnabledStateForThisDm(firebaseDm: IFirebaseDm): boolean | undefined {
    return firebaseDm.features?.noon?.isEnabled;
  }

  private _getFirebaseEnabledStateForThisGuild(firebaseGuildChannel: IFirebaseGuildChannel): boolean | undefined {
    return firebaseGuildChannel.features?.noon?.isEnabled;
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
    anyDiscordMessage: IAnyDiscordMessage
  ): IDiscordCommandFlagSuccess {
    return DiscordMessageCommandFeatureNoonEnabledSuccessFlagService.getInstance().getFlag(
      shouldEnable,
      isEnabled,
      getDiscordHumanizedChannelFromClass(anyDiscordMessage.channel)
    );
  }
}
