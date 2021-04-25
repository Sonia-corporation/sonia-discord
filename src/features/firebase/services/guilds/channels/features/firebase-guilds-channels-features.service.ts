import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { FIREBASE_GUILD_CHANNEL_FEATURE_CURRENT_VERSION } from '../../../../constants/guilds/channels/features/firebase-guild-channel-feature-current-version';
import { handleFirebaseGuildChannelFeatureBreakingChange } from '../../../../functions/guilds/channels/features/handle-firebase-guild-channel-feature-breaking-change';
import { INewFirebaseGuildChannelFeature } from '../../../../interfaces/guilds/channels/features/new-firebase-guild-channel-feature';
import { IFirebaseGuildChannelFeature } from '../../../../types/guilds/channels/features/firebase-guild-channel-feature';
import { IFirebaseGuildChannelFeatureVFinal } from '../../../../types/guilds/channels/features/firebase-guild-channel-feature-v-final';
import { FirebaseUpdateCoreService } from '../../../firebase-update-core.service';
import _ from 'lodash';

export class FirebaseGuildsChannelsFeaturesService extends FirebaseUpdateCoreService<
  IFirebaseGuildChannelFeature,
  IFirebaseGuildChannelFeatureVFinal,
  undefined,
  INewFirebaseGuildChannelFeature
> {
  private static _instance: FirebaseGuildsChannelsFeaturesService;

  public static getInstance(): FirebaseGuildsChannelsFeaturesService {
    if (_.isNil(FirebaseGuildsChannelsFeaturesService._instance)) {
      FirebaseGuildsChannelsFeaturesService._instance = new FirebaseGuildsChannelsFeaturesService();
    }

    return FirebaseGuildsChannelsFeaturesService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_SERVICE);
  }

  public isUpToDate(feature: Readonly<IFirebaseGuildChannelFeature>): feature is IFirebaseGuildChannelFeatureVFinal {
    return _.isEqual(feature.version, FIREBASE_GUILD_CHANNEL_FEATURE_CURRENT_VERSION);
  }

  public create(): INewFirebaseGuildChannelFeature {
    return {
      version: FIREBASE_GUILD_CHANNEL_FEATURE_CURRENT_VERSION,
    };
  }

  public upgrade(feature: Readonly<IFirebaseGuildChannelFeature>): IFirebaseGuildChannelFeatureVFinal {
    return handleFirebaseGuildChannelFeatureBreakingChange(feature);
  }
}
