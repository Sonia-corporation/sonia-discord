import { IUpdatedFirebaseGuildLastReleaseNotesVersion } from "../../types/guilds/updated-firebase-guild-last-release-notes-version";

export function getUpdatedFirebaseGuildLastReleaseNotesVersion(
  version: Readonly<string>
): IUpdatedFirebaseGuildLastReleaseNotesVersion {
  return {
    lastReleaseNotesVersion: version,
  };
}
