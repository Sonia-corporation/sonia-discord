import { handleFirebaseGuildChannelFeatureBreakingChange } from './features/handle-firebase-guild-channel-feature-breaking-change';
import { FirebaseGuildChannelVersionEnum } from '../../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { IFirebaseGuildChannelV1 } from '../../../interfaces/guilds/channels/firebase-guild-channel-v1';
import { IFirebaseGuildChannelV2 } from '../../../interfaces/guilds/channels/firebase-guild-channel-v2';

export function upgradeFirebaseGuildChannelToV2({ id, features }: IFirebaseGuildChannelV1): IFirebaseGuildChannelV2 {
  return {
    features: features ? handleFirebaseGuildChannelFeatureBreakingChange(features) : undefined,
    id,
    version: FirebaseGuildChannelVersionEnum.V2,
  };
}
