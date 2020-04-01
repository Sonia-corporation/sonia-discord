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
      nickname = ``;
    });

    it(`should return a message with a nickname dev prefix`, (): void => {
      expect.assertions(1);
      nickname = `dummy-nickname`;

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - dummy-nickname]** `);
    });

    it(`should return a message with an empty nickname dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev]** `);
    });
  });

  describe(`when the given message is "dummy-message"`, (): void => {
    beforeEach((): void => {
      message = `dummy-message`;
    });

    it(`should return a message with a empty dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - dummy-nickname]** dummy-message`);
    });

    it(`should return a message with an empty nickname dev prefix`, (): void => {
      expect.assertions(1);
      nickname = ``;

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev]** dummy-message`);
    });
  });

  describe(`when the given nickname is "sonia"`, (): void => {
    beforeEach((): void => {
      nickname = `sonia`;
    });

    it(`should return a dev prefix with empty message`, (): void => {
      expect.assertions(1);
      message = ``;

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - sonia]** `);
    });

    it(`should return a dev prefix with message`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - sonia]** dummy-message`);
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
