import { getUpdatedFirebaseDmLastReleaseNotesVersion } from './get-updated-firebase-dm-last-release-notes-version';
import { IUpdatedFirebaseDmLastReleaseNotesVersion } from '../../types/dms/updated-firebase-dm-last-release-notes-version';

describe(`getUpdatedFirebaseDmLastReleaseNotesVersion()`, (): void => {
  let version: string;

  beforeEach((): void => {
    version = `dummy-version`;
  });

  it(`should return a partial Firebase DM with the last release notes version equalling the given one`, (): void => {
    expect.assertions(1);

    const result = getUpdatedFirebaseDmLastReleaseNotesVersion(version);

    expect(result).toStrictEqual({
      lastReleaseNotesVersion: `dummy-version`,
    } as IUpdatedFirebaseDmLastReleaseNotesVersion);
  });
});
