import { getEnvironmentPort } from "./get-environment-port";

describe(`getEnvironmentPort()`, (): void => {
  // @todo fix it
  describe.skip(`when the node environment port is undefined`, (): void => {
    beforeEach((): void => {
      process.env.PORT = undefined;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = getEnvironmentPort();

      expect(result).toBeNull();
    });
  });

  // @todo fix it
  describe.skip(`when the node environment port is null`, (): void => {
    beforeEach((): void => {
      (process.env.PORT as unknown) = null;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = getEnvironmentPort();

      expect(result).toBeNull();
    });
  });

  describe(`when the node environment port is "8"`, (): void => {
    beforeEach((): void => {
      process.env.PORT = `8`;
    });

    it(`should return 8`, (): void => {
      expect.assertions(1);

      const result = getEnvironmentPort();

      expect(result).toStrictEqual(8);
    });
  });

  describe(`when the node environment port is "88"`, (): void => {
    beforeEach((): void => {
      process.env.PORT = `88`;
    });

    it(`should return 8`, (): void => {
      expect.assertions(1);

      const result = getEnvironmentPort();

      expect(result).toStrictEqual(88);
    });
  });
});
