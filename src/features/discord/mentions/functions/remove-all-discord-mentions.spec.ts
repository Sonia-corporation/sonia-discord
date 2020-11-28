import { removeAllDiscordMentions } from './remove-all-discord-mentions';

describe(`removeAllDiscordMentions()`, (): void => {
  let message: string;

  describe(`when the message is empty`, (): void => {
    beforeEach((): void => {
      message = ``;
    });

    it(`should return an empty message`, (): void => {
      expect.assertions(1);

      const result = removeAllDiscordMentions(message);

      expect(result).toStrictEqual(``);
    });
  });

  describe(`when the message does not contain a mention`, (): void => {
    beforeEach((): void => {
      message = `dummy message`;
    });

    it(`should return the same message`, (): void => {
      expect.assertions(1);

      const result = removeAllDiscordMentions(message);

      expect(result).toStrictEqual(`dummy message`);
    });
  });

  describe(`when the message contains a mention`, (): void => {
    beforeEach((): void => {
      message = `dummy message with <@!123> mentioned`;
    });

    it(`should return the message without the mention`, (): void => {
      expect.assertions(1);

      const result = removeAllDiscordMentions(message);

      expect(result).toStrictEqual(`dummy message with  mentioned`);
    });
  });

  describe(`when the message contains two identical mentions`, (): void => {
    beforeEach((): void => {
      message = `dummy message with <@!123> mentioned and again here <@!123>`;
    });

    it(`should return the message without the mentions`, (): void => {
      expect.assertions(1);

      const result = removeAllDiscordMentions(message);

      expect(result).toStrictEqual(`dummy message with  mentioned and again here`);
    });
  });

  describe(`when the message contains two different mentions`, (): void => {
    beforeEach((): void => {
      message = `dummy message with <@!123> mentioned and again here <@!456>`;
    });

    it(`should return the message without the mentions`, (): void => {
      expect.assertions(1);

      const result = removeAllDiscordMentions(message);

      expect(result).toStrictEqual(`dummy message with  mentioned and again here`);
    });
  });
});
