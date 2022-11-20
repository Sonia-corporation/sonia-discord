import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { IFirebaseGuildChannelFeatureV1 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v1';
import { IFirebaseGuildChannelFeatureV2 } from '../../../../interfaces/guilds/channels/features/firebase-guild-channel-feature-v2';

export function upgradeFirebaseGuildChannelFeatureToV2({
  noon,
}: IFirebaseGuildChannelFeatureV1): IFirebaseGuildChannelFeatureV2 {
  return {
    noon,
    releaseNotes: undefined,
    version: FirebaseGuildChannelFeatureVersionEnum.V2,
  };
}
