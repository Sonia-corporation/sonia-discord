import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { hasFirebaseGuildChannels } from '../../../../../../../../firebase/functions/guilds/checks/has-firebase-guild-channels';
import { FirebaseDmsStoreService } from '../../../../../../../../firebase/stores/dms/services/firebase-dms-store.service';
import { FirebaseGuildsStoreService } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.service';
import { IFirebaseDm } from '../../../../../../../../firebase/types/dms/firebase-dm';
import { IFirebaseGuildChannel } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { ChalkService } from '../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { isDiscordDmChannel } from '../../../../../../../channels/functions/is-discord-dm-channel';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { wrapUserIdIntoMention } from '../../../../../../../mentions/functions/wrap-user-id-into-mention';
import { DiscordCommandFlagActionValueless } from '../../../../../../classes/commands/flags/discord-command-flag-action-valueless';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageErrorService } from '../../../../../helpers/discord-message-error.service';
import { Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonStatus<T extends string> implements DiscordCommandFlagActionValueless<T> {
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_STATUS;

  public execute(anyDiscordMessage: IAnyDiscordMessage): Promise<IDiscordMessageResponse> {
    this._logExecuteAction(anyDiscordMessage.id);

    if (isDiscordDmChannel(anyDiscordMessage.channel)) {
      return this.executeForDm(anyDiscordMessage);
    }

    return this.executeForGuild(anyDiscordMessage);
  }

  public executeForDm(anyDiscordMessage: IAnyDiscordMessage): Promise<IDiscordMessageResponse> {
    return this.isEnabledForThisDm(anyDiscordMessage).then(
      (isEnabled: boolean | undefined): Promise<IDiscordMessageResponse> => {
        if (_.isNil(anyDiscordMessage.author)) {
          return Promise.reject(new Error(`Firebase author invalid`));
        }

        if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
          return Promise.reject(new Error(`Firebase channel invalid`));
        }

        return this.getMessageResponse(isEnabled);
      }
    );
  }

  public executeForGuild(anyDiscordMessage: IAnyDiscordMessage): Promise<IDiscordMessageResponse> {
    return this.isEnabledForThisGuild(anyDiscordMessage).then(
      (isEnabled: boolean | undefined): Promise<IDiscordMessageResponse> => {
        if (_.isNil(anyDiscordMessage.guild)) {
          return Promise.reject(new Error(`Firebase guild invalid`));
        }

        if (!DiscordChannelService.getInstance().isValid(anyDiscordMessage.channel)) {
          return Promise.reject(new Error(`Firebase channel invalid`));
        }

        return this.getMessageResponse(isEnabled);
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
      return this._getNoFirebaseUserError(anyDiscordMessage, anyDiscordMessage.author.id);
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

  public getMessageResponse(isEnabled: boolean | undefined): Promise<IDiscordMessageResponse> {
    const message: IDiscordMessageResponse = {
      content: this._getResponse(isEnabled),
      options: {},
    };

    return Promise.resolve(message);
  }

  private _getResponse(isEnabled: boolean | undefined): string {
    if (_.isEqual(isEnabled, true)) {
      return `The noon feature is enabled.`;
    }

    return `The noon feature is disabled.`;
  }

  private _isNoonEnabledForThisDm(firebaseDm: IFirebaseDm): boolean | undefined {
    return this._getFirebaseDmEnabledState(firebaseDm);
  }

  private _isNoonEnabledForThisGuild(firebaseGuild: IFirebaseGuild, channelId: Snowflake): boolean | undefined {
    const firebaseGuildChannel: IFirebaseGuildChannel | undefined = this._getFirebaseGuildChannel(
      firebaseGuild,
      channelId
    );

    if (_.isNil(firebaseGuildChannel)) {
      return undefined;
    }

    return this._getFirebaseGuildEnabledState(firebaseGuildChannel);
  }

  private _getFirebaseDmEnabledState(firebaseDm: IFirebaseDm): boolean | undefined {
    return firebaseDm.features?.noon?.isEnabled;
  }

  private _getFirebaseGuildEnabledState(firebaseGuildChannel: IFirebaseGuildChannel): boolean | undefined {
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

  private _getNoFirebaseUserError(anyDiscordMessage: IAnyDiscordMessage, userId: Snowflake): Promise<never> {
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
        `executing ${ChalkService.getInstance().value(`status`)} action`
      ),
    });
  }
}
