import { FIREBASE_GUILD_CURRENT_VERSION } from '../../constants/guilds/firebase-guild-current-version';
import { ICreateFirebaseGuild } from '../../interfaces/guilds/create-firebase-guild';
import { INewFirebaseGuild } from '../../interfaces/guilds/new-firebase-guild';

/**
 * @description
 * Create a Firebase guild directly on the latest version possible.
 * This will include the default configuration.
 * @param   {ICreateFirebaseGuild} guild Default guild data.
 * @returns {INewFirebaseGuild}          A simple Firebase guild.
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-001}.
 */
export function createFirebaseGuild({ id }: ICreateFirebaseGuild): INewFirebaseGuild {
  return {
    channels: {},
    id,
    lastReleaseNotesVersion: `0.0.0`,
    version: FIREBASE_GUILD_CURRENT_VERSION,
  };
}
