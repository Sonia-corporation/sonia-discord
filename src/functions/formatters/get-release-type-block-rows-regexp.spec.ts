import { getReleaseTypeBlockRowsRegexp } from './get-release-type-block-rows-regexp';
import xregexp from 'xregexp';

describe(`getReleaseTypeBlockRowsRegexp()`, (): void => {
  let text: string;

  it(`should return a regexp`, (): void => {
    expect.assertions(1);

    const result = getReleaseTypeBlockRowsRegexp();

    expect(result).toStrictEqual(/(?<=:__\n)(.|\n)*/gim);
  });

  describe(`when tested with an empty text`, (): void => {
    beforeEach((): void => {
      text = ``;
    });

    it(`should not match`, (): void => {
      expect.assertions(1);

      const result = getReleaseTypeBlockRowsRegexp();

      expect(xregexp.test(text, result)).toBe(false);
    });
  });

  describe(`when tested with a bug fixes block`, (): void => {
    beforeEach((): void => {
      text = `**__Bug Fixes:__\nlabeler:** fix build error`;
    });

    it(`should match`, (): void => {
      expect.assertions(1);

      const result = getReleaseTypeBlockRowsRegexp();

      expect(xregexp.test(text, result)).toBe(true);
    });
  });

  describe(`when tested with two bug fixes blocks`, (): void => {
    beforeEach((): void => {
      text = `**__Bug Fixes:__\nlabeler:** fix build error\n**environment:** fix type error due to --fix tslint option failing`;
    });

    it(`should match`, (): void => {
      expect.assertions(1);

      const result = getReleaseTypeBlockRowsRegexp();

      expect(xregexp.test(text, result)).toBe(true);
    });
  });
});
