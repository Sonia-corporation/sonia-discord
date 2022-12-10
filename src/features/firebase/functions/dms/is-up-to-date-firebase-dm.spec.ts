import { isUpToDateFirebaseDm } from './is-up-to-date-firebase-dm';
import { FirebaseDmVersionEnum } from '../../enums/dms/firebase-dm-version.enum';
import { IFirebaseDmV1 } from '../../interfaces/dms/firebase-dm-v1';
import { createMock } from 'ts-auto-mock';

describe(`isUpToDateFirebaseDm()`, (): void => {
  describe(`when the given Firebase DM is a v1`, (): void => {
    let firebaseDm: IFirebaseDmV1;

    beforeEach((): void => {
      firebaseDm = createMock<IFirebaseDmV1>({
        version: FirebaseDmVersionEnum.V1,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isUpToDateFirebaseDm(firebaseDm);

      expect(result).toBe(true);
    });
  });
});
