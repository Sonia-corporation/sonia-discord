import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { IFirebaseGuildChannelFeatureV1 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v1';
import { IFirebaseGuildChannelFeatureV2 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v2';

/**
 * @param root0
 * @param root0.noon
 */
export function upgradeFirebaseGuildChannelFeatureToV2({
  noon,
}: Readonly<IFirebaseGuildChannelFeatureV1>): IFirebaseGuildChannelFeatureV2 {
  return {
    noon,
    releaseNotes: undefined,
    version: FirebaseGuildChannelFeatureVersionEnum.V2,
  };
}
