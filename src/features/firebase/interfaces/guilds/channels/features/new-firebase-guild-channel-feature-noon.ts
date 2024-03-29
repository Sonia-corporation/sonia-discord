import { FirebaseGuildChannelFeatureNoonVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum';

/**
 * @description
 * A simple Firebase guild channel feature release notes with the default configuration.
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}.
 */
export interface INewFirebaseGuildChannelFeatureNoon {
  isEnabled?: undefined;
  version: FirebaseGuildChannelFeatureNoonVersionEnum.V1;
}
