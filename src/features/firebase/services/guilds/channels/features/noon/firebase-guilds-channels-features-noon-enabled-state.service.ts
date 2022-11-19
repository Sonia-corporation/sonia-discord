import { FirebaseGuildsChannelsFeaturesNoonService } from './firebase-guilds-channels-features-noon.service';
import { AbstractService } from '../../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { IAnyDiscordChannel } from '../../../../../../discord/channels/types/any-discord-channel';
import { ChalkService } from '../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { IFirebaseGuildChannelFeatureNoonVFinal } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-noon-v-final';
import { IFirebaseGuildChannelFeatureVFinal } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-v-final';
import { IFirebaseGuildChannel } from '../../../../../types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuildChannelVFinal } from '../../../../../types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuildVFinal } from '../../../../../types/guilds/firebase-guild-v-final';
import { FirebaseGuildsChannelsService } from '../../firebase-guilds-channels.service';
import { FirebaseGuildsChannelsFeaturesService } from '../firebase-guilds-channels-features.service';
import _ from 'lodash';

export class FirebaseGuildsChannelsFeaturesNoonEnabledStateService extends AbstractService {
  private static _instance: FirebaseGuildsChannelsFeaturesNoonEnabledStateService;

  public static getInstance(): FirebaseGuildsChannelsFeaturesNoonEnabledStateService {
    if (_.isNil(FirebaseGuildsChannelsFeaturesNoonEnabledStateService._instance)) {
      FirebaseGuildsChannelsFeaturesNoonEnabledStateService._instance =
        new FirebaseGuildsChannelsFeaturesNoonEnabledStateService();
    }

    return FirebaseGuildsChannelsFeaturesNoonEnabledStateService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_STATE_SERVICE);
  }

  public isEnabled({ id }: IFirebaseGuildChannel, firebaseGuild: IFirebaseGuildVFinal): boolean {
    if (_.isNil(id)) {
      this._logInvalidChannelId(firebaseGuild);

      return false;
    }

    if (!this._isValidChannel(id, firebaseGuild)) {
      return false;
    }

    if (!this._isValidFeature(id, firebaseGuild)) {
      return false;
    }

    if (!this._isValidNoonFeature(id, firebaseGuild)) {
      return false;
    }

    return firebaseGuild.channels?.[id]?.features?.noon?.isEnabled ?? false;
  }

  private _isValidChannel(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): boolean {
    const channel: IFirebaseGuildChannelVFinal | undefined =
      firebaseGuild.channels && firebaseGuild.channels[channelId];

    if (!FirebaseGuildsChannelsService.getInstance().isSet(channel)) {
      this._logChannelNotSet(channelId, firebaseGuild);

      return false;
    }

    if (!FirebaseGuildsChannelsService.getInstance().isUpToDate(channel)) {
      this._logChannelNotUpToDate(channelId, firebaseGuild);

      return false;
    }

    return true;
  }

  private _isValidFeature(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): boolean {
    const features: IFirebaseGuildChannelFeatureVFinal | undefined =
      firebaseGuild.channels && firebaseGuild.channels[channelId].features;

    if (!FirebaseGuildsChannelsFeaturesService.getInstance().isSet(features)) {
      this._logFeaturesNotSet(channelId, firebaseGuild);

      return false;
    }

    if (!FirebaseGuildsChannelsFeaturesService.getInstance().isUpToDate(features)) {
      this._logFeaturesNotUpToDate(channelId, firebaseGuild);

      return false;
    }

    return true;
  }

  private _isValidNoonFeature(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): boolean {
    const noon: IFirebaseGuildChannelFeatureNoonVFinal | undefined =
      firebaseGuild.channels && firebaseGuild.channels[channelId].features?.noon;

    if (!FirebaseGuildsChannelsFeaturesNoonService.getInstance().isSet(noon)) {
      this._logNoonNotSet(channelId, firebaseGuild);

      return false;
    }

    if (!FirebaseGuildsChannelsFeaturesNoonService.getInstance().isUpToDate(noon)) {
      this._logNoonNotUpToDate(channelId, firebaseGuild);

      return false;
    }

    return true;
  }

  private _logInvalidChannelId(firebaseGuild: IFirebaseGuildVFinal): void {
    this._log(`unknown`, firebaseGuild, `has an invalid id`);
  }

  private _logChannelNotUpToDate(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): void {
    this._logNotUpToDate(channelId, firebaseGuild);
  }

  private _logChannelNotSet(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): void {
    this._logNotSet(channelId, firebaseGuild);
  }

  private _logFeaturesNotUpToDate(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): void {
    this._logNotUpToDate(channelId, firebaseGuild, `features`);
  }

  private _logFeaturesNotSet(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): void {
    this._logNotSet(channelId, firebaseGuild, `features`);
  }

  private _logNoonNotUpToDate(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): void {
    this._logNotUpToDate(channelId, firebaseGuild, `noon feature`);
  }

  private _logNoonNotSet(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): void {
    this._logNotSet(channelId, firebaseGuild, `noon feature`);
  }

  private _logNotUpToDate(
    channelId: IAnyDiscordChannel['id'],
    firebaseGuild: IFirebaseGuildVFinal,
    entity?: string | undefined
  ): void {
    this._logNot(channelId, firebaseGuild, entity, `up-to-date`);
  }

  private _logNotSet(
    channelId: IAnyDiscordChannel['id'],
    firebaseGuild: IFirebaseGuildVFinal,
    entity?: string | undefined
  ): void {
    this._logNot(channelId, firebaseGuild, entity, `set`);
  }

  private _logNot(
    channelId: IAnyDiscordChannel['id'],
    firebaseGuild: IFirebaseGuildVFinal,
    entity: string | undefined,
    type: string
  ): void {
    let message = `not ${type}`;

    if (!_.isNil(entity)) {
      message = `${entity} ${message}`;
    }

    this._log(channelId, firebaseGuild, message);
  }

  private _log(channelId: IAnyDiscordChannel['id'], { id }: IFirebaseGuildVFinal, message: string): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase guild ${ChalkService.getInstance().value(id)} channel ${ChalkService.getInstance().value(
          channelId
        )} ${message}`
      ),
    });
  }
}
