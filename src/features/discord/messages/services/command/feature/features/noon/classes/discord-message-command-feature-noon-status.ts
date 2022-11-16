import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { hasFirebaseGuildChannels } from '../../../../../../../../firebase/functions/guilds/checks/has-firebase-guild-channels';
import { FirebaseGuildsStoreService } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.service';
import { IFirebaseGuildChannel } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { ChalkService } from '../../../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { DiscordCommandFlagActionValueless } from '../../../../../../classes/commands/flags/discord-command-flag-action-valueless';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureNoonStatus<T extends string> implements DiscordCommandFlagActionValueless<T> {
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_STATUS;

  public execute(anyDiscordMessage: Readonly<IAnyDiscordMessage>): Promise<IDiscordMessageResponse> {
    this._logExecuteAction(anyDiscordMessage.id);

    return this.isEnabled(anyDiscordMessage).then(
      (isEnabled: Readonly<boolean | undefined>): Promise<IDiscordMessageResponse> => {
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

  public isEnabled(anyDiscordMessage: Readonly<IAnyDiscordMessage>): Promise<boolean | undefined> {
    if (_.isNil(anyDiscordMessage.guild)) {
      return this._getNoGuildMessageError(anyDiscordMessage.id);
    }

    const firebaseGuild: IFirebaseGuild | undefined = FirebaseGuildsStoreService.getInstance().getEntity(
      anyDiscordMessage.guild.id
    );

    if (_.isNil(firebaseGuild)) {
      return this._getNoFirebaseGuildError(anyDiscordMessage.id, anyDiscordMessage.guild.id);
    }

    return Promise.resolve(this._isNoonEnabled(firebaseGuild, anyDiscordMessage.channel.id));
  }

  public getMessageResponse(isEnabled: Readonly<boolean | undefined>): Promise<IDiscordMessageResponse> {
    const message: IDiscordMessageResponse = {
      content: this._getResponse(isEnabled),
      options: {},
    };

    return Promise.resolve(message);
  }

  private _getResponse(isEnabled: Readonly<boolean | undefined>): string {
    if (_.isEqual(isEnabled, true)) {
      return `The noon feature is enabled.`;
    }

    return `The noon feature is disabled.`;
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
        `executing ${ChalkService.getInstance().value(`status`)} action`
      ),
    });
  }
}
