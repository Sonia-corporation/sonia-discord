import { IUpdatedFirebaseGuildLastReleaseNotesVersion } from "../types/updated-firebase-guild-last-release-notes-version";

export function getUpdatedFirebaseGuildLastReleaseNotesVersion(
  version: Readonly<string>
): IUpdatedFirebaseGuildLastReleaseNotesVersion {
  return {
    lastReleaseNotesVersion: version,
  };
}
