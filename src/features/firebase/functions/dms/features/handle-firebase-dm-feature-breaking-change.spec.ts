import { handleFirebaseDmFeatureBreakingChange } from './handle-firebase-dm-feature-breaking-change';
import { IObject } from '../../../../../types/object';
import { FirebaseDmFeatureVersionEnum } from '../../../enums/dms/features/firebase-dm-feature-version.enum';
import { IFirebaseDmFeatureNoonV1 } from '../../../interfaces/dms/features/firebase-dm-feature-noon-v1';
import { IFirebaseDmFeatureReleaseNotesV1 } from '../../../interfaces/dms/features/firebase-dm-feature-release-notes-v1';
import { IFirebaseDmFeatureV1 } from '../../../interfaces/dms/features/firebase-dm-feature-v1';
import { createMock } from 'ts-auto-mock';

describe(`handleFirebaseDmFeatureBreakingChange()`, (): void => {
  describe(`when the given Firebase DM has no version`, (): void => {
    let firebaseDmFeature: IObject;

    beforeEach((): void => {
      firebaseDmFeature = {};
    });

    it(`should throw an error`, (): void => {
      expect.assertions(1);

      expect((): void => {
        handleFirebaseDmFeatureBreakingChange(firebaseDmFeature);
      }).toThrow(new Error(`Firebase DM feature version not valid`));
    });
  });

  describe(`when the given Firebase DM feature is a v1`, (): void => {
    let firebaseDmFeature: IFirebaseDmFeatureV1;

    beforeEach((): void => {
      firebaseDmFeature = createMock<IFirebaseDmFeatureV1>({
        noon: createMock<IFirebaseDmFeatureNoonV1>(),
        releaseNotes: createMock<IFirebaseDmFeatureReleaseNotesV1>(),
        version: FirebaseDmFeatureVersionEnum.V1,
      });
    });

    it(`should return the given Firebase guild channel feature without changes`, (): void => {
      expect.assertions(1);

      const result = handleFirebaseDmFeatureBreakingChange(firebaseDmFeature);

      expect(result).toStrictEqual(firebaseDmFeature);
    });
  });
});
