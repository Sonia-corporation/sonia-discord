import { IUpdatedFirebaseDmLastReleaseNotesVersion } from '../../types/dms/updated-firebase-dm-last-release-notes-version';

export function getUpdatedFirebaseDmLastReleaseNotesVersion(
  version: string
): IUpdatedFirebaseDmLastReleaseNotesVersion {
  return {
    lastReleaseNotesVersion: version,
  };
}
