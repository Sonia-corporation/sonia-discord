import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { FIREBASE_GUILD_CHANNEL_FEATURE_NOON_CURRENT_VERSION } from "../../../../../constants/guilds/channels/features/firebase-guild-channel-feature-noon-current-version";
import { INewFirebaseGuildChannelFeatureNoon } from "../../../../../interfaces/guilds/channels/features/new-firebase-guild-channel-feature-noon";
import { IFirebaseGuildChannelFeatureNoon } from "../../../../../types/guilds/channels/features/firebase-guild-channel-feature-noon";
import { IFirebaseGuildChannelFeatureNoonVFinal } from "../../../../../types/guilds/channels/features/firebase-guild-channel-feature-noon-v-final";

export class FirebaseGuildsChannelsFeaturesNoonService extends AbstractService {
  private static _instance: FirebaseGuildsChannelsFeaturesNoonService;

  public static getInstance(): FirebaseGuildsChannelsFeaturesNoonService {
    if (_.isNil(FirebaseGuildsChannelsFeaturesNoonService._instance)) {
      FirebaseGuildsChannelsFeaturesNoonService._instance = new FirebaseGuildsChannelsFeaturesNoonService();
    }

    return FirebaseGuildsChannelsFeaturesNoonService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_SERVICE);
  }

  public isValid(
    noon: Readonly<IFirebaseGuildChannelFeatureNoon | undefined>
  ): noon is IFirebaseGuildChannelFeatureNoonVFinal {
    return this.isSet(noon) && this.isUpToDate(noon);
  }

  public isUpToDate(
    noon: Readonly<IFirebaseGuildChannelFeatureNoon>
  ): noon is IFirebaseGuildChannelFeatureNoonVFinal {
    return _.isEqual(
      noon.version,
      FIREBASE_GUILD_CHANNEL_FEATURE_NOON_CURRENT_VERSION
    );
  }

  public isSet(
    noon: Readonly<IFirebaseGuildChannelFeatureNoon | undefined>
  ): noon is IFirebaseGuildChannelFeatureNoon {
    return !_.isNil(noon);
  }

  public create(): INewFirebaseGuildChannelFeatureNoon {
    return {
      version: FIREBASE_GUILD_CHANNEL_FEATURE_NOON_CURRENT_VERSION,
    };
  }

  public upgrade(
    noon: Readonly<IFirebaseGuildChannelFeatureNoon>
  ): IFirebaseGuildChannelFeatureNoonVFinal {
    return noon;
  }

  public getUpToDate(
    feature: Readonly<IFirebaseGuildChannelFeatureNoon | undefined>
  ): IFirebaseGuildChannelFeatureNoonVFinal {
    if (this.isSet(feature) && !this.isUpToDate(feature)) {
      return this.upgrade(feature);
    }

    return this.create();
  }
}
