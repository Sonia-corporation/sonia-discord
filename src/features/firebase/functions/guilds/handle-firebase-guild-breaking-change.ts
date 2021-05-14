import { upgradeFirebaseGuildToV2 } from './upgrade-firebase-guild-to-v2';
import { upgradeFirebaseGuildToV3 } from './upgrade-firebase-guild-to-v3';
import { upgradeFirebaseGuildToV4 } from './upgrade-firebase-guild-to-v4';
import { upgradeFirebaseGuildToV5 } from './upgrade-firebase-guild-to-v5';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildVFinal } from '../../types/guilds/firebase-guild-v-final';
import { IFirebaseGuild } from '../../types/guilds/firebase-guild';

/**
 * @description
 * Upgrade the given object to the latest possible version of a [Firebase guild]{@link IFirebaseGuild}
 * Based on the [version]{@link IFirebaseGuild#version}
 *
 * @param {Readonly<IFirebaseGuild>} firebaseGuild The [Firebase guild]{@link IFirebaseGuild} to update
 *
 * @returns {IFirebaseGuild} Updated [Firebase guild]{@link IFirebaseGuild}
 */
export function handleFirebaseGuildBreakingChange(
  firebaseGuild: Readonly<IFirebaseGuild>
): IFirebaseGuildVFinal | never {
  if (firebaseGuild.version === FirebaseGuildVersionEnum.V5) {
    return firebaseGuild;
  }

  if (firebaseGuild.version === FirebaseGuildVersionEnum.V4) {
    return handleFirebaseGuildBreakingChange(upgradeFirebaseGuildToV5(firebaseGuild));
  }

  if (firebaseGuild.version === FirebaseGuildVersionEnum.V3) {
    return handleFirebaseGuildBreakingChange(upgradeFirebaseGuildToV4(firebaseGuild));
  }

  if (firebaseGuild.version === FirebaseGuildVersionEnum.V2) {
    return handleFirebaseGuildBreakingChange(upgradeFirebaseGuildToV3(firebaseGuild));
  }

  if (firebaseGuild.version === FirebaseGuildVersionEnum.V1) {
    return handleFirebaseGuildBreakingChange(upgradeFirebaseGuildToV2(firebaseGuild));
  }

  throw new Error(`Firebase guild version not valid`);
}
