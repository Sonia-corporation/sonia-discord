import { createMock } from "ts-auto-mock";
import { ICreateFirebaseGuild } from "../interfaces/create-firebase-guild";
import { createFirebaseGuild } from "./create-firebase-guild";

describe(`createFirebaseGuild()`, (): void => {
  let data: ICreateFirebaseGuild;

  beforeEach((): void => {
    data = createMock<ICreateFirebaseGuild>();
  });

  it(`should return the id from the given data`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(result.id).toStrictEqual(data.id);
  });

  it(`should return a last release notes version of 0.0.0`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(result.lastReleaseNotesVersion).toStrictEqual(`0.0.0`);
  });

  it(`should return a Firebase guild with last possible version`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(result.version).toStrictEqual(1);
  });
});
