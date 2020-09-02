import { FIREBASE_GUILD_CURRENT_VERSION } from "../../constants/guilds/firebase-guild-current-version";
import { ICreateFirebaseGuild } from "../../interfaces/guilds/create-firebase-guild";
import { IFirebaseGuildVFinal } from "../../types/guilds/firebase-guild-v-final";

export function createFirebaseGuild({
  id,
}: Readonly<ICreateFirebaseGuild>): IFirebaseGuildVFinal {
  return {
    channels: [],
    id,
    lastReleaseNotesVersion: `0.0.0`,
    version: FIREBASE_GUILD_CURRENT_VERSION,
  };
}
