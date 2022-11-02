import { discordCommandRemoveFlagPrefix } from './discord-command-remove-flag-prefix';
import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';

describe(`discordCommandRemoveFlagPrefix()`, (): void => {
  let messageFlag: IDiscordMessageFlag;

  describe(`when the given flag is empty`, (): void => {
    beforeEach((): void => {
      messageFlag = ``;
    });

    it(`should return an empty string`, (): void => {
      expect.assertions(1);

      const result = discordCommandRemoveFlagPrefix(messageFlag);

      expect(result).toBe(``);
    });
  });

  describe(`when the given flag is a text`, (): void => {
    beforeEach((): void => {
      messageFlag = `dummy`;
    });

    it(`should return the text`, (): void => {
      expect.assertions(1);

      const result = discordCommandRemoveFlagPrefix(messageFlag);

      expect(result).toBe(`dummy`);
    });
  });

  describe(`when the given flag is a shortcut flag`, (): void => {
    beforeEach((): void => {
      messageFlag = `-e`;
    });

    it(`should return shortcut flag without the "-" prefix`, (): void => {
      expect.assertions(1);

      const result = discordCommandRemoveFlagPrefix(messageFlag);

      expect(result).toBe(`e`);
    });
  });

  describe(`when the given flag is a flag`, (): void => {
    beforeEach((): void => {
      messageFlag = `--enabled=true`;
    });

    it(`should return flag without the "--" prefix`, (): void => {
      expect.assertions(1);

      const result = discordCommandRemoveFlagPrefix(messageFlag);

      expect(result).toBe(`enabled=true`);
    });
  });
});
