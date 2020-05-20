import { IAddDiscordDevPrefix } from "../../interfaces/dev-prefix/add-discord-dev-prefix";
import { addDiscordDevPrefix } from "./add-discord-dev-prefix";

describe(`addDiscordDevPrefix()`, (): void => {
  let config: IAddDiscordDevPrefix;

  beforeEach((): void => {
    config = {
      discordId: `dummy-discord-id`,
      message: `dummy-message`,
      nickname: `dummy-nickname`,
    };
  });

  describe(`when the given message is an empty string`, (): void => {
    beforeEach((): void => {
      config.message = ``;
    });

    describe(`when the given nickname is null`, (): void => {
      beforeEach((): void => {
        config.nickname = null;
      });

      it(`should return a message with a dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev]** `);
      });
    });

    describe(`when the given nickname is an empty string`, (): void => {
      beforeEach((): void => {
        config.nickname = ``;
      });

      it(`should return a message with a dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev]** `);
      });
    });

    describe(`when the given nickname is "dummy-nickname"`, (): void => {
      beforeEach((): void => {
        config.nickname = `dummy-nickname`;
      });

      it(`should return a message with a dev prefix and a nickname`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
      });
    });

    describe(`when the given nickname is "sonia"`, (): void => {
      beforeEach((): void => {
        config.nickname = `sonia`;
      });

      it(`should return a message with a dev prefix and a nickname`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev - sonia]** `);
      });
    });
  });

  describe(`when the given message is "dummy-message"`, (): void => {
    beforeEach((): void => {
      config.message = `dummy-message`;
    });

    describe(`when the given nickname is null`, (): void => {
      beforeEach((): void => {
        config.nickname = null;
      });

      it(`should return a message with a dev prefix and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev]** dummy-message`);
      });
    });

    describe(`when the given nickname is an empty string`, (): void => {
      beforeEach((): void => {
        config.nickname = ``;
      });

      it(`should return a message with a dev prefix and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev]** dummy-message`);
      });
    });

    describe(`when the given nickname is "dummy-nickname"`, (): void => {
      it(`should return a message with a dev prefix, a nickname and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(
          `**[dev - dummy-nickname]** dummy-message`
        );
      });
    });

    describe(`when the given nickname is "sonia"`, (): void => {
      beforeEach((): void => {
        config.nickname = `sonia`;
      });

      it(`should return a message with a dev prefix, a nickname and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev - sonia]** dummy-message`);
      });
    });
  });

  describe(`when the given message is "hello-world"`, (): void => {
    beforeEach((): void => {
      config.message = `hello-world`;
    });

    describe(`when the given nickname is null`, (): void => {
      beforeEach((): void => {
        config.nickname = null;
      });

      it(`should return a message with a dev prefix and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev]** hello-world`);
      });
    });

    describe(`when the given nickname is an empty`, (): void => {
      beforeEach((): void => {
        config.nickname = ``;
      });

      it(`should return a message with a dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev]** hello-world`);
      });
    });

    describe(`when the given nickname is "dummy-nickname"`, (): void => {
      it(`should return a message with a dev prefix, a nickname and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev - dummy-nickname]** hello-world`);
      });
    });

    describe(`when the given nickname is "sonia"`, (): void => {
      beforeEach((): void => {
        config.nickname = `sonia`;
      });

      it(`should return a message with a dev prefix, a nickname and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(config);

        expect(result).toStrictEqual(`**[dev - sonia]** hello-world`);
      });
    });
  });
});
