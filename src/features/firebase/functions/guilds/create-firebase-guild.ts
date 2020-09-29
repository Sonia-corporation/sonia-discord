import { FIREBASE_GUILD_CURRENT_VERSION } from "../../constants/guilds/firebase-guild-current-version";
import { ICreateFirebaseGuild } from "../../interfaces/guilds/create-firebase-guild";
import { IFirebaseGuildVFinal } from "../../types/guilds/firebase-guild-v-final";

/**
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CONTRIBUTING.md#sonia-link-001}
 *
 * @param {Readonly<ICreateFirebaseGuild>} guild Default guild data
 *
 * @return {IFirebaseGuildVFinal} A simple Firebase guild
 */
export function createFirebaseGuild({
  id,
}: Readonly<ICreateFirebaseGuild>): IFirebaseGuildVFinal {
  return {
    channels: {},
    id,
    lastReleaseNotesVersion: `0.0.0`,
    version: FIREBASE_GUILD_CURRENT_VERSION,
  };
}
