import { createMock } from "ts-auto-mock";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IContainsThisCommandWithOneOfThesePrefixesData } from "../../interfaces/commands/contains-this-command-with-one-of-these-prefixes-data";
import { containsThisCommandWithOneOfThesePrefixes } from "./contains-this-command-with-one-of-these-prefixes";

describe(`containsThisCommandWithOneOfThesePrefixes()`, (): void => {
  let containsThisCommandWithOneOfThesePrefixesData: IContainsThisCommandWithOneOfThesePrefixesData;

  beforeEach((): void => {
    containsThisCommandWithOneOfThesePrefixesData = createMock<
      IContainsThisCommandWithOneOfThesePrefixesData
    >();
  });

  describe(`when the message is empty`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithOneOfThesePrefixesData.message = ``;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message without a command`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithOneOfThesePrefixesData.message = `simple message`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command but without a prefix`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithOneOfThesePrefixesData.message = `simple message with help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithOneOfThesePrefixesData.message = `simple message with !help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(true);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(true);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple upper case text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      containsThisCommandWithOneOfThesePrefixesData.message = `SIMPLE MESSAGE WITH !HELP COMMAND`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(true);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is help and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.HELP,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(true);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug and cookie`, (): void => {
      beforeEach((): void => {
        containsThisCommandWithOneOfThesePrefixesData.commands = [
          DiscordMessageCommandEnum.BUG,
          DiscordMessageCommandEnum.COOKIE,
        ];
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is $ and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`$`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is ! and _`, (): void => {
        beforeEach((): void => {
          containsThisCommandWithOneOfThesePrefixesData.prefixes = [`!`, `_`];
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = containsThisCommandWithOneOfThesePrefixes(
            containsThisCommandWithOneOfThesePrefixesData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });
});
