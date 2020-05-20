import { IGetDiscordDevPrefix } from "../../interfaces/dev-prefix/get-discord-dev-prefix";
import { getDiscordDevPrefix } from "./get-discord-dev-prefix";

describe(`getDiscordDevPrefix()`, (): void => {
  let config: IGetDiscordDevPrefix;

  beforeEach((): void => {
    config = {
      discordId: `dummy-discord-id`,
      nickname: `dummy-nickname`,
    };
  });

  describe(`when the given nickname is null`, (): void => {
    beforeEach((): void => {
      config.nickname = null;
    });

    describe(`when the emphasis is enabled`, (): void => {
      beforeEach((): void => {
        config.hasEmphasis = true;
      });

      it(`should return a dev prefix with an emphasis`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev]**`);
      });
    });

    describe(`when the emphasis is disabled`, (): void => {
      beforeEach((): void => {
        config.hasEmphasis = false;
      });

      it(`should return a dev prefix`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(config);

        expect(result).toStrictEqual(`[dev]`);
      });
    });
  });

  describe(`when the given nickname is an empty string`, (): void => {
    beforeEach((): void => {
      config.nickname = ``;
    });

    describe(`when the emphasis is enabled`, (): void => {
      beforeEach((): void => {
        config.hasEmphasis = true;
      });

      it(`should return a dev prefix with an emphasis`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev]**`);
      });
    });

    describe(`when the emphasis is disabled`, (): void => {
      beforeEach((): void => {
        config.hasEmphasis = false;
      });

      it(`should return a dev prefix`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(config);

        expect(result).toStrictEqual(`[dev]`);
      });
    });
  });

  describe(`when the given nickname is "dummy-nickname"`, (): void => {
    beforeEach((): void => {
      config.nickname = `dummy-nickname`;
    });

    describe(`when the emphasis is enabled`, (): void => {
      beforeEach((): void => {
        config.hasEmphasis = true;
      });

      it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev - dummy-nickname]**`);
      });
    });

    describe(`when the emphasis is disabled`, (): void => {
      beforeEach((): void => {
        config.hasEmphasis = false;
      });

      it(`should return a dev prefix and a nickname`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(config);

        expect(result).toStrictEqual(`[dev - dummy-nickname]`);
      });
    });
  });

  describe(`when the given nickname is "sonia"`, (): void => {
    beforeEach((): void => {
      config.nickname = `sonia`;
    });

    describe(`when the emphasis is enabled`, (): void => {
      beforeEach((): void => {
        config.hasEmphasis = true;
      });

      it(`should return a dev prefix and a nickname with an emphasis`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev - sonia]**`);
      });
    });

    describe(`when the emphasis is disabled`, (): void => {
      beforeEach((): void => {
        config.hasEmphasis = false;
      });

      it(`should return a dev prefix and a nickname`, (): void => {
        expect.assertions(1);

        const result = getDiscordDevPrefix(config);

        expect(result).toStrictEqual(`[dev - sonia]`);
      });
    });
  });
});
