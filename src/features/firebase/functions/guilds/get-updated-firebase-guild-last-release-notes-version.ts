import { IUpdatedFirebaseGuildLastReleaseNotesVersion } from '../../types/guilds/updated-firebase-guild-last-release-notes-version';

/**
 * @param version
 */
export function getUpdatedFirebaseGuildLastReleaseNotesVersion(
  version: string
): IUpdatedFirebaseGuildLastReleaseNotesVersion {
  return {
    lastReleaseNotesVersion: version,
  };
}
