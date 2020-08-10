import { FIREBASE_GUILD_CURRENT_VERSION } from "../constants/firebase-guild-current-version";
import { ICreateFirebaseGuild } from "../interfaces/create-firebase-guild";
import { IFirebaseGuildVFinal } from "../types/firebase-guild-v-final";

export function createFirebaseGuild({
  id,
}: Readonly<ICreateFirebaseGuild>): IFirebaseGuildVFinal {
  return {
    id,
    lastReleaseNotesVersion: `0.0.0`,
    version: FIREBASE_GUILD_CURRENT_VERSION,
  };
}
