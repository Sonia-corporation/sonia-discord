import { createFirebaseGuild } from './create-firebase-guild';
import { ICreateFirebaseGuild } from '../../interfaces/guilds/create-firebase-guild';
import { createHydratedMock } from 'ts-auto-mock';

describe(`createFirebaseGuild()`, (): void => {
  let data: ICreateFirebaseGuild;

  beforeEach((): void => {
    data = createHydratedMock<ICreateFirebaseGuild>({
      id: `dummy-id`,
    });
  });

  it(`should return an empty list of channels`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(result.channels).toStrictEqual({});
  });

  it(`should return the id from the given data`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(result.id).toStrictEqual(`dummy-id`);
  });

  it(`should return a last release notes version of 0.0.0`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(result.lastReleaseNotesVersion).toStrictEqual(`0.0.0`);
  });

  it(`should return a Firebase guild with last possible version`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(result.version).toStrictEqual(5);
  });
});
