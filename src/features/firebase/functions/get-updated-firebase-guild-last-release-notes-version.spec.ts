import { getUpdateFirebaseGuildLastReleaseNotesVersion } from "./get-updated-firebase-guild-last-release-notes-version";

describe(`getUpdateFirebaseGuildLastReleaseNotesVersion()`, (): void => {
  let version: string;

  beforeEach((): void => {
    version = `dummy-version`;
  });

  it(`should return a partial Firebase guild with the last release notes version equalling the given one`, (): void => {
    expect.assertions(1);

    const result = getUpdateFirebaseGuildLastReleaseNotesVersion(version);

    expect(result).toStrictEqual(`dummy-version`);
  });
});
