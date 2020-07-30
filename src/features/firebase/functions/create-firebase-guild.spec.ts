import moment from "moment-timezone";
import { createMock } from "ts-auto-mock";
import { ICreateFirebaseGuild } from "../interfaces/create-firebase-guild";
import { createFirebaseGuild } from "./create-firebase-guild";

describe(`createFirebaseGuild()`, (): void => {
  let data: ICreateFirebaseGuild;

  beforeEach((): void => {
    data = createMock<ICreateFirebaseGuild>();
  });

  it(`should return a Firebase guild with a creation date set as now`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(moment(result.creationDate).fromNow()).toStrictEqual(
      `a few seconds ago`
    );
  });

  it(`should return the id from the given data`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(result.id).toStrictEqual(data.id);
  });

  it(`should return a Firebase guild with last possible version`, (): void => {
    expect.assertions(1);

    const result = createFirebaseGuild(data);

    expect(result.version).toStrictEqual(1);
  });
});
