import { createMock } from "ts-auto-mock";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IHasThisCommandData } from "../../interfaces/commands/has-this-command-data";
import { hasThisCommand } from "./has-this-command";

describe(`hasThisCommand()`, (): void => {
  let hasThisCommandData: IHasThisCommandData;

  beforeEach((): void => {
    hasThisCommandData = createMock<IHasThisCommandData>();
  });

  describe(`when the message is empty`, (): void => {
    beforeEach((): void => {
      hasThisCommandData.message = ``;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message without a command`, (): void => {
    beforeEach((): void => {
      hasThisCommandData.message = `simple message`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command but without a prefix`, (): void => {
    beforeEach((): void => {
      hasThisCommandData.message = `simple message with help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      hasThisCommandData.message = `simple message with !help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(true);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(true);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple upper case text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      hasThisCommandData.message = `SIMPLE MESSAGE WITH !HELP COMMAND`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(true);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(true);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        hasThisCommandData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          hasThisCommandData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = hasThisCommand(hasThisCommandData);

          expect(has).toStrictEqual(false);
        });
      });
    });
  });
});
