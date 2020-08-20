import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import { IFirebaseGuildV1 } from "../interfaces/firebase-guild-v1";
import { IFirebaseGuildV2 } from "../interfaces/firebase-guild-v2";

export function upgradeFirebaseGuildToV2({
  id,
}: Readonly<IFirebaseGuildV1>): IFirebaseGuildV2 {
  return {
    id,
    lastReleaseNotesVersion: `0.0.0`,
    version: FirebaseGuildVersionEnum.V2,
  };
}
