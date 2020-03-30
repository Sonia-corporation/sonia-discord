import { addDiscordDevPrefix } from "./add-discord-dev-prefix";

describe(`addDiscordDevPrefix()`, (): void => {
  let message: string;
  let name: string;

  beforeEach((): void => {
    name = `vincent`;
    message = `dummy-message`;
  });

  describe(`when the given message is an empty string`, (): void => {
    beforeEach((): void => {
      message = ``;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(name, message);

      expect(result).toStrictEqual(`**[dev - ${name}]** `);
    });
  });

  describe(`when the given name is an empty string`, (): void => {
    beforeEach((): void => {
      name = ``;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(name, message);

      expect(result).toStrictEqual(`**[dev - ]** dummy-message`);
    });
  });

  describe(`when the given message is "dummy"`, (): void => {
    beforeEach((): void => {
      message = `dummy`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(name, message);

      expect(result).toStrictEqual(`**[dev - ${name}]** dummy`);
    });
  });

  describe(`when the given name is "vilteros"`, (): void => {
    beforeEach((): void => {
      name = `vilteros`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(name, message);

      expect(result).toStrictEqual(`**[dev - vilteros]** dummy-message`);
    });
  });

  describe(`when the given message is "hello, world!"`, (): void => {
    beforeEach((): void => {
      message = `hello, world!`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(name, message);

      expect(result).toStrictEqual(`**[dev - ${name}]** hello, world!`);
    });
  });

  describe(`when the given message is "hello, world!" and the name is "vilteros"`, (): void => {
    beforeEach((): void => {
      message = `hello, world!`;
      name = `vilteros`;
    });

    it(`should return a message with a dev prefix`, (): void => {
      expect.assertions(1);

      const result = addDiscordDevPrefix(name, message);

      expect(result).toStrictEqual(`**[dev - vilteros]** hello, world!`);
    });
  });
});
