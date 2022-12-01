import { hasFirebaseDmLastReleaseNotesVersion } from './has-firebase-dm-last-release-notes-version';
import { FirebaseDmVersionEnum } from '../../../enums/dms/firebase-dm-version.enum';
import { IFirebaseDmV1 } from '../../../interfaces/dms/firebase-dm-v1';
import { IFirebaseDm } from '../../../types/dms/firebase-dm';
import { createMock } from 'ts-auto-mock';

describe(`hasFirebaseDmLastReleaseNotesVersion()`, (): void => {
  let firebaseDm: IFirebaseDm;

  describe(`when the given Firebase DM is a v1`, (): void => {
    beforeEach((): void => {
      firebaseDm = createMock<IFirebaseDmV1>({
        version: FirebaseDmVersionEnum.V1,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = hasFirebaseDmLastReleaseNotesVersion(firebaseDm);

      expect(result).toBe(true);
    });
  });
});
