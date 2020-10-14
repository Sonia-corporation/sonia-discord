import _ from "lodash";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { FIREBASE_GUILD_CHANNEL_FEATURE_NOON_CURRENT_VERSION } from "../../../../../constants/guilds/channels/features/firebase-guild-channel-feature-noon-current-version";
import { INewFirebaseGuildChannelFeatureNoon } from "../../../../../interfaces/guilds/channels/features/new-firebase-guild-channel-feature-noon";
import { IFirebaseGuildChannelFeatureNoon } from "../../../../../types/guilds/channels/features/firebase-guild-channel-feature-noon";
import { IFirebaseGuildChannelFeatureNoonVFinal } from "../../../../../types/guilds/channels/features/firebase-guild-channel-feature-noon-v-final";
import { FirebaseUpdateCoreService } from "../../../../firebase-update-core.service";

export class FirebaseGuildsChannelsFeaturesNoonService extends FirebaseUpdateCoreService<
  IFirebaseGuildChannelFeatureNoon,
  IFirebaseGuildChannelFeatureNoonVFinal,
  undefined,
  INewFirebaseGuildChannelFeatureNoon
> {
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

  public isUpToDate(
    noon: Readonly<IFirebaseGuildChannelFeatureNoon>
  ): noon is IFirebaseGuildChannelFeatureNoonVFinal {
    return _.isEqual(
      noon.version,
      FIREBASE_GUILD_CHANNEL_FEATURE_NOON_CURRENT_VERSION
    );
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
}
