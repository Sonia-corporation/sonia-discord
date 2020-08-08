import { IFirebaseGuild } from "../types/firebase-guild";

export function getUpdateFirebaseGuildLastReleaseNotesVersion(
  version: Readonly<string>
  // eslint-disable-next-line quotes
): Pick<IFirebaseGuild, "lastReleaseNotesVersion"> {
  return {
    lastReleaseNotesVersion: version,
  };
}
