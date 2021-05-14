import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { FIREBASE_GUILD_CHANNEL_FEATURE_RELEASE_NOTES_CURRENT_VERSION } from '../../../../../constants/guilds/channels/features/firebase-guild-channel-feature-release-notes-current-version';
import { INewFirebaseGuildChannelFeatureReleaseNotes } from '../../../../../interfaces/guilds/channels/features/new-firebase-guild-channel-feature-release-notes';
import { IFirebaseGuildChannelFeatureReleaseNotes } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-release-notes';
import { IFirebaseGuildChannelFeatureReleaseNotesVFinal } from '../../../../../types/guilds/channels/features/firebase-guild-channel-feature-release-notes-v-final';
import { FirebaseUpdateCoreService } from '../../../../firebase-update-core.service';
import _ from 'lodash';

export class FirebaseGuildsChannelsFeaturesReleaseNotesService extends FirebaseUpdateCoreService<
  IFirebaseGuildChannelFeatureReleaseNotes,
  IFirebaseGuildChannelFeatureReleaseNotesVFinal,
  undefined,
  INewFirebaseGuildChannelFeatureReleaseNotes
> {
  private static _instance: FirebaseGuildsChannelsFeaturesReleaseNotesService;

  public static getInstance(): FirebaseGuildsChannelsFeaturesReleaseNotesService {
    if (_.isNil(FirebaseGuildsChannelsFeaturesReleaseNotesService._instance)) {
      FirebaseGuildsChannelsFeaturesReleaseNotesService._instance =
        new FirebaseGuildsChannelsFeaturesReleaseNotesService();
    }

    return FirebaseGuildsChannelsFeaturesReleaseNotesService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_SERVICE);
  }

  public isUpToDate(
    releaseNotes: Readonly<IFirebaseGuildChannelFeatureReleaseNotes>
  ): releaseNotes is IFirebaseGuildChannelFeatureReleaseNotesVFinal {
    return _.isEqual(releaseNotes.version, FIREBASE_GUILD_CHANNEL_FEATURE_RELEASE_NOTES_CURRENT_VERSION);
  }

  public create(): INewFirebaseGuildChannelFeatureReleaseNotes {
    return {
      version: FIREBASE_GUILD_CHANNEL_FEATURE_RELEASE_NOTES_CURRENT_VERSION,
    };
  }

  public upgrade(
    releaseNotes: Readonly<IFirebaseGuildChannelFeatureReleaseNotes>
  ): IFirebaseGuildChannelFeatureReleaseNotesVFinal {
    return releaseNotes;
  }
}
