import { discordGetCommandWithFirstArgumentRegexp } from './discord-get-command-with-first-argument-regexp';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordGetCommandWithFirstArgumentRegexpData } from '../../../interfaces/commands/getters/discord-get-command-with-first-argument-regexp-data';
import { createHydratedMock } from 'ts-auto-mock';
import xregexp from 'xregexp';

describe(`discordGetCommandWithFirstArgumentRegexp()`, (): void => {
  let data: IDiscordGetCommandWithFirstArgumentRegexpData;
  let message: string;

  beforeEach((): void => {
    data = createHydratedMock<IDiscordGetCommandWithFirstArgumentRegexpData>();
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

        const result = discordGetCommandWithFirstArgumentRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\!)(?:)(help)(?:)(\s)(?:)(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(?:)/gim
        );
      });

      describe(`when tested with "!help me"`, (): void => {
        beforeEach((): void => {
          message = `!help me`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`!`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`me`);
        });
      });

      describe(`when tested with "!help me-in-kebab"`, (): void => {
        beforeEach((): void => {
          message = `!help me-in-kebab`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`!`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "me-in-kebab" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`me-in-kebab`);
        });
      });

      describe(`when tested with "!help"`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help "`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!feature noon"`, (): void => {
        beforeEach((): void => {
          message = `!feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-help me"`, (): void => {
        beforeEach((): void => {
          message = `-help me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

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

        const result = discordGetCommandWithFirstArgumentRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\!)(?:)(cookie)(?:)(\s)(?:)(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(?:)/gim
        );
      });

      describe(`when tested with "!cookie miam"`, (): void => {
        beforeEach((): void => {
          message = `!cookie miam`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`!`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`cookie`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "miam" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`miam`);
        });
      });

      describe(`when tested with "!cookie miam-in-kebab"`, (): void => {
        beforeEach((): void => {
          message = `!cookie miam-in-kebab`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`!`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`cookie`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "miam-in-kebab" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`miam-in-kebab`);
        });
      });

      describe(`when tested with "!cookie"`, (): void => {
        beforeEach((): void => {
          message = `!cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!cookie "`, (): void => {
        beforeEach((): void => {
          message = `!cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!feature noon"`, (): void => {
        beforeEach((): void => {
          message = `!feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-cookie me"`, (): void => {
        beforeEach((): void => {
          message = `-cookie me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

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

        const result = discordGetCommandWithFirstArgumentRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\-)(?:)(help)(?:)(\s)(?:)(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(?:)/gim
        );
      });

      describe(`when tested with "-help me"`, (): void => {
        beforeEach((): void => {
          message = `-help me`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`-`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`me`);
        });
      });

      describe(`when tested with "-help me-in-kebab"`, (): void => {
        beforeEach((): void => {
          message = `-help me-in-kebab`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`-`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "me-in-kebab" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`me-in-kebab`);
        });
      });

      describe(`when tested with "-help"`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-help "`, (): void => {
        beforeEach((): void => {
          message = `-help`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-feature noon"`, (): void => {
        beforeEach((): void => {
          message = `-feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me"`, (): void => {
        beforeEach((): void => {
          message = `!help me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

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

        const result = discordGetCommandWithFirstArgumentRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\-)(?:)(cookie)(?:)(\s)(?:)(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(?:)/gim
        );
      });

      describe(`when tested with "-cookie miam"`, (): void => {
        beforeEach((): void => {
          message = `-cookie miam`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`-`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`cookie`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "miam" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`miam`);
        });
      });

      describe(`when tested with "-cookie miam --arg1 --arg2=value2"`, (): void => {
        beforeEach((): void => {
          message = `-cookie miam --arg1 --arg2=value2`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`-`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`cookie`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "miam" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`miam`);
        });
      });

      describe(`when tested with "-cookie miam-in-kebab --arg1 --arg2=value2"`, (): void => {
        beforeEach((): void => {
          message = `-cookie miam-in-kebab --arg1 --arg2=value2`;
        });

        it(`should find "-" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`-`);
        });

        it(`should find "cookie" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`cookie`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "miam-in-kebab" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`miam-in-kebab`);
        });
      });

      describe(`when tested with "-cookie"`, (): void => {
        beforeEach((): void => {
          message = `-cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-cookie "`, (): void => {
        beforeEach((): void => {
          message = `-cookie`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "-feature noon"`, (): void => {
        beforeEach((): void => {
          message = `-feature noon`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!cookie me"`, (): void => {
        beforeEach((): void => {
          message = `!cookie me`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });
    });
  });
});
