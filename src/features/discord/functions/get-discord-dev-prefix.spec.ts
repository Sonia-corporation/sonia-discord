import { getDiscordDevPrefix } from "./get-discord-dev-prefix";

describe(`getDiscordDevPrefix()`, (): void => {
  let nickname: string | null;

  beforeEach((): void => {
    nickname = `dummy-nickname`;
  });

  describe(`when the given nickname is null`, (): void => {
    beforeEach((): void => {
      nickname = null;
    });

    it(`should return a dev prefix`, (): void => {
      expect.assertions(1);

      const result = getDiscordDevPrefix(nickname);

      expect(result).toStrictEqual(`**[dev]**`);
    });
  });

  describe(`when the given nickname is an empty string`, (): void => {
    beforeEach((): void => {
      nickname = ``;
    });

    it(`should return a dev prefix`, (): void => {
      expect.assertions(1);

      const result = getDiscordDevPrefix(nickname);

      expect(result).toStrictEqual(`**[dev]**`);
    });
  });

  describe(`when the given nickname is "dummy-nickname"`, (): void => {
    beforeEach((): void => {
      nickname = `dummy-nickname`;
    });

    it(`should return a dev prefix and a nickname`, (): void => {
      expect.assertions(1);

      const result = getDiscordDevPrefix(nickname);

      expect(result).toStrictEqual(`**[dev - dummy-nickname]**`);
    });
  });

  describe(`when the given nickname is "sonia"`, (): void => {
    beforeEach((): void => {
      nickname = `sonia`;
    });

    it(`should return a dev prefix and a nickname`, (): void => {
      expect.assertions(1);

      const result = getDiscordDevPrefix(nickname);

      expect(result).toStrictEqual(`**[dev - sonia]**`);
    });
  });
});
