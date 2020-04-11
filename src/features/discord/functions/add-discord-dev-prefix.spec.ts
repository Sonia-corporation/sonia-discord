import { addDiscordDevPrefix } from "./add-discord-dev-prefix";

describe(`addDiscordDevPrefix()`, (): void => {
  let message: string;
  let nickname: string;

  beforeEach((): void => {
    message = `dummy-message`;
    nickname = `dummy-nickname`;
  });

  describe(`when the given message is an empty string`, (): void => {
    beforeEach((): void => {
      message = ``;
    });

    describe(`when the given nickname is an empty string`, (): void => {
      beforeEach((): void => {
        nickname = ``;
      });

      it(`should return a message with a dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev]** `);
      });
    });

    describe(`when the given nickname is "dummy-nickname"`, (): void => {
      beforeEach((): void => {
        nickname = `dummy-nickname`;
      });

      it(`should return a message with a nickname dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
      });
    });

    describe(`when the given nickname is "sonia"`, (): void => {
      beforeEach((): void => {
        nickname = `sonia`;
      });

      it(`should return a message with a nickname dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev - sonia]** `);
      });
    });
  });

  describe(`when the given message is "dummy-message"`, (): void => {
    beforeEach((): void => {
      message = `dummy-message`;
    });

    describe(`when the given nickname is an empty string`, (): void => {
      beforeEach((): void => {
        nickname = ``;
      });

      it(`should return a message with a dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev]** dummy-message`);
      });
    });

    describe(`when the given nickname is "dummy-nickname"`, (): void => {
      it(`should return a message with a dev and nickname prefixes and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(
          `**[dev - dummy-nickname]** dummy-message`
        );
      });
    });

    describe(`when the given nickname is "sonia"`, (): void => {
      beforeEach((): void => {
        nickname = `sonia`;
      });

      it(`should return a message with a dev and nickname prefixes and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev - sonia]** dummy-message`);
      });
    });
  });

  describe(`when the given message is "hello-world"`, (): void => {
    beforeEach((): void => {
      message = `hello-world`;
    });

    describe(`when the given nickname is an empty`, (): void => {
      beforeEach((): void => {
        nickname = ``;
      });

      it(`should return a message with a dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev]** hello-world`);
      });
    });

    describe(`when the given nickname is "dummy-nickname"`, (): void => {
      it(`should return a message with a dev and nickname prefixes and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev - dummy-nickname]** hello-world`);
      });
    });

    describe(`when the given nickname is "sonia"`, (): void => {
      beforeEach((): void => {
        nickname = `sonia`;
      });

      it(`should return a message with a dev and nickname prefixes and keep the given message content`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev - sonia]** hello-world`);
      });
    });
  });
});
