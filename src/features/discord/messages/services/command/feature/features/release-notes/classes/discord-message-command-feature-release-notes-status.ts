import { ClassNameEnum } from '../../../../../../../../../enums/class-name.enum';
import { AppConfigService } from '../../../../../../../../app/services/config/app-config.service';
import { hasFirebaseGuildChannels } from '../../../../../../../../firebase/functions/guilds/checks/has-firebase-guild-channels';
import { FirebaseDmsFeaturesService } from '../../../../../../../../firebase/services/dms/features/firebase-dms-features.service';
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
import { ProfileConfigService } from '../../../../../../../../profile/services/config/profile-config.service';
import { isDiscordDmChannel } from '../../../../../../../channels/functions/is-discord-dm-channel';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { addDiscordDevPrefix } from '../../../../../../../functions/dev-prefix/add-discord-dev-prefix';
import { wrapUserIdIntoMention } from '../../../../../../../mentions/functions/wrap-user-id-into-mention';
import { DiscordCommandFlagActionValueless } from '../../../../../../classes/commands/flags/discord-command-flag-action-valueless';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageErrorService } from '../../../../../helpers/discord-message-error.service';
import { Snowflake } from 'discord.js';
import _ from 'lodash';

export class DiscordMessageCommandFeatureReleaseNotesStatus<T extends string>
  implements DiscordCommandFlagActionValueless<T>
{
  private readonly _serviceName = ClassNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_STATUS;

  public execute(anyDiscordMessage: IAnyDiscordMessage): Promise<IDiscordMessageResponse> {
    this._logExecuteAction(anyDiscordMessage.id);

    if (isDiscordDmChannel(anyDiscordMessage.channel)) {
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

  public getMessageResponse(isEnabled: boolean | undefined): Promise<IDiscordMessageResponse> {
    const message: IDiscordMessageResponse = {
      content: this._getResponse(isEnabled),
      options: {},
    };

    return Promise.resolve(message);
  }

  private _getResponse(isEnabled: boolean | undefined): string {
    const content: string = _.isEqual(isEnabled, true)
      ? `The release notes feature is enabled.`
      : `The release notes feature is disabled.`;

    if (!AppConfigService.getInstance().isProduction()) {
      return addDiscordDevPrefix({
        asMention: true,
        discordId: ProfileConfigService.getInstance().getDiscordId(),
        message: content,
        nickname: ProfileConfigService.getInstance().getNickname(),
      });
    }

    return content;
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

  private _getFirebaseEnabledStateForThisDm(firebaseDm: IFirebaseDmVFinal): boolean | undefined {
    return firebaseDm.features?.releaseNotes?.isEnabled;
  }

  private _getFirebaseEnabledStateForThisGuild(firebaseGuildChannel: IFirebaseGuildChannelVFinal): boolean | undefined {
    return firebaseGuildChannel.features?.releaseNotes?.isEnabled;
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
        `executing ${ChalkService.getInstance().value(`status`)} action`
      ),
    });
  }
}
