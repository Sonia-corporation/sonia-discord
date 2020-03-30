import { addDiscordDevPrefix } from "./add-discord-dev-prefix";

describe(`addDiscordDevPrefix()`, (): void => {
  let message: string;

  beforeEach((): void => {
    message = `dummy-message`;
  });

  describe(`when the given message is an empty string`, (): void => {
    beforeEach((): void => {
      message = ``;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message);

      expect(result).toStrictEqual(`**[dev]** `);
    });
  });

  describe(`when the given message is "dummy"`, (): void => {
    beforeEach((): void => {
      message = `dummy`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message);

      expect(result).toStrictEqual(`**[dev]** dummy`);
    });
  });

  describe(`when the given message is "hello, world!"`, (): void => {
    beforeEach((): void => {
      message = `hello, world!`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(message);

      expect(result).toStrictEqual(`**[dev]** hello, world!`);
    });
  });
});
