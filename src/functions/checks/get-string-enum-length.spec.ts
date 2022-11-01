import { getStringEnumLength } from './get-string-enum-length';

enum DummyEmptyEnum {}
enum DummyOneMemberEnum {
  ONE = `one`,
}
enum DummyTwoMembersEnum {
  ONE = `one`,
  TWO = `two`,
}

describe(`getStringEnumLength()`, (): void => {
  describe(`when the given enum is empty`, (): void => {
    it(`should return 0`, (): void => {
      expect.assertions(1);

      const result = getStringEnumLength(DummyEmptyEnum);

      expect(result).toBe(0);
    });
  });

  describe(`when the given enum has one member`, (): void => {
    it(`should return 1`, (): void => {
      expect.assertions(1);

      const result = getStringEnumLength(DummyOneMemberEnum);

      expect(result).toBe(1);
    });
  });

  describe(`when the given enum has two members`, (): void => {
    it(`should return 2`, (): void => {
      expect.assertions(1);

      const result = getStringEnumLength(DummyTwoMembersEnum);

      expect(result).toBe(2);
    });
  });
});
