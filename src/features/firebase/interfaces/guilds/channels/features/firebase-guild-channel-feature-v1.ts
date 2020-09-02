import { FirebaseGuildChannelFeatureVersionEnum } from "../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum";

export interface IFirebaseGuildChannelFeatureV1 {
  noon?: undefined;

  /**
   * @description
   * The entity version used to perform clean update when a breaking change occur
   */
  version?: FirebaseGuildChannelFeatureVersionEnum.V1 | undefined;
}
