import { discordGetCommandWithPrefix } from './discord-get-command-with-prefix';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordGetCommandWithPrefix } from '../../../interfaces/commands/getters/discord-get-command-with-prefix';
import { createHydratedMock } from 'ts-auto-mock';

describe(`discordGetCommandWithPrefix()`, (): void => {
  let data: IDiscordGetCommandWithPrefix;

  beforeEach((): void => {
    data = createHydratedMock<IDiscordGetCommandWithPrefix>();
  });

  describe(`when the given prefix is $`, (): void => {
    beforeEach((): void => {
      data.prefix = `$`;
    });

    describe(`when the given command is cookie`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.COOKIE;
      });

      it(`should return a Discord command cookie with a $ prefix`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithPrefix(data);

        expect(result).toStrictEqual(`$cookie`);
      });
    });

    describe(`when the given command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      it(`should return a Discord command help with a $ prefix`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithPrefix(data);

        expect(result).toStrictEqual(`$help`);
      });
    });
  });

  describe(`when the given prefix is !`, (): void => {
    beforeEach((): void => {
      data.prefix = `!`;
    });

    describe(`when the given command is cookie`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.COOKIE;
      });

      it(`should return a Discord command cookie with a ! prefix`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithPrefix(data);

        expect(result).toStrictEqual(`!cookie`);
      });
    });

    describe(`when the given command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      it(`should return a Discord command help with a ! prefix`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithPrefix(data);

        expect(result).toStrictEqual(`!help`);
      });
    });
  });

  describe(`when the given prefix is YOLO`, (): void => {
    beforeEach((): void => {
      data.prefix = `YOLO`;
    });

    describe(`when the given command is cookie`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.COOKIE;
      });

      it(`should return a Discord command cookie with a yolo prefix`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithPrefix(data);

        expect(result).toStrictEqual(`yolocookie`);
      });
    });

    describe(`when the given command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      it(`should return a Discord command help with a yolo prefix`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithPrefix(data);

        expect(result).toStrictEqual(`yolohelp`);
      });
    });
  });
});
