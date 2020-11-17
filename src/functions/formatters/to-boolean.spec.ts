import { toBoolean } from './to-boolean';

describe(`toBoolean()`, (): void => {
  let value: boolean | string | null | undefined;

  describe(`when the given value is undefined`, (): void => {
    beforeEach((): void => {
      value = undefined;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = toBoolean(value);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given value is null`, (): void => {
    beforeEach((): void => {
      value = null;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = toBoolean(value);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given value is a string like "dummy"`, (): void => {
    beforeEach((): void => {
      value = `dummy`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = toBoolean(value);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given value is a string like "true"`, (): void => {
    beforeEach((): void => {
      value = `true`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = toBoolean(value);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given value is a string like "True"`, (): void => {
    beforeEach((): void => {
      value = `True`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = toBoolean(value);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given value is a string like "false"`, (): void => {
    beforeEach((): void => {
      value = `false`;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = toBoolean(value);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is a string like "False"`, (): void => {
    beforeEach((): void => {
      value = `False`;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = toBoolean(value);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is true`, (): void => {
    beforeEach((): void => {
      value = true;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = toBoolean(value);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given value is false`, (): void => {
    beforeEach((): void => {
      value = false;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = toBoolean(value);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given fallback value is true`, (): void => {
    let asFallback: boolean;

    beforeEach((): void => {
      asFallback = true;
    });

    describe(`when the given value is undefined`, (): void => {
      beforeEach((): void => {
        value = undefined;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given value is null`, (): void => {
      beforeEach((): void => {
        value = null;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given value is a string like "dummy"`, (): void => {
      beforeEach((): void => {
        value = `dummy`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given value is a string like "true"`, (): void => {
      beforeEach((): void => {
        value = `true`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given value is a string like "True"`, (): void => {
      beforeEach((): void => {
        value = `True`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given value is a string like "false"`, (): void => {
      beforeEach((): void => {
        value = `false`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is a string like "False"`, (): void => {
      beforeEach((): void => {
        value = `False`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is true`, (): void => {
      beforeEach((): void => {
        value = true;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given value is false`, (): void => {
      beforeEach((): void => {
        value = false;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(false);
      });
    });
  });

  describe(`when the given fallback value is false`, (): void => {
    let asFallback: boolean;

    beforeEach((): void => {
      asFallback = false;
    });

    describe(`when the given value is undefined`, (): void => {
      beforeEach((): void => {
        value = undefined;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is null`, (): void => {
      beforeEach((): void => {
        value = null;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is a string like "dummy"`, (): void => {
      beforeEach((): void => {
        value = `dummy`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is a string like "true"`, (): void => {
      beforeEach((): void => {
        value = `true`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given value is a string like "True"`, (): void => {
      beforeEach((): void => {
        value = `True`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given value is a string like "false"`, (): void => {
      beforeEach((): void => {
        value = `false`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is a string like "False"`, (): void => {
      beforeEach((): void => {
        value = `False`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given value is true`, (): void => {
      beforeEach((): void => {
        value = true;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given value is false`, (): void => {
      beforeEach((): void => {
        value = false;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = toBoolean(value, asFallback);

        expect(result).toStrictEqual(false);
      });
    });
  });
});
