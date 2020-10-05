import _ from "lodash";
import { AbstractService } from "../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { FIREBASE_GUILD_CHANNEL_FEATURE_CURRENT_VERSION } from "../../../../constants/guilds/channels/features/firebase-guild-channel-feature-current-version";
import { INewFirebaseGuildChannelFeature } from "../../../../interfaces/guilds/channels/features/new-firebase-guild-channel-feature";
import { IFirebaseGuildChannelFeature } from "../../../../types/guilds/channels/features/firebase-guild-channel-feature";
import { IFirebaseGuildChannelFeatureVFinal } from "../../../../types/guilds/channels/features/firebase-guild-channel-feature-v-final";

export class FirebaseGuildsChannelsFeaturesService extends AbstractService {
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

  public isValid(
    feature: Readonly<IFirebaseGuildChannelFeature | undefined>
  ): feature is IFirebaseGuildChannelFeatureVFinal {
    return this.isSet(feature) && this.isUpToDate(feature);
  }

  public isUpToDate(
    feature: Readonly<IFirebaseGuildChannelFeature>
  ): feature is IFirebaseGuildChannelFeatureVFinal {
    return _.isEqual(
      feature.version,
      FIREBASE_GUILD_CHANNEL_FEATURE_CURRENT_VERSION
    );
  }

  public isSet(
    feature: Readonly<IFirebaseGuildChannelFeature | undefined>
  ): feature is IFirebaseGuildChannelFeature {
    return !_.isNil(feature);
  }

  public create(): INewFirebaseGuildChannelFeature {
    return {
      version: FIREBASE_GUILD_CHANNEL_FEATURE_CURRENT_VERSION,
    };
  }

  public upgrade(
    feature: Readonly<IFirebaseGuildChannelFeature>
  ): IFirebaseGuildChannelFeatureVFinal {
    return feature;
  }

  public getUpToDate(
    feature: Readonly<IFirebaseGuildChannelFeature | undefined>
  ): IFirebaseGuildChannelFeatureVFinal {
    if (this.isSet(feature) && !this.isUpToDate(feature)) {
      return this.upgrade(feature);
    }

    return this.create();
  }
}
