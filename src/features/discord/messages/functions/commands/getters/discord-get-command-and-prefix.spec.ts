import { discordGetCommandAndPrefix } from './discord-get-command-and-prefix';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordGetCommandAndPrefixData } from '../../../interfaces/commands/getters/discord-get-command-and-prefix-data';
import { createHydratedMock } from 'ts-auto-mock';

describe(`discordGetCommandAndPrefix()`, (): void => {
  let data: IDiscordGetCommandAndPrefixData;

  beforeEach((): void => {
    data = createHydratedMock<IDiscordGetCommandAndPrefixData>();
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

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return !feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!feature`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command then with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch with another $lunch command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command then with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature with another $feature command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command then with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command then with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature noon with another !feature other command`;
        });

        it(`should return !feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!feature`);
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

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return !feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!feature`);
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie`;
        });

        it(`should return !cookie`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!cookie`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command then with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch with another $lunch command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command then with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature with another $feature command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command then with a prefix of $ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie noon with another $cookie other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command then with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command then with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature with another !feature command`;
        });

        it(`should return !feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!feature`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command then with a prefix of ! with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie with another !cookie command`;
        });

        it(`should return !cookie`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!cookie`);
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

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return !feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!feature`);
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature`;
        });

        it(`should return @feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`@feature`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command then with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch with another $lunch command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command then with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature with another $feature command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command then with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch noon with another !lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the lunch command then with a prefix of @ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch noon with another @lunch other command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command then with a prefix of @ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature noon with another @feature other command`;
        });

        it(`should return @feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`@feature`);
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

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message`, (): void => {
        beforeEach((): void => {
          data.message = `simple message`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of !`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of $ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature`;
        });

        it(`should return !feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!feature`);
        });
      });

      describe(`when the given message is a simple message with a prefix of ! with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie`;
        });

        it(`should return !cookie`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!cookie`);
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature`;
        });

        it(`should return @feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`@feature`);
        });
      });

      describe(`when the given message is a simple message with a prefix of @ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie`;
        });

        it(`should return @cookie`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`@cookie`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the lunch command then with a prefix of $ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $lunch with another $lunch command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the feature command then with a prefix of $ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $feature with another $feature command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of $ with the cookie command then with a prefix of $ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message $cookie with another $cookie command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the lunch command then with a prefix of ! with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !lunch with another !lunch command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the feature command then with a prefix of ! with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !feature with another !feature command`;
        });

        it(`should return !feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!feature`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of ! with the cookie command then with a prefix of ! with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message !cookie with another !cookie command`;
        });

        it(`should return !cookie`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`!cookie`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the lunch command then with a prefix of @ with the lunch command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @lunch with another @lunch command`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the feature command then with a prefix of @ with the feature command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @feature with another @feature command`;
        });

        it(`should return @feature`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`@feature`);
        });
      });

      describe(`when the given message is a multiple command message with a prefix of @ with the cookie command then with a prefix of @ with the cookie command`, (): void => {
        beforeEach((): void => {
          data.message = `simple message @cookie with another @cookie command`;
        });

        it(`should return @cookie`, (): void => {
          expect.assertions(1);

          const result = discordGetCommandAndPrefix(data);

          expect(result).toStrictEqual(`@cookie`);
        });
      });
    });
  });
});
