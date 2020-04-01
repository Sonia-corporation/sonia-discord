import { addDiscordDevPrefix } from "./add-discord-dev-prefix";

describe(`addDiscordDevPrefix()`, (): void => {
  let message: string;
  let nickname: string;

  beforeEach((): void => {
    message = `dummy-message`;
    nickname = `dummy-nickname`;
  });

  describe(`when the given message is an empty string`, (): void => {
    beforeAll((): void => {
      message = ``;
      nickname = ``;
    });

    describe(`when the given nickanme is "dummy-nickname"`, (): void => {
      beforeEach((): void => {
        nickname = `dummy-nickname`;
        message = ``;
      });

      it(`should return a message with a nickname dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
      });
    });

    describe(`when the given nickanme is empty`, (): void => {
      beforeEach((): void => {
        nickname = ``;
        message = ``;
      });

      it(`should return a message with an empty nickname dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev]** `);
      });
    });
  });

  describe(`when the given message is "dummy-message"`, (): void => {
    beforeEach((): void => {
      message = `dummy-message`;
    });

    describe(`when the given nickanme is "dummy-nickname"`, (): void => {
      it(`should return a message with a empty dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(
          `**[dev - dummy-nickname]** dummy-message`
        );
      });
    });

    describe(`when the given nickanme is empty`, (): void => {
      beforeEach((): void => {
        nickname = ``;
      });

      it(`should return a message with an empty nickname dev prefix`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev]** dummy-message`);
      });
    });
  });

  describe(`when the given nickname is "sonia"`, (): void => {
    beforeEach((): void => {
      nickname = `sonia`;
    });

    describe(`when the given message is empty`, (): void => {
      beforeEach((): void => {
        message = ``;
      });

      it(`should return a dev prefix with empty message`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev - sonia]** `);
      });
    });

    describe(`when the given message is "dummy-message"`, (): void => {
      it(`should return a dev prefix with message`, (): void => {
        expect.assertions(1);

        const result = addDiscordDevPrefix(message, nickname);

        expect(result).toStrictEqual(`**[dev - sonia]** dummy-message`);
      });
    });
  });

  describe(`when the given message is "hello, world!" and the name is "sonia"`, (): void => {
    beforeEach((): void => {
      message = `hello, world!`;
      nickname = `sonia`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - sonia]** hello, world!`);
    });
  });
});
