import { discordCommandGetFlagValue } from './discord-command-get-flag-value';
import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';

describe(`discordCommandGetFlagValue()`, (): void => {
  let messageFlag: IDiscordMessageFlag;

  describe(`when the given flag is empty`, (): void => {
    beforeEach((): void => {
      messageFlag = ``;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagValue(messageFlag);

      expect(result).toBeNull();
    });
  });

  describe(`when the given flag is a shortcut flag`, (): void => {
    beforeEach((): void => {
      messageFlag = `-flag`;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagValue(messageFlag);

      expect(result).toBeNull();
    });
  });

  describe(`when the given flag is a shortcut flag with an empty value`, (): void => {
    beforeEach((): void => {
      messageFlag = `-flag=`;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagValue(messageFlag);

      expect(result).toBeNull();
    });
  });

  describe(`when the given flag is a shortcut flag with a value`, (): void => {
    beforeEach((): void => {
      messageFlag = `-flag=dummy`;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagValue(messageFlag);

      expect(result).toBeNull();
    });
  });

  describe(`when the given flag is a flag`, (): void => {
    beforeEach((): void => {
      messageFlag = `--flag`;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagValue(messageFlag);

      expect(result).toBeNull();
    });
  });

  describe(`when the given flag is a flag with an empty value`, (): void => {
    beforeEach((): void => {
      messageFlag = `--flag=`;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagValue(messageFlag);

      expect(result).toBeNull();
    });
  });

  describe(`when the given flag is a flag with a value`, (): void => {
    beforeEach((): void => {
      messageFlag = `--flag=dummy`;
    });

    it(`should return "dummy"`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagValue(messageFlag);

      expect(result).toStrictEqual(`dummy`);
    });
  });
});
