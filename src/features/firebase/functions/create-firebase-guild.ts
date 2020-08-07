import { FIREBASE_GUILD_CURRENT_VERSION } from "../constants/firebase-guild-current-version";
import { ICreateFirebaseGuild } from "../interfaces/create-firebase-guild";
import { IFirebaseGuild } from "../types/firebase-guild";

export function createFirebaseGuild({
  id,
}: Readonly<ICreateFirebaseGuild>): IFirebaseGuild {
  return {
    id,
    lastReleaseNotesVersion: `0.0.0`,
    version: FIREBASE_GUILD_CURRENT_VERSION,
  };
}
