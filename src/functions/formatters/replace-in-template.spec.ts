import { replaceInTemplate } from './replace-in-template';
import { IObject } from '../../types/object';

describe(`replaceInTemplate()`, (): void => {
  let text: string;
  let params: IObject;

  describe(`when the text is empty`, (): void => {
    beforeEach((): void => {
      text = ``;
      params = {
        foo: `bar`,
      };
    });

    it(`should return the same text`, (): void => {
      expect.assertions(1);

      const result = replaceInTemplate(text, params);

      expect(result).toStrictEqual(text);
    });
  });

  describe(`when the text is empty and no params are passed`, (): void => {
    beforeEach((): void => {
      text = ``;
      params = {};
    });

    it(`should return the same text`, (): void => {
      expect.assertions(1);

      const result = replaceInTemplate(text, params);

      expect(result).toStrictEqual(text);
    });
  });

  describe(`when the text has no params tags`, (): void => {
    beforeEach((): void => {
      text = `dummy text`;
      params = {
        foo: `bar`,
      };
    });

    it(`should return the same text`, (): void => {
      expect.assertions(1);

      const result = replaceInTemplate(text, params);

      expect(result).toStrictEqual(text);
    });
  });

  describe(`when the text has some params tags that do not match`, (): void => {
    beforeEach((): void => {
      text = `dummy text with {{ wrong }}`;
      params = {
        foo: `bar`,
      };
    });

    it(`should throw`, (): void => {
      expect.assertions(1);

      expect((): string => replaceInTemplate(text, params)).toThrow(new Error(`wrong is not defined`));
    });
  });

  describe(`when the text has one params tag that match`, (): void => {
    beforeEach((): void => {
      text = `dummy text with {{ foo }}`;
      params = {
        foo: `bar`,
      };
    });

    it(`should return the text with the params tags replaced`, (): void => {
      expect.assertions(1);

      const result = replaceInTemplate(text, params);

      expect(result).toBe(`dummy text with bar`);
    });
  });

  describe(`when the text has multiple params tags that match`, (): void => {
    beforeEach((): void => {
      text = `dummy text with {{ foo }} {{ bar }}`;
      params = {
        bar: `foo`,
        foo: `bar`,
      };
    });

    it(`should return the text with the params tags replaced`, (): void => {
      expect.assertions(1);

      const result = replaceInTemplate(text, params);

      expect(result).toBe(`dummy text with bar foo`);
    });
  });
});
