import { discordGetThisCommandWithPrefix } from './discord-get-this-command-with-prefix';
import { DiscordMessageCommandEnum } from '../../../enums/commands/discord-message-command.enum';
import { IDiscordGetThisCommandWithPrefixData } from '../../../interfaces/commands/getters/discord-get-this-command-with-prefix-data';
import { createHydratedMock } from 'ts-auto-mock';

describe(`discordGetThisCommandWithPrefix()`, (): void => {
  let data: IDiscordGetThisCommandWithPrefixData;

  beforeEach((): void => {
    data = createHydratedMock<IDiscordGetThisCommandWithPrefixData>();
  });

  describe(`when the message is empty`, (): void => {
    beforeEach((): void => {
      data.message = ``;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });
    });
  });

  describe(`when the message is a simple text message without a command`, (): void => {
    beforeEach((): void => {
      data.message = `simple message`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command but without a prefix`, (): void => {
    beforeEach((): void => {
      data.message = `simple message with help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      data.message = `simple message with !help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toStrictEqual(`!help`);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });
    });
  });

  describe(`when the message is a simple upper case text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      data.message = `SIMPLE MESSAGE WITH !HELP COMMAND`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toStrictEqual(`!HELP`);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        data.command = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          data.prefix = `$`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          data.prefix = `!`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordGetThisCommandWithPrefix(data);

          expect(result).toBeNull();
        });
      });
    });
  });
});
