import { isBoolean } from './is-boolean';

describe(`isBoolean()`, (): void => {
  let value: boolean | string | null | undefined;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      value = undefined;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isBoolean(value);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      value = null;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isBoolean(value);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a string like "dummy"`, (): void => {
    beforeEach((): void => {
      value = `dummy`;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = isBoolean(value);

      expect(result).toBe(false);
    });
  });

  describe(`when the given value is a string like "true"`, (): void => {
    beforeEach((): void => {
      value = `true`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isBoolean(value);

      expect(result).toBe(true);
    });
  });

  describe(`when the given value is a string like "True"`, (): void => {
    beforeEach((): void => {
      value = `True`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isBoolean(value);

      expect(result).toBe(true);
    });
  });

  describe(`when the given value is a string like "false"`, (): void => {
    beforeEach((): void => {
      value = `false`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isBoolean(value);

      expect(result).toBe(true);
    });
  });

  describe(`when the given value is a string like "False"`, (): void => {
    beforeEach((): void => {
      value = `False`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isBoolean(value);

      expect(result).toBe(true);
    });
  });

  describe(`when the given value is true`, (): void => {
    beforeEach((): void => {
      value = true;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isBoolean(value);

      expect(result).toBe(true);
    });
  });

  describe(`when the given value is false`, (): void => {
    beforeEach((): void => {
      value = false;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = isBoolean(value);

      expect(result).toBe(true);
    });
  });
});
