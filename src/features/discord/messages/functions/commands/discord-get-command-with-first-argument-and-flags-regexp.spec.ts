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

      it(`should return a regexp`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\!)(?:)(help)(?:)(\s)(?:)(\w+)(?:)(\s)(?:)((-{1,2}\w+(\=\w+)?){1,})(?:)/gim
        );
      });

      describe(`when tested with "!help me --please"`, (): void => {
        beforeEach((): void => {
          message = `!help me --please`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`!`);
        });
      });
    });
  });
});
