import { upgradeFirebaseGuildChannelFeatureToV2 } from './upgrade-firebase-guild-channel-feature-to-v2';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { IFirebaseGuildChannelFeature } from '../../../../types/guilds/channels/features/firebase-guild-channel-feature';
import { IFirebaseGuildChannelFeatureVFinal } from '../../../../types/guilds/channels/features/firebase-guild-channel-feature-v-final';

/**
 * @description
 * Upgrade the given object to the latest possible version of a [Firebase guild channel feature]{@link IFirebaseGuildChannelFeature}.
 * Based on the [version]{@link IFirebaseGuildChannelFeature#version}.
 * @param   {IFirebaseGuildChannelFeature} firebaseGuildChannelFeature The [Firebase guild channel feature]{@link IFirebaseGuildChannelFeature} to update.
 * @returns {IFirebaseGuildChannelFeature}                             Updated [Firebase guild channel feature]{@link IFirebaseGuildChannelFeature}.
 */
export function handleFirebaseGuildChannelFeatureBreakingChange(
  firebaseGuildChannelFeature: IFirebaseGuildChannelFeature
): IFirebaseGuildChannelFeatureVFinal | never {
  if (firebaseGuildChannelFeature.version === FirebaseGuildChannelFeatureVersionEnum.V2) {
    return firebaseGuildChannelFeature;
  }

  if (firebaseGuildChannelFeature.version === FirebaseGuildChannelFeatureVersionEnum.V1) {
    return handleFirebaseGuildChannelFeatureBreakingChange(
      upgradeFirebaseGuildChannelFeatureToV2(firebaseGuildChannelFeature)
    );
  }

  throw new Error(`Firebase guild channel feature version not valid`);
}
