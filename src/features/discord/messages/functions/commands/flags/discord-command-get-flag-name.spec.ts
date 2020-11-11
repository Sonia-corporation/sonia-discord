import { discordCommandGetFlagName } from './discord-command-get-flag-name';
import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';

describe(`discordCommandGetFlagName()`, (): void => {
  let messageFlag: IDiscordMessageFlag;
  let toLowerCase: boolean;

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

  describe(`when the lower case option is disabled`, (): void => {
    beforeEach((): void => {
      toLowerCase = false;
    });

    describe(`when the given flag is empty`, (): void => {
      beforeEach((): void => {
        messageFlag = ``;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toBeNull();
      });
    });

    describe(`when the given flag is a shortcut flag`, (): void => {
      beforeEach((): void => {
        messageFlag = `-Flag`;
      });

      it(`should return "Flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`Flag`);
      });
    });

    describe(`when the given flag is a shortcut flag with an empty value`, (): void => {
      beforeEach((): void => {
        messageFlag = `-Flag=`;
      });

      it(`should return "Flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`Flag`);
      });
    });

    describe(`when the given flag is a shortcut flag with a value`, (): void => {
      beforeEach((): void => {
        messageFlag = `-Flag=dummy`;
      });

      it(`should return "Flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`Flag`);
      });
    });

    describe(`when the given flag is a Flag`, (): void => {
      beforeEach((): void => {
        messageFlag = `--Flag`;
      });

      it(`should return "Flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`Flag`);
      });
    });

    describe(`when the given flag is a flag with an empty value`, (): void => {
      beforeEach((): void => {
        messageFlag = `--Flag=`;
      });

      it(`should return "Flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`Flag`);
      });
    });

    describe(`when the given flag is a flag with a value`, (): void => {
      beforeEach((): void => {
        messageFlag = `--Flag=dummy`;
      });

      it(`should return "Flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`Flag`);
      });
    });
  });

  describe(`when the lower case option is enabled`, (): void => {
    beforeEach((): void => {
      toLowerCase = true;
    });

    describe(`when the given flag is empty`, (): void => {
      beforeEach((): void => {
        messageFlag = ``;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toBeNull();
      });
    });

    describe(`when the given flag is a shortcut flag`, (): void => {
      beforeEach((): void => {
        messageFlag = `-Flag`;
      });

      it(`should return "flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`flag`);
      });
    });

    describe(`when the given flag is a shortcut flag with an empty value`, (): void => {
      beforeEach((): void => {
        messageFlag = `-Flag=`;
      });

      it(`should return "flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`flag`);
      });
    });

    describe(`when the given flag is a shortcut flag with a value`, (): void => {
      beforeEach((): void => {
        messageFlag = `-Flag=dummy`;
      });

      it(`should return "flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`flag`);
      });
    });

    describe(`when the given flag is a flag`, (): void => {
      beforeEach((): void => {
        messageFlag = `--Flag`;
      });

      it(`should return "flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`flag`);
      });
    });

    describe(`when the given flag is a flag with an empty value`, (): void => {
      beforeEach((): void => {
        messageFlag = `--Flag=`;
      });

      it(`should return "flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`flag`);
      });
    });

    describe(`when the given flag is a flag with a value`, (): void => {
      beforeEach((): void => {
        messageFlag = `--Flag=dummy`;
      });

      it(`should return "flag"`, (): void => {
        expect.assertions(1);

        const result = discordCommandGetFlagName(messageFlag, toLowerCase);

        expect(result).toStrictEqual(`flag`);
      });
    });
  });
});
