import { createMock } from "ts-auto-mock";
import xregexp from "xregexp";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCompleteCommandRegexp } from "../../interfaces/commands/discord-get-complete-command-regexp";
import { discordGetCompleteCommandRegexp } from "./discord-get-complete-command-regexp";

describe(`discordGetCompleteCommandRegexp()`, (): void => {
  let data: IDiscordGetCompleteCommandRegexp;
  let message: string;

  beforeEach((): void => {
    data = createMock<IDiscordGetCompleteCommandRegexp>();
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

        const result = discordGetCompleteCommandRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\!)(?:)(help)(?:)(\s)(?:)(\S+)(?:)(-{1,2}\w+(\=\w+\s?|\s?)){0,}(?:)/gim
        );
      });

      describe(`when tested with "!help me"`, (): void => {
        beforeEach((): void => {
          message = `!help me`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`!`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.argument1).toStrictEqual(`me`);
        });
      });

      describe(`when tested with "!help"`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help "`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!feature noon"`, (): void => {
        beforeEach((): void => {
          message = `!feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-help me"`, (): void => {
        beforeEach((): void => {
          message = `-help me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

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

        const result = discordGetCompleteCommandRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\!)(?:)(cookie)(?:)(\s)(?:)(\S+)(?:)(-{1,2}\w+(\=\w+\s?|\s?)){0,}(?:)/gim
        );
      });

      describe(`when tested with "!cookie miam"`, (): void => {
        beforeEach((): void => {
          message = `!cookie miam`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`!`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.command).toStrictEqual(
            `cookie`
          );
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.separator).toStrictEqual(` `);
        });

        it(`should find "miam" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

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

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!cookie "`, (): void => {
        beforeEach((): void => {
          message = `!cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!feature noon"`, (): void => {
        beforeEach((): void => {
          message = `!feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-cookie me"`, (): void => {
        beforeEach((): void => {
          message = `-cookie me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

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

        const result = discordGetCompleteCommandRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\-)(?:)(help)(?:)(\s)(?:)(\S+)(?:)(-{1,2}\w+(\=\w+\s?|\s?)){0,}(?:)/gim
        );
      });

      describe(`when tested with "-help me"`, (): void => {
        beforeEach((): void => {
          message = `-help me`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`-`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.argument1).toStrictEqual(`me`);
        });
      });

      describe(`when tested with "-help"`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-help "`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-feature noon"`, (): void => {
        beforeEach((): void => {
          message = `-feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me"`, (): void => {
        beforeEach((): void => {
          message = `!help me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

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

        const result = discordGetCompleteCommandRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\-)(?:)(cookie)(?:)(\s)(?:)(\S+)(?:)(-{1,2}\w+(\=\w+\s?|\s?)){0,}(?:)/gim
        );
      });

      describe(`when tested with "-cookie miam"`, (): void => {
        beforeEach((): void => {
          message = `-cookie miam`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.prefix).toStrictEqual(`-`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.command).toStrictEqual(
            `cookie`
          );
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.separator).toStrictEqual(` `);
        });

        it(`should find "miam" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)?.argument1).toStrictEqual(
            `miam`
          );
        });
      });

      describe(`when tested with "-cookie"`, (): void => {
        beforeEach((): void => {
          message = `-cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-cookie "`, (): void => {
        beforeEach((): void => {
          message = `-cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-feature noon"`, (): void => {
        beforeEach((): void => {
          message = `-feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!cookie me"`, (): void => {
        beforeEach((): void => {
          message = `!cookie me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCompleteCommandRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });
    });
  });
});
