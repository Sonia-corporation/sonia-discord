import { isValidPort } from "./is-valid-port";

describe(`isValidPort()`, (): void => {
  let port: unknown;

  describe(`when the given port is undefined`, (): void => {
    beforeEach((): void => {
      port = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isValidPortResult = isValidPort(port);

      expect(isValidPortResult).toStrictEqual(false);
    });
  });

  describe(`when the given port is null`, (): void => {
    beforeEach((): void => {
      port = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isValidPortResult = isValidPort(port);

      expect(isValidPortResult).toStrictEqual(false);
    });
  });

  describe(`when the given port is an empty string"`, (): void => {
    beforeEach((): void => {
      port = ``;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isValidPortResult = isValidPort(port);

      expect(isValidPortResult).toStrictEqual(false);
    });
  });

  describe(`when the given port is NaN`, (): void => {
    beforeEach((): void => {
      port = NaN;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const isValidPortResult = isValidPort(port);

      expect(isValidPortResult).toStrictEqual(false);
    });
  });

  describe(`when the given port is "8"`, (): void => {
    beforeEach((): void => {
      port = `8`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const isValidPortResult = isValidPort(port);

      expect(isValidPortResult).toStrictEqual(true);
    });
  });

  describe(`when the given port is 8`, (): void => {
    beforeEach((): void => {
      port = 8;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const isValidPortResult = isValidPort(port);

      expect(isValidPortResult).toStrictEqual(true);
    });
  });
});
