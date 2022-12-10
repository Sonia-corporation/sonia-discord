import { handleFirebaseDmBreakingChange } from './handle-firebase-dm-breaking-change';
import { IObject } from '../../../../types/object';
import { FirebaseDmVersionEnum } from '../../enums/dms/firebase-dm-version.enum';
import { IFirebaseDmV1 } from '../../interfaces/dms/firebase-dm-v1';
import { createMock } from 'ts-auto-mock';

describe(`handleFirebaseDmBreakingChange()`, (): void => {
  describe(`when the given Firebase DM has no version`, (): void => {
    let firebaseDm: IObject;

    beforeEach((): void => {
      firebaseDm = {};
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect((): void => {
        handleFirebaseDmBreakingChange(firebaseDm);
      }).toThrow(new Error(`Firebase DM version not valid`));
    });
  });

  describe(`when the given Firebase DM is a v1`, (): void => {
    let firebaseDm: IFirebaseDmV1;

    beforeEach((): void => {
      firebaseDm = createMock<IFirebaseDmV1>({
        id: `dummy-id`,
        lastReleaseNotesVersion: `0.0.0`,
        version: FirebaseDmVersionEnum.V1,
      });
    });

    it(`should return the same id`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseDmBreakingChange(firebaseDm);

      expect(result.id).toBe(`dummy-id`);
    });

    it(`should return a last release notes version of 0.0.0`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseDmBreakingChange(firebaseDm);

      expect(result.lastReleaseNotesVersion).toBe(`0.0.0`);
    });

    it(`should return a v1 version`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseDmBreakingChange(firebaseDm);

      expect(result.version).toStrictEqual(FirebaseDmVersionEnum.V1);
    });
  });
});
