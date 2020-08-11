import { createMock } from "ts-auto-mock";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IContainsThisCommandWithPrefixData } from "../../interfaces/commands/contains-this-command-with-prefix-data";
import { containsThisCommandWithPrefix } from "./contains-this-command-with-prefix";

describe(`containsThisCommandWithPrefix()`, (): void => {
  let containsThisCommandWithPrefixData: IContainsThisCommandWithPrefixData;

  beforeEach((): void => {
    containsThisCommandWithPrefixData = createMock<
      IContainsThisCommandWithPrefixData
    >();
  });

  describe(`when the message is empty`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithPrefixData.message = ``;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message without a command`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithPrefixData.message = `simple message`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command but without a prefix`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithPrefixData.message = `simple message with help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithPrefixData.message = `simple message with !help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple upper case text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithPrefixData.message = `SIMPLE MESSAGE WITH !HELP COMMAND`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithPrefixData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithPrefix(
            containsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });
});
