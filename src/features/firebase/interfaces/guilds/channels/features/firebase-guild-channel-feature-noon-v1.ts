import { FirebaseGuildChannelFeatureNoonVersionEnum } from "../../../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum";

/**
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}
 */
export interface IFirebaseGuildChannelFeatureNoonV1 {
  /**
   * @description
   * Enable the message sent at noon
   */
  isEnabled?: boolean | undefined;

  /**
   * @description
   * The entity version used to perform clean update when a breaking change occur
   */
  version?: FirebaseGuildChannelFeatureNoonVersionEnum.V1 | undefined;
}
