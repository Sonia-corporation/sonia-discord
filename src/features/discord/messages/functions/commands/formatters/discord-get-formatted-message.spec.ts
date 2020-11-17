import { discordGetFormattedMessage } from './discord-get-formatted-message';

describe(`discordGetFormattedMessage()`, (): void => {
  let message: string;

  describe(`when the given message is a lower case message`, (): void => {
    beforeEach((): void => {
      message = `lower case message`;
    });

    it(`should return the same message`, (): void => {
      expect.assertions(1);

      const result = discordGetFormattedMessage(message);

      expect(result).toStrictEqual(`lower case message`);
    });
  });

  describe(`when the given message is an upper case message`, (): void => {
    beforeEach((): void => {
      message = `UPPER CASE MESSAGE`;
    });

    it(`should return the message on lower case`, (): void => {
      expect.assertions(1);

      const result = discordGetFormattedMessage(message);

      expect(result).toStrictEqual(`upper case message`);
    });
  });
});
