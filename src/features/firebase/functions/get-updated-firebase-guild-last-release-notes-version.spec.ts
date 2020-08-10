import { IUpdatedFirebaseGuildLastReleaseNotesVersion } from "../types/updated-firebase-guild-last-release-notes-version";
import { getUpdatedFirebaseGuildLastReleaseNotesVersion } from "./get-updated-firebase-guild-last-release-notes-version";

describe(`getUpdatedFirebaseGuildLastReleaseNotesVersion()`, (): void => {
  let version: string;

  beforeEach((): void => {
    version = `dummy-version`;
  });

  it(`should return a partial Firebase guild with the last release notes version equalling the given one`, (): void => {
    expect.assertions(1);

    const result = getUpdatedFirebaseGuildLastReleaseNotesVersion(version);

    expect(result).toStrictEqual({
      lastReleaseNotesVersion: `dummy-version`,
    } as IUpdatedFirebaseGuildLastReleaseNotesVersion);
  });
});
