import { createMock } from "ts-auto-mock";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { IDiscordCommandFlag } from "../../../interfaces/commands/flags/discord-command-flag";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NAME_NOON } from "../../../services/command/feature/constants/discord-message-command-feature-name-noon";
import { DiscordMessageCommandFeatureNoonFlagEnum } from "../../../services/command/feature/features/noon/enums/discord-message-command-feature-noon-flag.enum";
import { IDiscordCommandFlagsErrors } from "../../../types/commands/discord-command-flags-errors";
import { DiscordCommandBooleanFlag } from "./discord-command-boolean-flag";
import { DiscordCommandFlags } from "./discord-command-flags";

describe(`DiscordCommandFlags`, (): void => {
  let discordCommandFlags: DiscordCommandFlags<DiscordMessageCommandFeatureNoonFlagEnum>;

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
              isUnknown: true,
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
              description: `The flag \`enabled\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: true,
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
              isUnknown: true,
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
              isUnknown: true,
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
              description: `The flag \`enabled\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: true,
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
              isUnknown: true,
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
              isUnknown: true,
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
              description: `The flag \`enabled\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: true,
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
              isUnknown: true,
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
  });
});
