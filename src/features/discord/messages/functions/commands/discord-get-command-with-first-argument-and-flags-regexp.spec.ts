import { createMock } from "ts-auto-mock";
import xregexp from "xregexp";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData } from "../../interfaces/commands/discord-get-command-with-first-argument-and-flags-regexp-data";
import { discordGetCommandWithFirstArgumentAndFlagsRegexp } from "./discord-get-command-with-first-argument-and-flags-regexp";

describe(`discordGetCommandWithFirstArgumentAndFlagsRegexp()`, (): void => {
  let data: IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData;
  let message: string;

  beforeEach((): void => {
    data = createMock<IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData>();
  });

  describe(`when the given prefix is !`, (): void => {
    beforeEach((): void => {
      data.prefix = `!`;
    });

    describe(`when the given command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      it(`should return a regexp to find the !help command content`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\!)(?:)(help)(?:)(\s)(?:)(\w+)(?:)(\s)(?:)((-{1,2}\w+(\=\w+)?\s?)+)(?:)/gim
        );
      });

      describe(`when tested with "!help me -arg1 --arg2=value2"`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1 --arg2=value2`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(
            `!`
          );
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(
            `help`
          );
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(
            xregexp.exec(message, result)?.groups?.separator
          ).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(
            xregexp.exec(message, result)?.groups?.argument1
          ).toStrictEqual(`me`);
        });

        it(`should find " " as flags separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(
            xregexp.exec(message, result)?.groups?.flagsSeparator
          ).toStrictEqual(` `);
        });

        it(`should find "-arg1 --arg2=value2" as flags`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flags).toStrictEqual(
            `-arg1 --arg2=value2`
          );
        });
      });
    });
  });
});
