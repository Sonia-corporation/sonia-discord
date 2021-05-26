import { discordGetCommandFirstArgument } from './discord-get-command-first-argument';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordGetCommandFirstArgumentData } from '../../../interfaces/commands/getters/discord-get-command-first-argument-data';
import { createHydratedMock } from 'ts-auto-mock';

describe(`discordGetCommandFirstArgument()`, (): void => {
  let data: IDiscordGetCommandFirstArgumentData;

  beforeEach((): void => {
    data = createHydratedMock<IDiscordGetCommandFirstArgumentData>();
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

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command and noon argument then with a prefix of $ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon with another $lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and noon argument then with a prefix of $ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon with another $feature other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command and noon argument then with a prefix of ! with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and noon argument then with a prefix of ! with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon with another !feature other command`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and other argument then with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature other with another $feature noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and other argument then with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature other with another !feature noon command`;
        });

        it(`should return other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`other`);
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

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie noon`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command and noon argument then with a prefix of $ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon with another $lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and noon argument then with a prefix of $ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon with another $feature other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command and noon argument then with a prefix of $ with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie noon with another $cookie other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command and noon argument then with a prefix of ! with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and noon argument then with a prefix of ! with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon with another !feature other command`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command and noon argument then with a prefix of ! with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie noon with another !cookie other command`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and other argument then with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature other with another $feature noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command and other argument then with a prefix of $ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie other with another $cookie noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and other argument then with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature other with another !feature noon command`;
        });

        it(`should return other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`other`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command and other argument then with a prefix of ! with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie other with another !cookie noon command`;
        });

        it(`should return other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`other`);
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

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature noon`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command and noon argument then with a prefix of $ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon with another $lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and noon argument then with a prefix of $ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon with another $feature other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command and noon argument then with a prefix of ! with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the lunch command and noon argument then with a prefix of @ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch noon with another @lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command and noon argument then with a prefix of @ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature noon with another @feature other command`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and other argument then with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature other with another $feature noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command and other argument then with a prefix of @ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature other with another @feature noon command`;
        });

        it(`should return other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`other`);
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

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie noon`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch noon`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature noon`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie noon`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command and noon argument then with a prefix of $ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch noon with another $lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and noon argument then with a prefix of $ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature noon with another $feature other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command and noon argument then with a prefix of $ with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie noon with another $cookie other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command and noon argument then with a prefix of ! with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and noon argument then with a prefix of ! with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon with another !feature other command`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command and noon argument then with a prefix of ! with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie noon with another !cookie other command`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the lunch command and noon argument then with a prefix of @ with the lunch command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch noon with another @lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command and noon argument then with a prefix of @ with the feature command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature noon with another @feature other command`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the cookie command and noon argument then with a prefix of @ with the cookie command and other argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie noon with another @cookie other command`;
        });

        it(`should return noon`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`noon`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command and other argument then with a prefix of $ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature other with another $feature noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command and other argument then with a prefix of $ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie other with another $cookie noon command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command and other argument then with a prefix of ! with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature other with another !feature noon command`;
        });

        it(`should return other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`other`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command and other argument then with a prefix of ! with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie other with another !cookie noon command`;
        });

        it(`should return other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`other`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command and other argument then with a prefix of @ with the feature command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature other with another @feature noon command`;
        });

        it(`should return other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`other`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the cookie command and other argument then with a prefix of @ with the cookie command and noon argument`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie other with another @cookie noon command`;
        });

        it(`should return other`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandFirstArgument(data);

          expect(result).toStrictEqual(`other`);
        });
      });
    });
  });
});
