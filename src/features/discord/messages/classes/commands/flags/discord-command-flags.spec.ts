import { createMock } from "ts-auto-mock";
import { ILoggerLog } from "../../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { IDiscordCommandFlag } from "../../../interfaces/commands/flags/discord-command-flag";
import { IDiscordCommandFlagSuccess } from "../../../interfaces/commands/flags/discord-command-flag-success";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON } from "../../../services/command/feature/constants/discord-message-command-feature-name-noon";
import { DiscordMessageCommandFeatureNoonFlagEnum } from "../../../services/command/feature/features/noon/enums/discord-message-command-feature-noon-flag.enum";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { IDiscordCommandFlagsErrors } from "../../../types/commands/flags/discord-command-flags-errors";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
import { DiscordCommandBooleanFlag } from "./discord-command-boolean-flag";
import { DiscordCommandFlags } from "./discord-command-flags";

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordCommandFlags`, (): void => {
  let discordCommandFlags: DiscordCommandFlags<DiscordMessageCommandFeatureNoonFlagEnum>;
  let loggerService: LoggerService;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
  });

  describe(`constructor()`, (): void => {
    describe(`when the class is created with a command`, (): void => {
      it(`should update the command inside the class`, (): void => {
        expect.assertions(1);

        discordCommandFlags = new DiscordCommandFlags<
          DiscordMessageCommandFeatureNoonFlagEnum
        >({
          command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
          flags: createMock<
            DiscordCommandBooleanFlag<
              DiscordMessageCommandFeatureNoonFlagEnum
            >[]
          >(),
        });

        expect(discordCommandFlags.getCommand()).toStrictEqual(
          DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON
        );
      });
    });

    describe(`when the class is created with some flags`, (): void => {
      it(`should update the flags inside the class`, (): void => {
        expect.assertions(1);
        const flags = createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >();

        discordCommandFlags = new DiscordCommandFlags<
          DiscordMessageCommandFeatureNoonFlagEnum
        >({
          command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
          flags,
        });

        expect(discordCommandFlags.getFlags()).toStrictEqual(flags);
      });
    });
  });

  describe(`getCommand()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    it(`should return the command`, (): void => {
      expect.assertions(1);
      discordCommandFlags.setCommand(DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON);

      const result = discordCommandFlags.getCommand();

      expect(result).toStrictEqual(DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON);
    });
  });

  describe(`setCommand()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    it(`should update the command with the given ones`, (): void => {
      expect.assertions(1);

      discordCommandFlags.setCommand(DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON);

      expect(discordCommandFlags.getCommand()).toStrictEqual(
        DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON
      );
    });
  });

  describe(`getFlags()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    it(`should return the flags`, (): void => {
      expect.assertions(1);
      const flags = createMock<
        DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
      >();
      discordCommandFlags.setFlags(flags);

      const result = discordCommandFlags.getFlags();

      expect(result).toStrictEqual(flags);
    });
  });

  describe(`setFlags()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    it(`should update the flags with the given ones`, (): void => {
      expect.assertions(1);
      const flags = createMock<
        DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
      >();

      discordCommandFlags.setFlags(flags);

      expect(discordCommandFlags.getFlags()).toStrictEqual(flags);
    });
  });

  describe(`getRandomFlag()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    describe(`when there is no flags`, (): void => {
      beforeEach((): void => {
        discordCommandFlags.setFlags([]);
      });

      it(`should return undefined`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getRandomFlag();

        expect(result).toBeUndefined();
      });
    });

    describe(`when there is one flag`, (): void => {
      let flag: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag = createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>
        >();
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return the flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getRandomFlag();

        expect(result).toStrictEqual(flag);
      });
    });

    describe(`when there is multiple flags`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag1 = createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>
        >();
        flag2 = createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>
        >();
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return one of the flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getRandomFlag();

        expect(result).toBeOneOf([flag1, flag2]);
      });
    });
  });

  describe(`getRandomFlagUsageExample()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    describe(`when there is no flags`, (): void => {
      beforeEach((): void => {
        discordCommandFlags.setFlags([]);
      });

      it(`should return undefined`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getRandomFlagUsageExample();

        expect(result).toBeUndefined();
      });
    });

    describe(`when there is one flag`, (): void => {
      let flag: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >()
        );
        discordCommandFlags.setFlags([flag]);
      });

      describe(`when the flag type is boolean`, (): void => {
        beforeEach((): void => {
          flag.setType(DiscordCommandFlagTypeEnum.BOOLEAN);
          flag.setName(DiscordMessageCommandFeatureNoonFlagEnum.ENABLED);
        });

        it(`should return the flag name on lower case with "--" as prefix and a random boolean as value`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getRandomFlagUsageExample();

          expect(result).toBeOneOf([`--enabled=true`, `--enabled=false`]);
        });
      });
    });
  });

  describe(`getAllFlagsNameExample()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    describe(`when there is no flags`, (): void => {
      beforeEach((): void => {
        discordCommandFlags.setFlags([]);
      });

      it(`should return an empty string`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameExample();

        expect(result).toStrictEqual(``);
      });
    });

    describe(`when there is one flag`, (): void => {
      let flag: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return a string containing the name of the flag on lower case wrapped with backtick`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameExample();

        expect(result).toStrictEqual(`\`--enabled\``);
      });
    });

    describe(`when there is two flags`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
          })
        );
        flag2 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.E,
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return a string containing the names of the flags on lower case wrapped with backtick and comma separated`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameExample();

        expect(result).toStrictEqual(`\`--enabled\`, \`--e\``);
      });
    });
  });

  describe(`getAllFlagsNameWithShortcutsExample()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    describe(`when there is no flags`, (): void => {
      beforeEach((): void => {
        discordCommandFlags.setFlags([]);
      });

      it(`should return an empty string`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameWithShortcutsExample();

        expect(result).toStrictEqual(``);
      });
    });

    describe(`when there is one flag`, (): void => {
      let flag: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return a string containing the name of the flag on lower case wrapped with backtick`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameWithShortcutsExample();

        expect(result).toStrictEqual(`\`--enabled\``);
      });
    });

    describe(`when there is one flag with two shortcuts`, (): void => {
      let flag: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
            shortcuts: [
              DiscordMessageCommandFeatureNoonFlagEnum.E,
              DiscordMessageCommandFeatureNoonFlagEnum.E,
            ],
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return a string containing the name and the shortcuts of the flag on lower case wrapped with backtick`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameWithShortcutsExample();

        expect(result).toStrictEqual(`\`--enabled (or -e, -e)\``);
      });
    });

    describe(`when there is two flags`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
          })
        );
        flag2 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.E,
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return a string containing the names of the flags on lower case wrapped with backtick and comma separated`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameWithShortcutsExample();

        expect(result).toStrictEqual(`\`--enabled\`, \`--e\``);
      });
    });

    describe(`when there is two flags with two shortcuts`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
            shortcuts: [
              DiscordMessageCommandFeatureNoonFlagEnum.E,
              DiscordMessageCommandFeatureNoonFlagEnum.E,
            ],
          })
        );
        flag2 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.E,
            shortcuts: [
              DiscordMessageCommandFeatureNoonFlagEnum.E,
              DiscordMessageCommandFeatureNoonFlagEnum.E,
            ],
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return a string containing the names of the flags on lower case wrapped with backtick and comma separated`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameWithShortcutsExample();

        expect(result).toStrictEqual(
          `\`--enabled (or -e, -e)\`, \`--e (or -e, -e)\``
        );
      });
    });
  });

  describe(`getAllFlagsLowerCaseName()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    describe(`when there is no flags`, (): void => {
      beforeEach((): void => {
        discordCommandFlags.setFlags([]);
      });

      it(`should return an empty array`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseName();

        expect(result).toStrictEqual([]);
      });
    });

    describe(`when there is one flag`, (): void => {
      let flag: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return an array containing the name of the flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseName();

        expect(result).toStrictEqual([`enabled`]);
      });
    });

    describe(`when there is two flags`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
          })
        );
        flag2 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.E,
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return an array containing the names of the flags`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseName();

        expect(result).toStrictEqual([`enabled`, `e`]);
      });
    });
  });

  describe(`getAllFlagsLowerCaseNameWithShortcuts()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >(),
      });
    });

    describe(`when there is no flags`, (): void => {
      beforeEach((): void => {
        discordCommandFlags.setFlags([]);
      });

      it(`should return an empty array`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([]);
      });
    });

    describe(`when there is one flag`, (): void => {
      let flag: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return an array containing the name of the flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([`enabled`]);
      });
    });

    describe(`when there is two flags with one shortcut each`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
            shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.E],
          })
        );
        flag2 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.E,
            shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.ENABLED],
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return an array containing the names of the flags and the shortcuts`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([`enabled`, `e`, `e`, `enabled`]);
      });
    });

    describe(`when there is two flags with two shortcuts each`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
            shortcuts: [
              DiscordMessageCommandFeatureNoonFlagEnum.E,
              DiscordMessageCommandFeatureNoonFlagEnum.E,
            ],
          })
        );
        flag2 = new DiscordCommandBooleanFlag<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(
          createMock<
            IDiscordCommandFlag<DiscordMessageCommandFeatureNoonFlagEnum>
          >({
            name: DiscordMessageCommandFeatureNoonFlagEnum.E,
            shortcuts: [
              DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
              DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
            ],
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return an array containing the names of the flags and the shortcuts`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([
          `enabled`,
          `e`,
          `e`,
          `e`,
          `enabled`,
          `enabled`,
        ]);
      });
    });
  });

  describe(`getErrors()`, (): void => {
    let message: string;

    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: [
          new DiscordCommandBooleanFlag<
            DiscordMessageCommandFeatureNoonFlagEnum
          >({
            action: (): Promise<IDiscordCommandFlagSuccess> =>
              Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
            description: ``,
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
            shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.E],
          }),
        ],
      });
    });

    describe(`when the given message is empty`, (): void => {
      beforeEach((): void => {
        message = ``;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): void => {
          discordCommandFlags.getErrors(message);
        }).toThrow(new Error(`The message should not be empty`));
      });
    });

    describe(`when the given message contains an unknown invalid flag`, (): void => {
      beforeEach((): void => {
        message = `--flag`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`flag\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an unknown invalid uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--FLAG`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`FLAG\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an unknown flag`, (): void => {
      beforeEach((): void => {
        message = `--flag=true`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`flag\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an unknown UPPERCASE flag`, (): void => {
      beforeEach((): void => {
        message = `--FLAG=TRUE`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`FLAG\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an unknown invalid shortcut flag`, (): void => {
      beforeEach((): void => {
        message = `-f`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an unknown invalid shortcut uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `-F`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an unknown shortcut flag without value`, (): void => {
      beforeEach((): void => {
        message = `-f=`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an unknown shortcut uppercase flag without value`, (): void => {
      beforeEach((): void => {
        message = `-F=`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an unknown shortcut flag`, (): void => {
      beforeEach((): void => {
        message = `-f=true`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an unknown shortcut uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `-F=TRUE`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an existing boolean flag`, (): void => {
      beforeEach((): void => {
        message = `--enabled`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--enabled`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`enabled\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`enabled\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=bad`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`enabled\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=true`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=false`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the given message contains an existing boolean uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ENABLED`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ENABLED\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ENABLED\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=BAD`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ENABLED\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=TRUE`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=FALSE`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the given message contains an existing flag`, (): void => {
      beforeEach((): void => {
        message = `-e`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `-e`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `-e=`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `-e=bad`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the given message contains an existing shortcut uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `-e`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `-e`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `-e=`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has a value`, (): void => {
        beforeEach((): void => {
          message = `-e=BAD`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown invalid flag`, (): void => {
      beforeEach((): void => {
        message = `--enabled=true --flag`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`flag\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown invalid uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ENABLED=TRUE --FLAG`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`FLAG\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown flag`, (): void => {
      beforeEach((): void => {
        message = `--enabled=true --flag=true`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`flag\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ENABLED=TRUE --FLAG=TRUE`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`FLAG\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown invalid shortcut flag`, (): void => {
      beforeEach((): void => {
        message = `--enabled=true -f`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown invalid shortcut uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ENABLED=TRUE -F`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown shortcut flag`, (): void => {
      beforeEach((): void => {
        message = `--enabled=true -f=true`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown shortcut uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ENABLED=TRUE -F=TRUE`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an existing boolean flag`, (): void => {
      beforeEach((): void => {
        message = `--enabled=true --enabled`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--enabled=true --enabled`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`enabled\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=true --enabled=`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`enabled\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=true --enabled=bad`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`enabled\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=true --enabled=true`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=true --enabled=false`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the given message contains a valid boolean flag and an existing boolean uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ENABLED=TRUE --ENABLED`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=TRUE --ENABLED`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ENABLED\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=TRUE --ENABLED=`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ENABLED\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=TRUE --ENABLED=BAD`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ENABLED\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=TRUE --ENABLED=TRUE`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=TRUE --ENABLED=FALSE`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the given message contains two unknown invalid flags`, (): void => {
      beforeEach((): void => {
        message = `--flag --other-flag`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`flag\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`other-flag\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two unknown invalid uppercase flags`, (): void => {
      beforeEach((): void => {
        message = `--FLAG --OTHER-FLAG`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`FLAG\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`OTHER-FLAG\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two unknown flags`, (): void => {
      beforeEach((): void => {
        message = `--flag=true --other-flag=true`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`flag\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`other-flag\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two unknown uppercase flags`, (): void => {
      beforeEach((): void => {
        message = `--FLAG=TRUE --OTHER-FLAG=TRUE`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`FLAG\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`OTHER-FLAG\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two unknown invalid shortcut flags`, (): void => {
      beforeEach((): void => {
        message = `-f -d`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`d\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two unknown invalid shortcut uppercase flags`, (): void => {
      beforeEach((): void => {
        message = `-F -D`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`D\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two unknown shortcut flags without value`, (): void => {
      beforeEach((): void => {
        message = `-f= -d=`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`d\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two unknown shortcut uppercase flags without value`, (): void => {
      beforeEach((): void => {
        message = `-F= -D=`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`D\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two unknown shortcut flags`, (): void => {
      beforeEach((): void => {
        message = `-f=true -d=true`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`d\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two unknown shortcut uppercase flags`, (): void => {
      beforeEach((): void => {
        message = `-F=TRUE -D=TRUE`;
      });

      it(`should return a list with two errors about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`D\` is unknown to the \`noon\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two existing boolean flags`, (): void => {
      beforeEach((): void => {
        message = `--enabled --other-flag`;
      });

      describe(`when the flags does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--enabled --other-flag`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`enabled\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`other-flag\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flags does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--enabled= --other-flag=`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`enabled\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`other-flag\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flags has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=bad --other-flag=bad`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`enabled\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`other-flag\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=true --other-flag=bad`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`other-flag\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--enabled=false --other-flag=bad`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`other-flag\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });
    });

    describe(`when the given message contains two existing boolean uppercase flags`, (): void => {
      beforeEach((): void => {
        message = `--ENABLED --OTHER-FLAG`;
      });

      describe(`when the flags does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED --OTHER-FLAG`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ENABLED\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flags does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED= --OTHER-FLAG=`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ENABLED\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flags has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=BAD --OTHER-FLAG=BAD`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ENABLED\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=TRUE --OTHER-FLAG=BAD`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--ENABLED=FALSE --OTHER-FLAG=BAD`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`noon\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });
    });
  });

  describe(`executeAll()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let messageFlags: string;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;
    let actionMock: jest.Mock;

    beforeEach((): void => {
      actionMock = jest.fn().mockResolvedValue(`dummy`);
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: [
          new DiscordCommandBooleanFlag<
            DiscordMessageCommandFeatureNoonFlagEnum
          >({
            action: actionMock,
            description: ``,
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
            shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.E],
          }),
        ],
      });
      // @todo remove casting once https://github.com/Typescript-TDD/ts-auto-mock/issues/464 is fixed
      anyDiscordMessage = createMock<IAnyDiscordMessage>(({
        id: `dummy-id`,
      } as unknown) as IAnyDiscordMessage);
      messageFlags = `--enabled=true`;

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      loggerServiceSuccessSpy = jest
        .spyOn(loggerService, `success`)
        .mockImplementation();
    });

    it(`should log about handling the given flags`, async (): Promise<void> => {
      expect.assertions(2);

      await discordCommandFlags.executeAll(anyDiscordMessage, messageFlags);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
        context: `DiscordCommandFlags`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-handling all flags...`,
      } as ILoggerLog);
    });

    describe(`when the given message flags contains a flag with a value`, (): void => {
      beforeEach((): void => {
        messageFlags = `--enabled=true`;
      });

      describe(`when the given message flags contains an unknown flag with a value`, (): void => {
        beforeEach((): void => {
          messageFlags = `--dummy=true`;
        });

        it(`should log about handling the given flag`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-dummy flag...`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );
        });

        it(`should not execute the flag action`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );

          expect(actionMock).not.toHaveBeenCalled();
        });

        it(`should not log about successfully handled the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );

          expect(loggerServiceSuccessSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the given message flags contains a valid flag with a value`, (): void => {
        beforeEach((): void => {
          messageFlags = `--enabled=true`;
        });

        it(`should log about handling the given flag`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await discordCommandFlags.executeAll(anyDiscordMessage, messageFlags);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-enabled flag...`,
          } as ILoggerLog);
        });

        it(`should execute the flag action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual({
            response: `No options for noon feature for now. Work in progress.`,
          });
          expect(actionMock).toHaveBeenCalledTimes(1);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage);
        });

        it(`should log about successfully handled the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual({
            response: `No options for noon feature for now. Work in progress.`,
          });
          expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-all flags handled`,
          } as ILoggerLog);
        });
      });
    });

    describe(`when the given message flags contains a shortcut flag with a value`, (): void => {
      beforeEach((): void => {
        messageFlags = `-e`;
      });

      describe(`when the given message flags contains an unknown shortcut flag with a value`, (): void => {
        beforeEach((): void => {
          messageFlags = `-d`;
        });

        it(`should log about handling the given shortcut flag`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-d flag...`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );
        });

        it(`should not execute the flag action`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );

          expect(actionMock).not.toHaveBeenCalled();
        });

        it(`should not log about successfully handled the given shortcut flag`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );

          expect(loggerServiceSuccessSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the given message flags contains a valid shortcut flag with a value`, (): void => {
        beforeEach((): void => {
          messageFlags = `-e`;
        });

        it(`should log about handling the given shortcut flag`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await discordCommandFlags.executeAll(anyDiscordMessage, messageFlags);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-e flag...`,
          } as ILoggerLog);
        });

        it(`should execute the flag action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual({
            response: `No options for noon feature for now. Work in progress.`,
          });
          expect(actionMock).toHaveBeenCalledTimes(1);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage);
        });

        it(`should log about successfully handled the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual({
            response: `No options for noon feature for now. Work in progress.`,
          });
          expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-all flags handled`,
          } as ILoggerLog);
        });
      });
    });

    describe(`when the given message flags contains two flags with a value`, (): void => {
      beforeEach((): void => {
        messageFlags = `--enabled=true --enabled=true`;
      });

      describe(`when the given message flags contains two unknown flags with a value`, (): void => {
        beforeEach((): void => {
          messageFlags = `--dummy=true --dummy=true`;
        });

        it(`should log about handling the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(4);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-dummy flag...`,
          } as ILoggerLog);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-dummy flag...`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );
        });

        it(`should not execute the flag action`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );

          expect(actionMock).not.toHaveBeenCalled();
        });

        it(`should not log about successfully handled the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );

          expect(loggerServiceSuccessSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the given message flags contains two valid flags with a value`, (): void => {
        beforeEach((): void => {
          messageFlags = `--enabled=true --enabled=true`;
        });

        it(`should log about handling the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await discordCommandFlags.executeAll(anyDiscordMessage, messageFlags);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-enabled flag...`,
          } as ILoggerLog);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-enabled flag...`,
          } as ILoggerLog);
        });

        it(`should execute the flags action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual({
            response: `No options for noon feature for now. Work in progress.`,
          });
          expect(actionMock).toHaveBeenCalledTimes(2);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage);
        });

        it(`should log about successfully handled the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual({
            response: `No options for noon feature for now. Work in progress.`,
          });
          expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-all flags handled`,
          } as ILoggerLog);
        });
      });
    });

    describe(`when the given message flags contains two shortcut flags with a value`, (): void => {
      beforeEach((): void => {
        messageFlags = `-e -e`;
      });

      describe(`when the given message flags contains two unknown shortcuts flag with a value`, (): void => {
        beforeEach((): void => {
          messageFlags = `-d -d`;
        });

        it(`should log about handling the given shortcut flag`, async (): Promise<
          void
        > => {
          expect.assertions(4);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-d flag...`,
          } as ILoggerLog);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-d flag...`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );
        });

        it(`should not execute the flag action`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );

          expect(actionMock).not.toHaveBeenCalled();
        });

        it(`should not log about successfully handled the given shortcut flags`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.executeAll(anyDiscordMessage, messageFlags)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );

          expect(loggerServiceSuccessSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the given message flags contains two valid shortcuts flag with a value`, (): void => {
        beforeEach((): void => {
          messageFlags = `-e -e`;
        });

        it(`should log about handling the given shortcut flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await discordCommandFlags.executeAll(anyDiscordMessage, messageFlags);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-e flag...`,
          } as ILoggerLog);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-e flag...`,
          } as ILoggerLog);
        });

        it(`should execute the flag actions`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual({
            response: `No options for noon feature for now. Work in progress.`,
          });
          expect(actionMock).toHaveBeenCalledTimes(2);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage);
        });

        it(`should log about successfully handled the given shortcut flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual({
            response: `No options for noon feature for now. Work in progress.`,
          });
          expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-all flags handled`,
          } as ILoggerLog);
        });
      });
    });
  });

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let messageFlag: IDiscordMessageFlag;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let actionMock: jest.Mock;

    beforeEach((): void => {
      actionMock = jest.fn().mockResolvedValue(`dummy`);
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >({
        command: DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON,
        flags: [
          new DiscordCommandBooleanFlag<
            DiscordMessageCommandFeatureNoonFlagEnum
          >({
            action: actionMock,
            description: ``,
            name: DiscordMessageCommandFeatureNoonFlagEnum.ENABLED,
            shortcuts: [DiscordMessageCommandFeatureNoonFlagEnum.E],
          }),
        ],
      });
      // @todo remove casting once https://github.com/Typescript-TDD/ts-auto-mock/issues/464 is fixed
      anyDiscordMessage = createMock<IAnyDiscordMessage>(({
        id: `dummy-id`,
      } as unknown) as IAnyDiscordMessage);
      messageFlag = `--enabled=true`;

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
    });

    it(`should log about handling the given flag`, async (): Promise<void> => {
      expect.assertions(2);

      await discordCommandFlags.execute(anyDiscordMessage, messageFlag);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordCommandFlags`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-handling value-enabled flag...`,
      } as ILoggerLog);
    });

    describe(`when the given message flag is a flag with a value`, (): void => {
      beforeEach((): void => {
        messageFlag = `--enabled=true`;
      });

      describe(`when the given message flag is an unknown flag`, (): void => {
        beforeEach((): void => {
          messageFlag = `--dummy=true`;
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(
            discordCommandFlags.execute(anyDiscordMessage, messageFlag)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );
        });

        it(`should not execute the flag action`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.execute(anyDiscordMessage, messageFlag)
          ).rejects.toThrow(
            new Error(
              `The flag does not exists. Could not perform the execution`
            )
          );

          expect(actionMock).not.toHaveBeenCalled();
        });
      });

      describe(`when the given message flag is a valid flag`, (): void => {
        beforeEach((): void => {
          messageFlag = `--enabled=true`;
        });

        it(`should execute the flag action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.execute(
            anyDiscordMessage,
            messageFlag
          );

          expect(result).toStrictEqual(`dummy`);
          expect(actionMock).toHaveBeenCalledTimes(1);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage);
        });
      });
    });

    describe(`when the given message flag is a shortcut flag`, (): void => {
      beforeEach((): void => {
        messageFlag = `-e`;
      });

      describe(`when the given message shortcut flag is an unknown flag`, (): void => {
        beforeEach((): void => {
          messageFlag = `-d`;
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(
            discordCommandFlags.execute(anyDiscordMessage, messageFlag)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );
        });

        it(`should not execute the flag action`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(
            discordCommandFlags.execute(anyDiscordMessage, messageFlag)
          ).rejects.toThrow(
            new Error(
              `The shortcut flag does not exists. Could not perform the execution`
            )
          );

          expect(actionMock).not.toHaveBeenCalled();
        });
      });

      describe(`when the given message shortcut flag is a valid flag`, (): void => {
        beforeEach((): void => {
          messageFlag = `-e`;
        });

        it(`should execute the flag action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.execute(
            anyDiscordMessage,
            messageFlag
          );

          expect(result).toStrictEqual(`dummy`);
          expect(actionMock).toHaveBeenCalledTimes(1);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage);
        });
      });
    });
  });
});
