import { getDiscordDevPrefix } from "./get-discord-dev-prefix";

describe(`getDiscordDevPrefix()`, (): void => {
  let nickname: string | null;
  let hasEmphasis: boolean;

  beforeEach((): void => {
    nickname = `dummy-nickname`;
  });

  describe(`when the given nickname is null`, (): void => {
    beforeEach((): void => {
      nickname = null;
    });

    describe(`when the emphasis is enabled`, (): void => {
      beforeEach((): void => {
        hasEmphasis = true;
      });

      it(`should return a dev prefix with an emphasis`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(nickname, hasEmphasis);

        expect(result).toStrictEqual(`**[dev]**`);
      });
    });

    describe(`when the emphasis is disabled`, (): void => {
      beforeEach((): void => {
        hasEmphasis = false;
      });

      it(`should return a dev prefix`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(nickname, hasEmphasis);

        expect(result).toStrictEqual(`[dev]`);
      });
    });
  });

  describe(`when the given nickname is an empty string`, (): void => {
    beforeEach((): void => {
      nickname = ``;
    });

    describe(`when the emphasis is enabled`, (): void => {
      beforeEach((): void => {
        hasEmphasis = true;
      });

      it(`should return a dev prefix with an emphasis`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(nickname, hasEmphasis);

        expect(result).toStrictEqual(`**[dev]**`);
      });
    });

    describe(`when the emphasis is disabled`, (): void => {
      beforeEach((): void => {
        hasEmphasis = false;
      });

      it(`should return a dev prefix`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(nickname, hasEmphasis);

        expect(result).toStrictEqual(`[dev]`);
      });
    });
  });

  describe(`when the given nickname is "dummy-nickname"`, (): void => {
    beforeEach((): void => {
      nickname = `dummy-nickname`;
    });

    describe(`when the emphasis is enabled`, (): void => {
      beforeEach((): void => {
        hasEmphasis = true;
      });

      it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(nickname, hasEmphasis);

        expect(result).toStrictEqual(`**[dev - dummy-nickname]**`);
      });
    });

    describe(`when the emphasis is disabled`, (): void => {
      beforeEach((): void => {
        hasEmphasis = false;
      });

      it(`should return a dev prefix and a nickname`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(nickname, hasEmphasis);

        expect(result).toStrictEqual(`[dev - dummy-nickname]`);
      });
    });
  });

  describe(`when the given nickname is "sonia"`, (): void => {
    beforeEach((): void => {
      nickname = `sonia`;
    });

    describe(`when the emphasis is enabled`, (): void => {
      beforeEach((): void => {
        hasEmphasis = true;
      });

      it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(nickname, hasEmphasis);

        expect(result).toStrictEqual(`**[dev - sonia]**`);
      });
    });

    describe(`when the emphasis is disabled`, (): void => {
      beforeEach((): void => {
        hasEmphasis = false;
      });

      it(`should return a dev prefix and a nickname`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(nickname, hasEmphasis);

        expect(result).toStrictEqual(`[dev - sonia]`);
      });
    });
  });
});
