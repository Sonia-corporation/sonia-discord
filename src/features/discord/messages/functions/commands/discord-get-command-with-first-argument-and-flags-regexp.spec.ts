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
          /(\!)(?:)(help)(?:)(\s)(?:)(\w+)(?:)((\s){0,1})(?:)((-{1,2}\w+(\=\w+\s?|\s?)){0,})(?:)/gim
        );
      });

      describe(`when tested with "!help me"`, (): void => {
        beforeEach((): void => {
          message = `!help me`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`!`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.argument1).toStrictEqual(`me`);
        });
      });

      describe(`when tested with "!help"`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help "`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!feature noon"`, (): void => {
        beforeEach((): void => {
          message = `!feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-help me"`, (): void => {
        beforeEach((): void => {
          message = `-help me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });
    });

    describe(`when the given command is cookie`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.COOKIE;
      });

      it(`should return a regexp`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\!)(?:)(cookie)(?:)(\s)(?:)(\w+)(?:)((\s){0,1})(?:)((-{1,2}\w+(\=\w+\s?|\s?)){0,})(?:)/gim
        );
      });

      describe(`when tested with "!cookie miam"`, (): void => {
        beforeEach((): void => {
          message = `!cookie miam`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`!`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.command).toStrictEqual(
            `cookie`
          );
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.separator).toStrictEqual(` `);
        });

        it(`should find "miam" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.argument1).toStrictEqual(
            `miam`
          );
        });
      });

      describe(`when tested with "!cookie"`, (): void => {
        beforeEach((): void => {
          message = `!cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!cookie "`, (): void => {
        beforeEach((): void => {
          message = `!cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!feature noon"`, (): void => {
        beforeEach((): void => {
          message = `!feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-cookie me"`, (): void => {
        beforeEach((): void => {
          message = `-cookie me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });
    });
  });

  describe(`when the given prefix is -`, (): void => {
    beforeEach((): void => {
      data.prefix = `-`;
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
          /(\-)(?:)(help)(?:)(\s)(?:)(\w+)(?:)((\s){0,1})(?:)((-{1,2}\w+(\=\w+\s?|\s?)){0,})(?:)/gim
        );
      });

      describe(`when tested with "-help me"`, (): void => {
        beforeEach((): void => {
          message = `-help me`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`-`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.argument1).toStrictEqual(`me`);
        });
      });

      describe(`when tested with "-help"`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-help "`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-feature noon"`, (): void => {
        beforeEach((): void => {
          message = `-feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me"`, (): void => {
        beforeEach((): void => {
          message = `!help me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });
    });

    describe(`when the given command is cookie`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.COOKIE;
      });

      it(`should return a regexp`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\-)(?:)(cookie)(?:)(\s)(?:)(\w+)(?:)((\s){0,1})(?:)((-{1,2}\w+(\=\w+\s?|\s?)){0,})(?:)/gim
        );
      });

      describe(`when tested with "-cookie miam"`, (): void => {
        beforeEach((): void => {
          message = `-cookie miam`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`-`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.command).toStrictEqual(
            `cookie`
          );
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.separator).toStrictEqual(` `);
        });

        it(`should find "miam" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.argument1).toStrictEqual(
            `miam`
          );
        });
      });

      describe(`when tested with "-cookie miam --arg1 --arg2=value2"`, (): void => {
        beforeEach((): void => {
          message = `-cookie miam --arg1 --arg2=value2`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`-`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.command).toStrictEqual(
            `cookie`
          );
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.separator).toStrictEqual(` `);
        });

        it(`should find "miam" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.argument1).toStrictEqual(
            `miam`
          );
        });

        it(`should find "--arg1 --arg2=value2" as flags`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.flags).toStrictEqual(
            `--arg1 --arg2=value2`
          );
        });
      });

      describe(`when tested with "-cookie"`, (): void => {
        beforeEach((): void => {
          message = `-cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-cookie "`, (): void => {
        beforeEach((): void => {
          message = `-cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-feature noon"`, (): void => {
        beforeEach((): void => {
          message = `-feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!cookie me"`, (): void => {
        beforeEach((): void => {
          message = `!cookie me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });
    });
  });
});
