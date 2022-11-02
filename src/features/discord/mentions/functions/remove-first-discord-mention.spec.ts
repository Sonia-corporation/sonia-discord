import { removeFirstDiscordMention } from './remove-first-discord-mention';

describe(`removeFirstDiscordMention()`, (): void => {
  let message: string;

  describe(`when the message is empty`, (): void => {
    beforeEach((): void => {
      message = ``;
    });

    it(`should return an empty message`, (): void => {
      expect.assertions(1);

      const result = removeFirstDiscordMention(message);

      expect(result).toBe(``);
    });
  });

  describe(`when the message does not contain a mention`, (): void => {
    beforeEach((): void => {
      message = `dummy message`;
    });

    it(`should return the same message`, (): void => {
      expect.assertions(1);

      const result = removeFirstDiscordMention(message);

      expect(result).toBe(`dummy message`);
    });
  });

  describe(`when the message contains a mention`, (): void => {
    beforeEach((): void => {
      message = `dummy message with <@123> mentioned`;
    });

    it(`should return the message without the mention`, (): void => {
      expect.assertions(1);

      const result = removeFirstDiscordMention(message);

      expect(result).toBe(`dummy message with  mentioned`);
    });
  });

  describe(`when the message contains a nickname mention`, (): void => {
    beforeEach((): void => {
      message = `dummy message with <@!123> mentioned`;
    });

    it(`should return the message without the mention`, (): void => {
      expect.assertions(1);

      const result = removeFirstDiscordMention(message);

      expect(result).toBe(`dummy message with  mentioned`);
    });
  });

  describe(`when the message contains two identical mentions`, (): void => {
    beforeEach((): void => {
      message = `dummy message with <@123> mentioned and again here <@123>`;
    });

    it(`should return the message without the first mention`, (): void => {
      expect.assertions(1);

      const result = removeFirstDiscordMention(message);

      expect(result).toBe(`dummy message with  mentioned and again here <@123>`);
    });
  });

  describe(`when the message contains two identical nickname mentions`, (): void => {
    beforeEach((): void => {
      message = `dummy message with <@!123> mentioned and again here <@!123>`;
    });

    it(`should return the message without the first mention`, (): void => {
      expect.assertions(1);

      const result = removeFirstDiscordMention(message);

      expect(result).toBe(`dummy message with  mentioned and again here <@!123>`);
    });
  });

  describe(`when the message contains two different mentions`, (): void => {
    beforeEach((): void => {
      message = `dummy message with <@123> mentioned and again here <@456>`;
    });

    it(`should return the message without the first mention`, (): void => {
      expect.assertions(1);

      const result = removeFirstDiscordMention(message);

      expect(result).toBe(`dummy message with  mentioned and again here <@456>`);
    });
  });

  describe(`when the message contains two different nickname mentions`, (): void => {
    beforeEach((): void => {
      message = `dummy message with <@!123> mentioned and again here <@!456>`;
    });

    it(`should return the message without the first mention`, (): void => {
      expect.assertions(1);

      const result = removeFirstDiscordMention(message);

      expect(result).toBe(`dummy message with  mentioned and again here <@!456>`);
    });
  });
});
