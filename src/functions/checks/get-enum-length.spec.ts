import { getEnumLength } from './get-enum-length';

enum DummyEmptyEnum {}
enum DummyOneMemberEnum {
  ONE = 1,
}
enum DummyTwoMembersEnum {
  ONE = 1,
  TWO = 2,
}

describe(`getEnumLength()`, (): void => {
  describe(`when the given enum is empty`, (): void => {
    it(`should return 0`, (): void => {
      expect.assertions(1);

      const result = getEnumLength(DummyEmptyEnum);

      expect(result).toBe(0);
    });
  });

  describe(`when the given enum has one member`, (): void => {
    it(`should return 2`, (): void => {
      expect.assertions(1);

      const result = getEnumLength(DummyOneMemberEnum);

      expect(result).toBe(2);
    });
  });

  describe(`when the given enum has two members`, (): void => {
    it(`should return 4`, (): void => {
      expect.assertions(1);

      const result = getEnumLength(DummyTwoMembersEnum);

      expect(result).toBe(4);
    });
  });
});
