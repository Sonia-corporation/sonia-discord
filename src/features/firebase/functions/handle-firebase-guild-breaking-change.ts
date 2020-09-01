import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import { IFirebaseGuild } from "../types/firebase-guild";
import { IFirebaseGuildVFinal } from "../types/firebase-guild-v-final";
import { upgradeFirebaseGuildToV2 } from "./upgrade-firebase-guild-to-v2";

/**
 * @description
 * Upgrade the given object to the latest possible version of a [Firebase guild]{@link IFirebaseGuild}
 * Based on the [version]{@link IFirebaseGuild#version}
 *
 * @param {Readonly<IFirebaseGuild>} firebaseGuild The [Firebase guild]{@link IFirebaseGuild} to update
 *
 * @return {IFirebaseGuild} Updated [Firebase guild]{@link IFirebaseGuild}
 */
export function handleFirebaseGuildBreakingChange(
  firebaseGuild: Readonly<IFirebaseGuild>
): IFirebaseGuildVFinal | never {
  if (firebaseGuild.version === FirebaseGuildVersionEnum.V2) {
    return firebaseGuild;
  }

  if (firebaseGuild.version === FirebaseGuildVersionEnum.V1) {
    return handleFirebaseGuildBreakingChange(
      upgradeFirebaseGuildToV2(firebaseGuild)
    );
  }

  throw new Error(`Firebase guild version not valid`);
}
