import { addDiscordDevPrefix } from "./add-discord-dev-prefix";

describe(`addDiscordDevPrefix()`, (): void => {
  let message: string;
  let nickname: string;

  beforeEach((): void => {
    nickname = `vincent`;
    message = `dummy-message`;
  });

  describe(`when the given message is an empty string`, (): void => {
    beforeEach((): void => {
      message = ``;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - ${nickname}]** `);
    });
  });

  describe(`when the given name is an empty string`, (): void => {
    beforeEach((): void => {
      nickname = ``;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev]** dummy-message`);
    });
  });

  describe(`when the given message is "dummy"`, (): void => {
    beforeEach((): void => {
      message = `dummy`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - ${nickname}]** dummy`);
    });
  });

  describe(`when the given name is "vilteros"`, (): void => {
    beforeEach((): void => {
      nickname = `vilteros`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - vilteros]** dummy-message`);
    });
  });

  describe(`when the given message is "hello, world!"`, (): void => {
    beforeEach((): void => {
      message = `hello, world!`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - ${nickname}]** hello, world!`);
    });
  });

  describe(`when the given message is "hello, world!" and the name is "vilteros"`, (): void => {
    beforeEach((): void => {
      message = `hello, world!`;
      nickname = `vilteros`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message, nickname);

      expect(result).toStrictEqual(`**[dev - vilteros]** hello, world!`);
    });
  });
});
