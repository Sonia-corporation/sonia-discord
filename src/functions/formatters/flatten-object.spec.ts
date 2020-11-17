import { flattenObject } from './flatten-object';
import { IObject } from '../../types/object';

describe(`flattenObject()`, (): void => {
  let object: IObject;

  describe(`when the given object is an empty object`, (): void => {
    beforeEach((): void => {
      object = {};
    });

    it(`should return the same object`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({});
    });
  });

  describe(`when the given object is an object with an undefined property`, (): void => {
    beforeEach((): void => {
      object = {
        key: undefined,
      };
    });

    it(`should return the same object`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        key: undefined,
      });
    });
  });

  describe(`when the given object is an object with a null property`, (): void => {
    beforeEach((): void => {
      object = {
        key: null,
      };
    });

    it(`should return the same object`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        key: null,
      });
    });
  });

  describe(`when the given object is an object with a string property`, (): void => {
    beforeEach((): void => {
      object = {
        key: `value`,
      };
    });

    it(`should return the same object`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        key: `value`,
      });
    });
  });

  describe(`when the given object is an object with a number property`, (): void => {
    beforeEach((): void => {
      object = {
        key: 8,
      };
    });

    it(`should return the same object`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        key: 8,
      });
    });
  });

  describe(`when the given object is an object with a boolean true property`, (): void => {
    beforeEach((): void => {
      object = {
        key: true,
      };
    });

    it(`should return the same object`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        key: true,
      });
    });
  });

  describe(`when the given object is an object with a boolean false property`, (): void => {
    beforeEach((): void => {
      object = {
        key: false,
      };
    });

    it(`should return the same object`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        key: false,
      });
    });
  });

  describe(`when the given object is an object with an object with an undefined property`, (): void => {
    beforeEach((): void => {
      object = {
        object1: {
          key: undefined,
        },
      };
    });

    it(`should return an object with a path leading to the value`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        'object1.key': undefined,
      });
    });
  });

  describe(`when the given object is an object with an object with a null property`, (): void => {
    beforeEach((): void => {
      object = {
        object1: {
          key: null,
        },
      };
    });

    it(`should return an object with a path leading to the value`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        'object1.key': null,
      });
    });
  });

  describe(`when the given object is an object with an object with a string property`, (): void => {
    beforeEach((): void => {
      object = {
        object1: {
          key: `value`,
        },
      };
    });

    it(`should return an object with a path leading to the value`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        'object1.key': `value`,
      });
    });
  });

  describe(`when the given object is an object with an object with a number property`, (): void => {
    beforeEach((): void => {
      object = {
        object1: {
          key: 8,
        },
      };
    });

    it(`should return an object with a path leading to the value`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        'object1.key': 8,
      });
    });
  });

  describe(`when the given object is an object with an object with a boolean true property`, (): void => {
    beforeEach((): void => {
      object = {
        object1: {
          key: true,
        },
      };
    });

    it(`should return an object with a path leading to the value`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        'object1.key': true,
      });
    });
  });

  describe(`when the given object is an object with an object with a boolean false property`, (): void => {
    beforeEach((): void => {
      object = {
        object1: {
          key: false,
        },
      };
    });

    it(`should return an object with a path leading to the value`, (): void => {
      expect.assertions(1);

      const result = flattenObject(object);

      expect(result).toStrictEqual({
        'object1.key': false,
      });
    });
  });
});
