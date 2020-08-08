import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import { IAnyFirebaseGuild } from "../types/any-firebase-guild";
import { IFirebaseGuild } from "../types/firebase-guild";
import { upgradeFirebaseGuildToV2 } from "./upgrade-firebase-guild-to-v2";

/**
 * @description
 * Upgrade the given object to the latest possible version of a [Firebase guild]{@link IFirebaseGuild}
 * Based on the [version]{@link IFirebaseGuild#version}
 *
 * @param {AnyObject} firebaseGuild The [Firebase guild]{@link IFirebaseGuild} to update
 *
 * @return {IFirebaseGuild} Updated [Firebase guild]{@link IFirebaseGuild}
 */
export function handleFirebaseGuildBreakingChange(
  firebaseGuild: Readonly<IAnyFirebaseGuild>
): IFirebaseGuild | never {
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
