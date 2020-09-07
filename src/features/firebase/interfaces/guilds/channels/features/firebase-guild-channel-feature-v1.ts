import { FirebaseGuildChannelFeatureVersionEnum } from "../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum";
import { IFirebaseGuildChannelFeatureNoonV1 } from "./firebase-guild-channel-feature-noon-v1";

export interface IFirebaseGuildChannelFeatureV1 {
  /**
   * @description
   * Noon feature configuration
   */
  noon?: IFirebaseGuildChannelFeatureNoonV1 | undefined;

  /**
   * @description
   * The entity version used to perform clean update when a breaking change occur
   */
  version?: FirebaseGuildChannelFeatureVersionEnum.V1 | undefined;
}
