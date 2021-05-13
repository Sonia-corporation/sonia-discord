import { FirebaseGuildsChannelsFeaturesReleaseNotesService } from './firebase-guilds-channels-features-release-notes.service';
import { AbstractService } from '../../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { IAnyDiscordChannel } from '../../../../../../discord/channels/types/any-discord-channel';
import { ChalkService } from '../../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { IFirebaseGuildChannelFeatureReleaseNotesVFinal } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-release-notes-v-final';
import { IFirebaseGuildChannelFeatureVFinal } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-v-final';
import { IFirebaseGuildChannel } from '../../../../../types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuildChannelVFinal } from '../../../../../types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuildVFinal } from '../../../../../types/guilds/firebase-guild-v-final';
import { FirebaseGuildsChannelsService } from '../../firebase-guilds-channels.service';
import { FirebaseGuildsChannelsFeaturesService } from '../firebase-guilds-channels-features.service';
import _ from 'lodash';

export class FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService extends AbstractService {
  private static _instance: FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService;

  public static getInstance(): FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService {
    if (_.isNil(FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService._instance)) {
      FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService._instance =
        new FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService();
    }

    return FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_ENABLED_STATE_SERVICE);
  }

  public isEnabled({ id }: Readonly<IFirebaseGuildChannel>, firebaseGuild: Readonly<IFirebaseGuildVFinal>): boolean {
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

    if (!this._isValidReleaseNotesFeature(id, firebaseGuild)) {
      return false;
    }

    return firebaseGuild.channels?.[id]?.features?.releaseNotes?.isEnabled ?? false;
  }

  private _isValidChannel(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
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

  private _isValidFeature(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
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

  private _isValidReleaseNotesFeature(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    const releaseNotes: IFirebaseGuildChannelFeatureReleaseNotesVFinal | undefined =
      firebaseGuild.channels && firebaseGuild.channels[channelId].features?.releaseNotes;

    if (!FirebaseGuildsChannelsFeaturesReleaseNotesService.getInstance().isSet(releaseNotes)) {
      this._logReleaseNotesNotSet(channelId, firebaseGuild);

      return false;
    }

    if (!FirebaseGuildsChannelsFeaturesReleaseNotesService.getInstance().isUpToDate(releaseNotes)) {
      this._logReleaseNotesNotUpToDate(channelId, firebaseGuild);

      return false;
    }

    return true;
  }

  private _logInvalidChannelId(firebaseGuild: Readonly<IFirebaseGuildVFinal>): void {
    this._log(`unknown`, firebaseGuild, `has an invalid id`);
  }

  private _logChannelNotUpToDate(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotUpToDate(channelId, firebaseGuild);
  }

  private _logChannelNotSet(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotSet(channelId, firebaseGuild);
  }

  private _logFeaturesNotUpToDate(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotUpToDate(channelId, firebaseGuild, `features`);
  }

  private _logFeaturesNotSet(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotSet(channelId, firebaseGuild, `features`);
  }

  private _logReleaseNotesNotUpToDate(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotUpToDate(channelId, firebaseGuild, `release notes feature`);
  }

  private _logReleaseNotesNotSet(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): void {
    this._logNotSet(channelId, firebaseGuild, `release notes feature`);
  }

  private _logNotUpToDate(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>,
    entity?: Readonly<string | undefined>
  ): void {
    this._logNot(channelId, firebaseGuild, entity, `up-to-date`);
  }

  private _logNotSet(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>,
    entity?: Readonly<string | undefined>
  ): void {
    this._logNot(channelId, firebaseGuild, entity, `set`);
  }

  private _logNot(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>,
    entity: Readonly<string | undefined>,
    type: Readonly<string>
  ): void {
    let message = `not ${type}`;

    if (!_.isNil(entity)) {
      message = `${entity} ${message}`;
    }

    this._log(channelId, firebaseGuild, message);
  }

  private _log(
    channelId: Readonly<IAnyDiscordChannel['id']>,
    { id }: Readonly<IFirebaseGuildVFinal>,
    message: Readonly<string>
  ): void {
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
