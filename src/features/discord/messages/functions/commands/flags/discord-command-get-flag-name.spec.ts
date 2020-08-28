import { discordCommandGetFlagName } from "./discord-command-get-flag-name";

describe(`discordCommandGetFlagName()`, (): void => {
  let messageFlag: string;

  describe(`when the given flag is empty`, (): void => {
    beforeEach((): void => {
      messageFlag = ``;
    });

    it(`should return null`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagName(messageFlag);

      expect(result).toBeNull();
    });
  });

  describe(`when the given flag is a shortcut flag`, (): void => {
    beforeEach((): void => {
      messageFlag = `-flag`;
    });

    it(`should return "flag"`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagName(messageFlag);

      expect(result).toStrictEqual(`flag`);
    });
  });

  describe(`when the given flag is a shortcut flag with an empty value`, (): void => {
    beforeEach((): void => {
      messageFlag = `-flag=`;
    });

    it(`should return "flag"`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagName(messageFlag);

      expect(result).toStrictEqual(`flag`);
    });
  });

  describe(`when the given flag is a shortcut flag with a value`, (): void => {
    beforeEach((): void => {
      messageFlag = `-flag=dummy`;
    });

    it(`should return "flag"`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagName(messageFlag);

      expect(result).toStrictEqual(`flag`);
    });
  });

  describe(`when the given flag is a flag`, (): void => {
    beforeEach((): void => {
      messageFlag = `--flag`;
    });

    it(`should return "flag"`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagName(messageFlag);

      expect(result).toStrictEqual(`flag`);
    });
  });

  describe(`when the given flag is a flag with an empty value`, (): void => {
    beforeEach((): void => {
      messageFlag = `--flag=`;
    });

    it(`should return "flag"`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagName(messageFlag);

      expect(result).toStrictEqual(`flag`);
    });
  });

  describe(`when the given flag is a flag with a value`, (): void => {
    beforeEach((): void => {
      messageFlag = `--flag=dummy`;
    });

    it(`should return "flag"`, (): void => {
      expect.assertions(1);

      const result = discordCommandGetFlagName(messageFlag);

      expect(result).toStrictEqual(`flag`);
    });
  });
});
