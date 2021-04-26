import { discordGetCommandWithFirstArgumentAndFlagsRegexp } from './discord-get-command-with-first-argument-and-flags-regexp';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData } from '../../../interfaces/commands/getters/discord-get-command-with-first-argument-and-flags-regexp-data';
import { createHydratedMock } from 'ts-auto-mock';
import xregexp from 'xregexp';

describe(`discordGetCommandWithFirstArgumentAndFlagsRegexp()`, (): void => {
  let data: IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData;
  let message: string;

  beforeEach((): void => {
    data = createHydratedMock<IDiscordGetCommandWithFirstArgumentAndFlagsRegexpData>();
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
          /(\!)(?:)(help)(?:)(\s)(?:)(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(?:)(\s)(?:)((-{1,2}\w+(\=\w+)?\s){0,}(-{1,2}\w+(\=\w+)?){1})(?:)/gim
        );
      });

      describe(`when tested with an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!"`, (): void => {
        beforeEach((): void => {
          message = `!`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
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

      describe(`when tested with "!help me "`, (): void => {
        beforeEach((): void => {
          message = `!help me `;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -"`, (): void => {
        beforeEach((): void => {
          message = `!help me -`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1"`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`!`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`me`);
        });

        it(`should find " " as flags separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flagsSeparator).toStrictEqual(` `);
        });

        it(`should find "-arg1" as flags`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flags).toStrictEqual(`-arg1`);
        });
      });

      describe(`when tested with "!help me-in-kebab -arg1"`, (): void => {
        beforeEach((): void => {
          message = `!help me-in-kebab -arg1`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`!`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "me-in-kebab" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`me-in-kebab`);
        });

        it(`should find " " as flags separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flagsSeparator).toStrictEqual(` `);
        });

        it(`should find "-arg1" as flags`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flags).toStrictEqual(`-arg1`);
        });
      });

      describe(`when tested with "!help me --arg1=value1"`, (): void => {
        beforeEach((): void => {
          message = `!help me --arg1=value1`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`!`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`me`);
        });

        it(`should find " " as flags separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flagsSeparator).toStrictEqual(` `);
        });

        it(`should find "--arg1=value1" as flags`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flags).toStrictEqual(`--arg1=value1`);
        });
      });

      describe(`when tested with "!help me -arg1 --arg2=value2"`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1 --arg2=value2`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`!`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`me`);
        });

        it(`should find " " as flags separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flagsSeparator).toStrictEqual(` `);
        });

        it(`should find "-arg1 --arg2=value2" as flags`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flags).toStrictEqual(`-arg1 --arg2=value2`);
        });
      });

      describe(`when tested with "!help me --enabled=true -e --enabled=false"`, (): void => {
        beforeEach((): void => {
          message = `!help me --enabled=true -e --enabled=false`;
        });

        it(`should find "!" as prefix`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.prefix).toStrictEqual(`!`);
        });

        it(`should find "help" as command`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.command).toStrictEqual(`help`);
        });

        it(`should find " " as separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.separator).toStrictEqual(` `);
        });

        it(`should find "me" as argument 1`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.argument1).toStrictEqual(`me`);
        });

        it(`should find " " as flags separator`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flagsSeparator).toStrictEqual(` `);
        });

        it(`should find "--enabled=true -e --enabled=false" as flags`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)?.groups?.flags).toStrictEqual(`--enabled=true -e --enabled=false`);
        });
      });
    });

    describe(`when the given command is feature`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.FEATURE;
      });

      it(`should return a regexp to find the !help command content`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\!)(?:)(feature)(?:)(\s)(?:)(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(?:)(\s)(?:)((-{1,2}\w+(\=\w+)?\s){0,}(-{1,2}\w+(\=\w+)?){1})(?:)/gim
        );
      });

      describe(`when tested with an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!"`, (): void => {
        beforeEach((): void => {
          message = `!`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
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

      describe(`when tested with "!help me "`, (): void => {
        beforeEach((): void => {
          message = `!help me `;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -"`, (): void => {
        beforeEach((): void => {
          message = `!help me -`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1"`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me --arg1=value1"`, (): void => {
        beforeEach((): void => {
          message = `!help me --arg1=value1`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1 --arg2=value2"`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1 --arg2=value2`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1 --arg2=value2 "`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1 --arg2=value2 `;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me --enabled=true -e --enabled=false"`, (): void => {
        beforeEach((): void => {
          message = `!help me --enabled=true -e --enabled=false`;
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

      it(`should return a regexp to find the !help command content`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\-)(?:)(help)(?:)(\s)(?:)(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(?:)(\s)(?:)((-{1,2}\w+(\=\w+)?\s){0,}(-{1,2}\w+(\=\w+)?){1})(?:)/gim
        );
      });

      describe(`when tested with an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!"`, (): void => {
        beforeEach((): void => {
          message = `!`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
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

      describe(`when tested with "!help me "`, (): void => {
        beforeEach((): void => {
          message = `!help me `;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -"`, (): void => {
        beforeEach((): void => {
          message = `!help me -`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1"`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me --arg1=value1"`, (): void => {
        beforeEach((): void => {
          message = `!help me --arg1=value1`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1 --arg2=value2"`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1 --arg2=value2`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1 --arg2=value2 "`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1 --arg2=value2 `;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me --enabled=true -e --enabled=false"`, (): void => {
        beforeEach((): void => {
          message = `!help me --enabled=true -e --enabled=false`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });
    });

    describe(`when the given command is feature`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.FEATURE;
      });

      it(`should return a regexp to find the !help command content`, (): void => {
        expect.assertions(1);

        const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

        expect(result).toStrictEqual(
          // eslint-disable-next-line no-useless-escape
          /(\-)(?:)(feature)(?:)(\s)(?:)(([a-z][a-z0-9]*)(-[a-z0-9]+)*)(?:)(\s)(?:)((-{1,2}\w+(\=\w+)?\s){0,}(-{1,2}\w+(\=\w+)?){1})(?:)/gim
        );
      });

      describe(`when tested with an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!"`, (): void => {
        beforeEach((): void => {
          message = `!`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
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

      describe(`when tested with "!help me "`, (): void => {
        beforeEach((): void => {
          message = `!help me `;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -"`, (): void => {
        beforeEach((): void => {
          message = `!help me -`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1"`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me --arg1=value1"`, (): void => {
        beforeEach((): void => {
          message = `!help me --arg1=value1`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1 --arg2=value2"`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1 --arg2=value2`;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me -arg1 --arg2=value2 "`, (): void => {
        beforeEach((): void => {
          message = `!help me -arg1 --arg2=value2 `;
        });

        it(`should find nothing`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandWithFirstArgumentAndFlagsRegexp(data);

          expect(xregexp.exec(message, result)).toBeNull();
        });
      });

      describe(`when tested with "!help me --enabled=true -e --enabled=false"`, (): void => {
        beforeEach((): void => {
          message = `!help me --enabled=true -e --enabled=false`;
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
