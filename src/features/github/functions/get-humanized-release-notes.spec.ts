import { getHumanizedReleaseNotes } from './get-humanized-release-notes';

describe(`getHumanizedReleaseNotes()`, (): void => {
  let notes: string;

  describe(`when the given release notes is a simple string`, (): void => {
    beforeEach((): void => {
      notes = `dummy notes`;
    });

    it(`should not change the given release notes`, (): void => {
      expect.assertions(1);

      const result = getHumanizedReleaseNotes(notes);

      expect(result).toStrictEqual(`dummy notes`);
    });
  });
});
