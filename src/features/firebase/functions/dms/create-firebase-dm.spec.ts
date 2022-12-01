import { createFirebaseDm } from './create-firebase-dm';
import { FirebaseDmFeatureVersionEnum } from '../../enums/dms/features/firebase-dm-feature-version.enum';
import { ICreateFirebaseDm } from '../../interfaces/dms/create-firebase-dm';
import { INewFirebaseDmFeature } from '../../interfaces/dms/features/new-firebase-dm-feature';
import { createMock } from 'ts-auto-mock';

describe(`createFirebaseDm()`, (): void => {
  let data: ICreateFirebaseDm;

  beforeEach((): void => {
    data = createMock<ICreateFirebaseDm>({
      id: `dummy-id`,
    });
  });

  it(`should return a an empty list of features containing only the last possible version`, (): void => {
    expect.assertions(1);

    const result = createFirebaseDm(data);

    const newFirebaseDmFeature: INewFirebaseDmFeature = {
      version: FirebaseDmFeatureVersionEnum.V1,
    };
    expect(result.features).toStrictEqual(newFirebaseDmFeature);
  });

  it(`should return the id from the given data`, (): void => {
    expect.assertions(1);

    const result = createFirebaseDm(data);

    expect(result.id).toBe(`dummy-id`);
  });

  it(`should return a last release notes version of 0.0.0`, (): void => {
    expect.assertions(1);

    const result = createFirebaseDm(data);

    expect(result.lastReleaseNotesVersion).toBe(`0.0.0`);
  });

  it(`should return a Firebase DM with last possible version`, (): void => {
    expect.assertions(1);

    const result = createFirebaseDm(data);

    expect(result.version).toBe(1);
  });
});
