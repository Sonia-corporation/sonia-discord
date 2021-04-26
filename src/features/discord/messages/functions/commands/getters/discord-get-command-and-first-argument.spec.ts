import { discordGetCommandAndFirstArgument } from './discord-get-command-and-first-argument';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordGetCommandAndFirstArgumentData } from '../../../interfaces/commands/getters/discord-get-command-and-first-argument-data';
import { createHydratedMock } from 'ts-auto-mock';

describe(`discordGetCommandAndFirstArgument()`, (): void => {
  let data: IDiscordGetCommandAndFirstArgumentData;

  beforeEach((): void => {
    data = createHydratedMock<IDiscordGetCommandAndFirstArgumentData>();
  });

  describe(`when the given prefix is !`, (): void => {
    beforeEach((): void => {
      data.prefixes = `!`;
    });

    describe(`when the given command is feature`, (): void => {
      beforeEach((): void => {
        data.commands = DiscordMessageCommandEnum.FEATURE;
      });

      describe(`when the given message is empty`, (): void => {
        beforeEach((): void => {
          data.message = ``;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return !feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command and noon argument then with a prefix of $ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon with another $lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and noon argument then with a prefix of $ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon with another $feature other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command and noon argument then with a prefix of ! with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and noon argument then with a prefix of ! with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon with another !feature other command`;
        });

        it(`should return !feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and other argument then with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature other with another $feature noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and other argument then with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature other with another !feature noon command`;
        });

        it(`should return !feature other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature other`);
        });
      });
    });

    describe(`when the given commands are feature and cookie`, (): void => {
      beforeEach((): void => {
        data.commands = [DiscordMessageCommandEnum.FEATURE, DiscordMessageCommandEnum.COOKIE];
      });

      describe(`when the given message is empty`, (): void => {
        beforeEach((): void => {
          data.message = ``;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return !feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie noon`;
        });

        it(`should return !cookie noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!cookie noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command and noon argument then with a prefix of $ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon with another $lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and noon argument then with a prefix of $ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon with another $feature other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command and noon argument then with a prefix of $ with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie noon with another $cookie other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command and noon argument then with a prefix of ! with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and noon argument then with a prefix of ! with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon with another !feature other command`;
        });

        it(`should return !feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command and noon argument then with a prefix of ! with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie noon with another !cookie other command`;
        });

        it(`should return !cookie noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!cookie noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and other argument then with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature other with another $feature noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command and other argument then with a prefix of $ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie other with another $cookie noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and other argument then with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature other with another !feature noon command`;
        });

        it(`should return !feature other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature other`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command and other argument then with a prefix of ! with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie other with another !cookie noon command`;
        });

        it(`should return !cookie other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!cookie other`);
        });
      });
    });
  });

  describe(`when the given prefixes are ! and @`, (): void => {
    beforeEach((): void => {
      data.prefixes = [`!`, `@`];
    });

    describe(`when the given command is feature`, (): void => {
      beforeEach((): void => {
        data.commands = DiscordMessageCommandEnum.FEATURE;
      });

      describe(`when the given message is empty`, (): void => {
        beforeEach((): void => {
          data.message = ``;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return !feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature noon`;
        });

        it(`should return @feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`@feature noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command and noon argument then with a prefix of $ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon with another $lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and noon argument then with a prefix of $ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon with another $feature other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command and noon argument then with a prefix of ! with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the lunch command and noon argument then with a prefix of @ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch noon with another @lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command and noon argument then with a prefix of @ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature noon with another @feature other command`;
        });

        it(`should return @feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`@feature noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and other argument then with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature other with another $feature noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command and other argument then with a prefix of @ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature other with another @feature noon command`;
        });

        it(`should return @feature other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`@feature other`);
        });
      });
    });

    describe(`when the given commands are feature and cookie`, (): void => {
      beforeEach((): void => {
        data.commands = [DiscordMessageCommandEnum.FEATURE, DiscordMessageCommandEnum.COOKIE];
      });

      describe(`when the given message is empty`, (): void => {
        beforeEach((): void => {
          data.message = ``;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return !feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie noon`;
        });

        it(`should return !cookie noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!cookie noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature noon`;
        });

        it(`should return @feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`@feature noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie noon`;
        });

        it(`should return @cookie noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`@cookie noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command and noon argument then with a prefix of $ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon with another $lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and noon argument then with a prefix of $ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon with another $feature other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command and noon argument then with a prefix of $ with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie noon with another $cookie other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command and noon argument then with a prefix of ! with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and noon argument then with a prefix of ! with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon with another !feature other command`;
        });

        it(`should return !feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command and noon argument then with a prefix of ! with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie noon with another !cookie other command`;
        });

        it(`should return !cookie noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!cookie noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the lunch command and noon argument then with a prefix of @ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch noon with another @lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command and noon argument then with a prefix of @ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature noon with another @feature other command`;
        });

        it(`should return @feature noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`@feature noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the cookie command and noon argument then with a prefix of @ with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie noon with another @cookie other command`;
        });

        it(`should return @cookie noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`@cookie noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and other argument then with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature other with another $feature noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command and other argument then with a prefix of $ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie other with another $cookie noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and other argument then with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature other with another !feature noon command`;
        });

        it(`should return !feature other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!feature other`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command and other argument then with a prefix of ! with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie other with another !cookie noon command`;
        });

        it(`should return !cookie other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`!cookie other`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command and other argument then with a prefix of @ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature other with another @feature noon command`;
        });

        it(`should return @feature other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`@feature other`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the cookie command and other argument then with a prefix of @ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie other with another @cookie noon command`;
        });

        it(`should return other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndFirstArgument(data);

          expect(result).toStrictEqual(`@cookie other`);
        });
      });
    });
  });
});
