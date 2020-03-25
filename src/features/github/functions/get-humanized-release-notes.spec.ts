import { getHumanizedReleaseNotes } from './get-humanized-release-notes';

describe(`getHumanizedReleaseNotes()`, (): void => {
  let releaseNotes: string;

  describe(`when the given release notes is a simple string`, (): void => {
    beforeEach((): void => {
      releaseNotes = `dummy notes`;
    });

    it(`should not change the given release notes`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(`dummy notes`);
    });
  });

  describe(`when the given release notes contain a markdown link`, (): void => {
    beforeEach((): void => {
      releaseNotes = `[1.15.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.14.0...1.15.0)`;
    });

    it(`should remove the link`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(releaseNotes);

      expect(result).toStrictEqual(``);
    });
  });
});
