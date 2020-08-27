import { createMock } from "ts-auto-mock";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { IDiscordCommandFlag } from "../../../interfaces/commands/discord-command-flag";
import { DiscordMessageCommandFeatureNoonFlagEnum } from "../../../services/command/feature/features/noon/enums/discord-message-command-feature-noon-flag.enum";
import { DiscordCommandBooleanFlag } from "./discord-command-boolean-flag";
import { DiscordCommandFlags } from "./discord-command-flags";

describe(`DiscordCommandFlags`, (): void => {
  let discordCommandFlags: DiscordCommandFlags<DiscordMessageCommandFeatureNoonFlagEnum>;

  describe(`constructor()`, (): void => {
    describe(`when the class is created with some flags`, (): void => {
      it(`should update the flags inside the class`, (): void => {
        expect.assertions(1);
        const flags = createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >();

        discordCommandFlags = new DiscordCommandFlags<
          DiscordMessageCommandFeatureNoonFlagEnum
        >(flags);

        expect(discordCommandFlags.getFlags()).toStrictEqual(flags);
      });
    });
  });

  describe(`getFlags()`, (): void => {
    beforeEach((): void => {
      discordCommandFlags = new DiscordCommandFlags<
        DiscordMessageCommandFeatureNoonFlagEnum
      >(
        createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
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
      >(
        createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
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
      >(
        createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
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
      >(
        createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
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
      >(
        createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
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
      >(
        createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
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
      >(
        createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
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
      >(
        createMock<
          DiscordCommandBooleanFlag<DiscordMessageCommandFeatureNoonFlagEnum>[]
        >()
      );
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
});
