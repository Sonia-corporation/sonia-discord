import { getBearer } from "./get-bearer";

describe(`getBearer()`, (): void => {
  let token: string;

  describe(`when the given token is an empty string`, (): void => {
    beforeEach((): void => {
      token = ``;
    });

    it(`should return "bearer "`, (): void => {
      expect.assertions(1);

      const result = getBearer(token);

      expect(result).toStrictEqual(`bearer `);
    });
  });

  describe(`when the given token is "dummy"`, (): void => {
    beforeEach((): void => {
      token = `dummy`;
    });

    it(`should return "bearer dummy"`, (): void => {
      expect.assertions(1);

      const result = getBearer(token);

      expect(result).toStrictEqual(`bearer dummy`);
    });
  });

  describe(`when the given token is "token"`, (): void => {
    beforeEach((): void => {
      token = `token`;
    });

    it(`should return "bearer token"`, (): void => {
      expect.assertions(1);

      const result = getBearer(token);

      expect(result).toStrictEqual(`bearer token`);
    });
  });
});
