import { createMock } from "ts-auto-mock";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IStrictlyContainsThisCommandWithPrefixData } from "../../interfaces/commands/strictly-contains-this-command-with-prefix-data";
import { strictlyContainsThisCommandWithPrefix } from "./strictly-contains-this-command-with-prefix";

describe(`strictlyContainsThisCommandWithPrefix()`, (): void => {
  let strictlyContainsThisCommandWithPrefixData: IStrictlyContainsThisCommandWithPrefixData;

  beforeEach((): void => {
    strictlyContainsThisCommandWithPrefixData = createMock<
      IStrictlyContainsThisCommandWithPrefixData
    >();
  });

  describe(`when the message is empty`, (): void => {
    beforeEach((): void => {
      strictlyContainsThisCommandWithPrefixData.message = ``;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message without a command`, (): void => {
    beforeEach((): void => {
      strictlyContainsThisCommandWithPrefixData.message = `simple message`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command but without a prefix`, (): void => {
    beforeEach((): void => {
      strictlyContainsThisCommandWithPrefixData.message = `simple message with help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      strictlyContainsThisCommandWithPrefixData.message = `simple message with !help command`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });

  describe(`when the message is a simple upper case text message with a "help" command and with a "!" prefix`, (): void => {
    beforeEach((): void => {
      strictlyContainsThisCommandWithPrefixData.message = `SIMPLE MESSAGE WITH !HELP COMMAND`;
    });

    describe(`when the command is help`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.HELP;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(true);
        });
      });
    });

    describe(`when the command is bug`, (): void => {
      beforeEach((): void => {
        strictlyContainsThisCommandWithPrefixData.command =
          DiscordMessageCommandEnum.BUG;
      });

      describe(`when the prefix is $`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `$`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });

      describe(`when the prefix is !`, (): void => {
        beforeEach((): void => {
          strictlyContainsThisCommandWithPrefixData.prefix = `!`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const has = strictlyContainsThisCommandWithPrefix(
            strictlyContainsThisCommandWithPrefixData
          );

          expect(has).toStrictEqual(false);
        });
      });
    });
  });
});
