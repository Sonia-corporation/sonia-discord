import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import { IFirebaseGuildV2 } from "../interfaces/firebase-guild-v2";
import { IFirebaseGuildV3 } from "../interfaces/firebase-guild-v3";

export function upgradeFirebaseGuildToV3({
  id,
  lastReleaseNotesVersion,
}: Readonly<IFirebaseGuildV2>): IFirebaseGuildV3 {
  return {
    channels: [],
    id,
    lastReleaseNotesVersion,
    version: FirebaseGuildVersionEnum.V3,
  };
}
