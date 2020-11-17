import { discordCommandIsMessageFlag } from './discord-command-is-message-flag';
import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';

describe(`discordCommandIsMessageFlag()`, (): void => {
  let messageFlag: IDiscordMessageFlag;

  describe(`when the given message flag is empty`, (): void => {
    beforeEach((): void => {
      messageFlag = ``;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsMessageFlag(messageFlag);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given message flag is not a flag`, (): void => {
    beforeEach((): void => {
      messageFlag = `dummy`;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsMessageFlag(messageFlag);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given message flag is a shortcut flag`, (): void => {
    beforeEach((): void => {
      messageFlag = `-dummy`;
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsMessageFlag(messageFlag);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given message flag is a flag without explicity value`, (): void => {
    beforeEach((): void => {
      messageFlag = `--dummy`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsMessageFlag(messageFlag);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given message flag is a flag without value`, (): void => {
    beforeEach((): void => {
      messageFlag = `--dummy=`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsMessageFlag(messageFlag);

      expect(result).toStrictEqual(true);
    });
  });

  describe(`when the given message flag is a flag with a value`, (): void => {
    beforeEach((): void => {
      messageFlag = `--dummy=true`;
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsMessageFlag(messageFlag);

      expect(result).toStrictEqual(true);
    });
  });
});
