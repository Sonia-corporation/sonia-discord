import { createMock } from "ts-auto-mock";
import { ILoggerLog } from "../../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { IDiscordCommandFlag } from "../../../interfaces/commands/flags/discord-command-flag";
import { IDiscordCommandFlagSuccess } from "../../../interfaces/commands/flags/discord-command-flag-success";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { IDiscordCommandFlagsDuplicated } from "../../../types/commands/flags/discord-command-flags-duplicated";
import { IDiscordCommandFlagsErrors } from "../../../types/commands/flags/discord-command-flags-errors";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
import { DiscordCommandFirstArgument } from "../arguments/discord-command-first-argument";
import { DiscordCommandBooleanFlag } from "./discord-command-boolean-flag";
import { DiscordCommandFlagActionBoolean } from "./discord-command-flag-action-boolean";
import { DiscordCommandFlags } from "./discord-command-flags";

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

enum DummyFirstArgumentEnum {
  ALPHA = `alpha-argument`,
  BETA = `beta-argument`,
}

enum DummyFlagEnum {
  ALPHA = `alpha-flag`,
  BETA = `beta-flag`,
  CHARLIE = `charlie-flag`,
  DELTA = `delta-flag`,
  ECHO = `echo-flag`,
  FOXTROT = `foxtrot-flag`,
}

describe(`DiscordCommandFlags`, (): void => {
  let loggerService: LoggerService;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
  });

  describe(`constructor()`, (): void => {
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
    });

    describe(`when the class is created with a command`, (): void => {
      let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;

      it(`should update the command inside the class`, (): void => {
        expect.assertions(1);

        discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
          command: alphaArgument,
          flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
        });

        expect(discordCommandFlags.getCommand()).toStrictEqual(alphaArgument);
      });
    });

    describe(`when the class is created with some flags`, (): void => {
      let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;

      it(`should update the flags inside the class`, (): void => {
        expect.assertions(1);
        const flags = createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>();

        discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
          command: alphaArgument,
          flags,
        });

        expect(discordCommandFlags.getFlags()).toStrictEqual(flags);
      });
    });
  });

  describe(`getCommand()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
      });
    });

    it(`should return the command`, (): void => {
      expect.assertions(1);
      discordCommandFlags.setCommand(alphaArgument);

      const result = discordCommandFlags.getCommand();

      expect(result).toStrictEqual(alphaArgument);
    });
  });

  describe(`setCommand()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
      });
    });

    it(`should update the command with the given ones`, (): void => {
      expect.assertions(1);

      discordCommandFlags.setCommand(alphaArgument);

      expect(discordCommandFlags.getCommand()).toStrictEqual(alphaArgument);
    });
  });

  describe(`getFlags()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;
    let alphaFlag: DiscordCommandBooleanFlag<DummyFlagEnum>;
    let betaFlag: DiscordCommandBooleanFlag<DummyFlagEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      alphaFlag = new DiscordCommandBooleanFlag({
        action: createMock<DiscordCommandFlagActionBoolean>({
          execute: (): Promise<IDiscordCommandFlagSuccess> =>
            Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
        }),
        description: ``,
        name: DummyFlagEnum.ALPHA,
      });
      betaFlag = new DiscordCommandBooleanFlag({
        action: createMock<DiscordCommandFlagActionBoolean>({
          execute: (): Promise<IDiscordCommandFlagSuccess> =>
            Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
        }),
        description: ``,
        name: DummyFlagEnum.BETA,
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: [betaFlag, alphaFlag],
      });
    });

    it(`should return the flags`, (): void => {
      expect.assertions(1);

      const result = discordCommandFlags.getFlags();

      expect(result).toStrictEqual([betaFlag, alphaFlag]);
    });
  });

  describe(`getOrderedFlags()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;
    let alphaFlag: DiscordCommandBooleanFlag<DummyFlagEnum>;
    let betaFlag: DiscordCommandBooleanFlag<DummyFlagEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
      });
      alphaFlag = new DiscordCommandBooleanFlag({
        action: createMock<DiscordCommandFlagActionBoolean>({
          execute: (): Promise<IDiscordCommandFlagSuccess> =>
            Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
        }),
        description: ``,
        name: DummyFlagEnum.ALPHA,
      });
      betaFlag = new DiscordCommandBooleanFlag({
        action: createMock<DiscordCommandFlagActionBoolean>({
          execute: (): Promise<IDiscordCommandFlagSuccess> =>
            Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
        }),
        description: ``,
        name: DummyFlagEnum.BETA,
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: [betaFlag, alphaFlag],
      });
    });

    it(`should return the flags ordered alphabetically by flag name`, (): void => {
      expect.assertions(1);

      const result = discordCommandFlags.getOrderedFlags();

      expect(result).toStrictEqual([alphaFlag, betaFlag]);
    });
  });

  describe(`setFlags()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
      });
    });

    it(`should update the flags with the given ones`, (): void => {
      expect.assertions(1);
      const flags = createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>();

      discordCommandFlags.setFlags(flags);

      expect(discordCommandFlags.getFlags()).toStrictEqual(flags);
    });
  });

  describe(`getRandomFlag()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
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
      let flag: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag = createMock<DiscordCommandBooleanFlag<DummyFlagEnum>>();
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return the flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getRandomFlag();

        expect(result).toStrictEqual(flag);
      });
    });

    describe(`when there is multiple flags`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DummyFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag1 = createMock<DiscordCommandBooleanFlag<DummyFlagEnum>>();
        flag2 = createMock<DiscordCommandBooleanFlag<DummyFlagEnum>>();
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
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
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
      let flag: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >()
        );
        discordCommandFlags.setFlags([flag]);
      });

      describe(`when the flag type is boolean`, (): void => {
        beforeEach((): void => {
          flag.setType(DiscordCommandFlagTypeEnum.BOOLEAN);
          flag.setName(DummyFlagEnum.ALPHA);
        });

        it(`should return the flag name on lower case with "--" as prefix and a random boolean as value`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getRandomFlagUsageExample();

          expect(result).toBeOneOf([`--alpha-flag=true`, `--alpha-flag=false`]);
        });
      });
    });
  });

  describe(`getAllFlagsNameExample()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
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
      let flag: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return a string containing the name of the flag on lower case wrapped with backtick`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameExample();

        expect(result).toStrictEqual(`\`--alpha-flag\``);
      });
    });

    describe(`when there is two flags`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DummyFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
          })
        );
        flag2 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.BETA,
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return a string containing the names of the flags on lower case wrapped with backtick and comma separated`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameExample();

        expect(result).toStrictEqual(`\`--alpha-flag\`, \`--beta-flag\``);
      });
    });
  });

  describe(`getAllFlagsNameWithShortcutsExample()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
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
      let flag: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return a string containing the name of the flag on lower case wrapped with backtick`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameWithShortcutsExample();

        expect(result).toStrictEqual(`\`--alpha-flag\``);
      });
    });

    describe(`when there is one flag with two shortcuts`, (): void => {
      let flag: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
            shortcuts: [DummyFlagEnum.BETA, DummyFlagEnum.CHARLIE],
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return a string containing the name and the shortcuts of the flag on lower case wrapped with backtick`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameWithShortcutsExample();

        expect(result).toStrictEqual(
          `\`--alpha-flag (or -beta-flag, -charlie-flag)\``
        );
      });
    });

    describe(`when there is two flags`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DummyFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
          })
        );
        flag2 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.BETA,
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return a string containing the names of the flags on lower case wrapped with backtick and comma separated`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameWithShortcutsExample();

        expect(result).toStrictEqual(`\`--alpha-flag\`, \`--beta-flag\``);
      });
    });

    describe(`when there is two flags with two shortcuts`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DummyFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
            shortcuts: [DummyFlagEnum.BETA, DummyFlagEnum.CHARLIE],
          })
        );
        flag2 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.DELTA,
            shortcuts: [DummyFlagEnum.ECHO, DummyFlagEnum.FOXTROT],
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return a string containing the names of the flags on lower case wrapped with backtick and comma separated`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsNameWithShortcutsExample();

        expect(result).toStrictEqual(
          `\`--alpha-flag (or -beta-flag, -charlie-flag)\`, \`--delta-flag (or -echo-flag, -foxtrot-flag)\``
        );
      });
    });
  });

  describe(`getAllFlagsLowerCaseName()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
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
      let flag: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return an array containing the name of the flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseName();

        expect(result).toStrictEqual([`alpha-flag`]);
      });
    });

    describe(`when there is two flags`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DummyFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
          })
        );
        flag2 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.BETA,
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return an array containing the names of the flags`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseName();

        expect(result).toStrictEqual([`alpha-flag`, `beta-flag`]);
      });
    });
  });

  describe(`getAllFlagsLowerCaseNameWithShortcuts()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: createMock<DiscordCommandBooleanFlag<DummyFlagEnum>[]>(),
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
      let flag: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
          })
        );
        discordCommandFlags.setFlags([flag]);
      });

      it(`should return an array containing the name of the flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([`alpha-flag`]);
      });
    });

    describe(`when there is two flags with one shortcut each`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DummyFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
            shortcuts: [DummyFlagEnum.BETA],
          })
        );
        flag2 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.CHARLIE,
            shortcuts: [DummyFlagEnum.DELTA],
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return an array containing the names of the flags and the shortcuts`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([
          `alpha-flag`,
          `beta-flag`,
          `charlie-flag`,
          `delta-flag`,
        ]);
      });
    });

    describe(`when there is two flags with two shortcuts each`, (): void => {
      let flag1: DiscordCommandBooleanFlag<DummyFlagEnum>;
      let flag2: DiscordCommandBooleanFlag<DummyFlagEnum>;

      beforeEach((): void => {
        flag1 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.ALPHA,
            shortcuts: [DummyFlagEnum.BETA, DummyFlagEnum.CHARLIE],
          })
        );
        flag2 = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<
            IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean>
          >({
            name: DummyFlagEnum.DELTA,
            shortcuts: [DummyFlagEnum.ECHO, DummyFlagEnum.FOXTROT],
          })
        );
        discordCommandFlags.setFlags([flag1, flag2]);
      });

      it(`should return an array containing the names of the flags and the shortcuts`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getAllFlagsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([
          `alpha-flag`,
          `beta-flag`,
          `charlie-flag`,
          `delta-flag`,
          `echo-flag`,
          `foxtrot-flag`,
        ]);
      });
    });
  });

  describe(`getErrors()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;
    let message: string;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: [
          new DiscordCommandBooleanFlag<DummyFlagEnum>({
            action: createMock<DiscordCommandFlagActionBoolean>({
              execute: (): Promise<IDiscordCommandFlagSuccess> =>
                Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
            }),
            description: ``,
            name: DummyFlagEnum.ALPHA,
            shortcuts: [DummyFlagEnum.BETA],
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
            description: `The flag \`flag\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`FLAG\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`flag\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`FLAG\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`f\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`F\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`f\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`F\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`f\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`F\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains an existing boolean flag`, (): void => {
      beforeEach((): void => {
        message = `--alpha-flag`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`alpha-flag\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`alpha-flag\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=bad`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`alpha-flag\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=true`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=false`;
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
        message = `--ALPHA-FLAG`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ALPHA-FLAG\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ALPHA-FLAG\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=BAD`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ALPHA-FLAG\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=TRUE`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=FALSE`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });
    });

    describe(`when the given message contains an existing shortcut flag`, (): void => {
      beforeEach((): void => {
        message = `-beta-flag`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `-beta-flag`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `-beta-flag=`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `-beta-flag=bad`;
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
        message = `-BETA-FLAG`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `-BETA-FLAG`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `-BETA-FLAG=`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has a value`, (): void => {
        beforeEach((): void => {
          message = `-BETA-FLAG=BAD`;
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
        message = `--alpha-flag=true --flag`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`flag\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown invalid uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ALPHA-FLAG=TRUE --FLAG`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`FLAG\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown flag`, (): void => {
      beforeEach((): void => {
        message = `--alpha-flag=true --flag=true`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`flag\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ALPHA-FLAG=TRUE --FLAG=TRUE`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`FLAG\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown invalid shortcut flag`, (): void => {
      beforeEach((): void => {
        message = `--alpha-flag=true -f`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown invalid shortcut uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ALPHA-FLAG=TRUE -F`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown shortcut flag`, (): void => {
      beforeEach((): void => {
        message = `--alpha-flag=true -f=true`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`f\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an unknown shortcut uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ALPHA-FLAG=TRUE -F=TRUE`;
      });

      it(`should return a list with one error about the unknown flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getErrors(message);

        expect(result).toStrictEqual([
          {
            description: `The flag \`F\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains a valid boolean flag and an existing boolean flag`, (): void => {
      beforeEach((): void => {
        message = `--alpha-flag=true --alpha-flag`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=true --alpha-flag`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`alpha-flag\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=true --alpha-flag=`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`alpha-flag\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=true --alpha-flag=bad`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`alpha-flag\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=true --alpha-flag=true`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=true --alpha-flag=false`;
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
        message = `--ALPHA-FLAG=TRUE --ALPHA-FLAG`;
      });

      describe(`when the flag does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=TRUE --ALPHA-FLAG`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ALPHA-FLAG\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=TRUE --ALPHA-FLAG=`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ALPHA-FLAG\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=TRUE --ALPHA-FLAG=BAD`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ALPHA-FLAG\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=TRUE --ALPHA-FLAG=TRUE`;
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toBeNull();
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=TRUE --ALPHA-FLAG=FALSE`;
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
            description: `The flag \`flag\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`other-flag\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`FLAG\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`OTHER-FLAG\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`flag\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`other-flag\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`FLAG\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`OTHER-FLAG\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`f\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`d\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`F\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`D\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`f\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`d\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`F\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`D\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`f\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`d\` is unknown to the \`alpha-argument\` feature.`,
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
            description: `The flag \`F\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
          {
            description: `The flag \`D\` is unknown to the \`alpha-argument\` feature.`,
            isUnknown: true,
            name: `Unknown flag`,
          },
        ] as IDiscordCommandFlagsErrors);
      });
    });

    describe(`when the given message contains two existing boolean flags`, (): void => {
      beforeEach((): void => {
        message = `--alpha-flag --other-flag`;
      });

      describe(`when the flags does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag --other-flag`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`alpha-flag\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`other-flag\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flags does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag= --other-flag=`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`alpha-flag\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`other-flag\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flags has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=bad --other-flag=bad`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`alpha-flag\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`other-flag\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=true --other-flag=bad`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`other-flag\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--alpha-flag=false --other-flag=bad`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`other-flag\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });
    });

    describe(`when the given message contains two existing boolean uppercase flags`, (): void => {
      beforeEach((): void => {
        message = `--ALPHA-FLAG --OTHER-FLAG`;
      });

      describe(`when the flags does not have a value at all`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG --OTHER-FLAG`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ALPHA-FLAG\` does not have a value. Specify either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flags does not have a value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG= --OTHER-FLAG=`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ALPHA-FLAG\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flags has an invalid value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=BAD --OTHER-FLAG=BAD`;
        });

        it(`should return a list with two errors about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`ALPHA-FLAG\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
              isUnknown: false,
              name: `Invalid boolean flag`,
            },
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has true as value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=TRUE --OTHER-FLAG=BAD`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });

      describe(`when the flag has false as value`, (): void => {
        beforeEach((): void => {
          message = `--ALPHA-FLAG=FALSE --OTHER-FLAG=BAD`;
        });

        it(`should return a list with one error about the invalid flag`, (): void => {
          expect.assertions(1);

          const result = discordCommandFlags.getErrors(message);

          expect(result).toStrictEqual([
            {
              description: `The flag \`OTHER-FLAG\` is unknown to the \`alpha-argument\` feature.`,
              isUnknown: true,
              name: `Unknown flag`,
            },
          ] as IDiscordCommandFlagsErrors);
        });
      });
    });
  });

  describe(`getDuplicated()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<string>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;
    let message: string;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlags = new DiscordCommandFlags<string>({
        command: alphaArgument,
        flags: [
          new DiscordCommandBooleanFlag<string>({
            action: createMock<DiscordCommandFlagActionBoolean>({
              execute: (): Promise<IDiscordCommandFlagSuccess> =>
                Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
            }),
            description: ``,
            name: DummyFlagEnum.ALPHA,
            shortcuts: [DummyFlagEnum.BETA],
          }),
          new DiscordCommandBooleanFlag<string>({
            action: createMock<DiscordCommandFlagActionBoolean>({
              execute: (): Promise<IDiscordCommandFlagSuccess> =>
                Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
            }),
            description: ``,
            name: `dummy`,
          }),
          new DiscordCommandBooleanFlag<string>({
            action: createMock<DiscordCommandFlagActionBoolean>({
              execute: (): Promise<IDiscordCommandFlagSuccess> =>
                Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
            }),
            description: ``,
            name: `other`,
            shortcuts: [`t`],
          }),
          new DiscordCommandBooleanFlag<string>({
            action: createMock<DiscordCommandFlagActionBoolean>({
              execute: (): Promise<IDiscordCommandFlagSuccess> =>
                Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
            }),
            description: ``,
            name: `three`,
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
          discordCommandFlags.getDuplicated(message);
        }).toThrow(new Error(`The message should not be empty`));
      });
    });

    describe(`when the given message contains a boolean flag`, (): void => {
      beforeEach((): void => {
        message = `--alpha-flag=true`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getDuplicated(message);

        expect(result).toBeNull();
      });
    });

    describe(`when the given message contains a boolean uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `--ALPHA-FLAG=TRUE`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getDuplicated(message);

        expect(result).toBeNull();
      });
    });

    describe(`when the given message contains a shortcut flag`, (): void => {
      beforeEach((): void => {
        message = `-beta-flag`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getDuplicated(message);

        expect(result).toBeNull();
      });
    });

    describe(`when the given message contains a shortcut uppercase flag`, (): void => {
      beforeEach((): void => {
        message = `-ALPHA-FLAG`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getDuplicated(message);

        expect(result).toBeNull();
      });
    });

    describe(`when the given message contains two duplicated boolean flags`, (): void => {
      beforeEach((): void => {
        message = `--alpha-flag=true --alpha-flag=true`;
      });

      it(`should return a list with one error about the duplicated flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getDuplicated(message);

        expect(result).toStrictEqual([
          {
            description: `The flags \`--alpha-flag=true\` and \`--alpha-flag=true\` are duplicated.`,
            name: `Alpha-flag flag duplicated`,
          },
        ] as IDiscordCommandFlagsDuplicated);
      });
    });

    describe(`when the given message contains two duplicated boolean uppercase flags`, (): void => {
      beforeEach((): void => {
        message = `--ALPHA-FLAG=TRUE --ALPHA-FLAG=TRUE`;
      });

      it(`should return a list with one error about the duplicated flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getDuplicated(message);

        expect(result).toStrictEqual([
          {
            description: `The flags \`--ALPHA-FLAG=TRUE\` and \`--ALPHA-FLAG=TRUE\` are duplicated.`,
            name: `Alpha-flag flag duplicated`,
          },
        ] as IDiscordCommandFlagsDuplicated);
      });
    });

    describe(`when the given message contains three duplicated boolean flags`, (): void => {
      beforeEach((): void => {
        message = `--alpha-flag=true -beta-flag --AlPhA-fLaG=FaLsE`;
      });

      it(`should return a list with one error about the duplicated flag`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getDuplicated(message);

        expect(result).toStrictEqual([
          {
            description: `The flags \`--alpha-flag=true\`, \`-beta-flag\` and \`--AlPhA-fLaG=FaLsE\` are duplicated.`,
            name: `Alpha-flag flag duplicated`,
          },
        ] as IDiscordCommandFlagsDuplicated);
      });
    });

    describe(`when the given message contains three not duplicated boolean flags`, (): void => {
      beforeEach((): void => {
        message = `--dummy=true -t --three=FaLsE`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlags.getDuplicated(message);

        expect(result).toBeNull();
      });
    });
  });

  describe(`executeAll()`, (): void => {
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;

    let anyDiscordMessage: IAnyDiscordMessage;
    let messageFlags: string;
    let discordCommandFlagSuccess: IDiscordCommandFlagSuccess;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;
    let actionMock: jest.Mock<Promise<IDiscordCommandFlagSuccess>, unknown[]>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlagSuccess = createMock<IDiscordCommandFlagSuccess>();
      actionMock = jest
        .fn<Promise<IDiscordCommandFlagSuccess>, unknown[]>()
        .mockResolvedValue(discordCommandFlagSuccess);
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: [
          new DiscordCommandBooleanFlag<DummyFlagEnum>({
            action: createMock<DiscordCommandFlagActionBoolean>({
              execute: actionMock,
            }),
            description: ``,
            name: DummyFlagEnum.ALPHA,
            shortcuts: [DummyFlagEnum.BETA],
          }),
        ],
      });
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      messageFlags = `--alpha-flag=true`;

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
        messageFlags = `--alpha-flag=true`;
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
          messageFlags = `--alpha-flag=true`;
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
            message: `context-[dummy-id] text-handling value-alpha-flag flag...`,
          } as ILoggerLog);
        });

        it(`should execute the flag action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual([discordCommandFlagSuccess]);
          expect(actionMock).toHaveBeenCalledTimes(1);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage, `true`);
        });

        it(`should log about successfully handled the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual([discordCommandFlagSuccess]);
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
        messageFlags = `-beta-flag`;
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
          messageFlags = `-beta-flag`;
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
            message: `context-[dummy-id] text-handling value-beta-flag flag...`,
          } as ILoggerLog);
        });

        it(`should execute the flag action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual([discordCommandFlagSuccess]);
          expect(actionMock).toHaveBeenCalledTimes(1);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage, undefined);
        });

        it(`should log about successfully handled the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual([discordCommandFlagSuccess]);
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
        messageFlags = `--alpha-flag=true --alpha-flag=true`;
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
          messageFlags = `--alpha-flag=true --alpha-flag=true`;
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
            message: `context-[dummy-id] text-handling value-alpha-flag flag...`,
          } as ILoggerLog);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-alpha-flag flag...`,
          } as ILoggerLog);
        });

        it(`should execute the flags action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual([
            discordCommandFlagSuccess,
            discordCommandFlagSuccess,
          ]);
          expect(actionMock).toHaveBeenCalledTimes(2);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage, `true`);
        });

        it(`should log about successfully handled the given flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual([
            discordCommandFlagSuccess,
            discordCommandFlagSuccess,
          ]);
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
        messageFlags = `-beta-flag -beta-flag`;
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
          messageFlags = `-beta-flag -beta-flag`;
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
            message: `context-[dummy-id] text-handling value-beta-flag flag...`,
          } as ILoggerLog);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordCommandFlags`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-handling value-beta-flag flag...`,
          } as ILoggerLog);
        });

        it(`should execute the flag actions`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual([
            discordCommandFlagSuccess,
            discordCommandFlagSuccess,
          ]);
          expect(actionMock).toHaveBeenCalledTimes(2);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage, undefined);
        });

        it(`should log about successfully handled the given shortcut flags`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          const result = await discordCommandFlags.executeAll(
            anyDiscordMessage,
            messageFlags
          );

          expect(result).toStrictEqual([
            discordCommandFlagSuccess,
            discordCommandFlagSuccess,
          ]);
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
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let alphaArgument: DiscordCommandFirstArgument<DummyFirstArgumentEnum>;
    let anyDiscordMessage: IAnyDiscordMessage;
    let messageFlag: IDiscordMessageFlag;
    let discordCommandFlagSuccess: IDiscordCommandFlagSuccess;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let actionMock: jest.Mock<Promise<IDiscordCommandFlagSuccess>, unknown[]>;

    beforeEach((): void => {
      alphaArgument = new DiscordCommandFirstArgument<DummyFirstArgumentEnum>({
        description: ``,
        name: DummyFirstArgumentEnum.ALPHA,
        shortcuts: [DummyFirstArgumentEnum.BETA],
      });
      discordCommandFlagSuccess = createMock<IDiscordCommandFlagSuccess>();
      actionMock = jest
        .fn<Promise<IDiscordCommandFlagSuccess>, unknown[]>()
        .mockResolvedValue(discordCommandFlagSuccess);
      discordCommandFlags = new DiscordCommandFlags<DummyFlagEnum>({
        command: alphaArgument,
        flags: [
          new DiscordCommandBooleanFlag<DummyFlagEnum>({
            action: createMock<DiscordCommandFlagActionBoolean>({
              execute: actionMock,
            }),
            description: ``,
            name: DummyFlagEnum.ALPHA,
            shortcuts: [DummyFlagEnum.BETA],
          }),
        ],
      });
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      messageFlag = `--alpha-flag=true`;

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
        message: `context-[dummy-id] text-handling value-alpha-flag flag...`,
      } as ILoggerLog);
    });

    describe(`when the given message flag is a flag with a value`, (): void => {
      beforeEach((): void => {
        messageFlag = `--alpha-flag=true`;
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
          messageFlag = `--alpha-flag=true`;
        });

        it(`should execute the flag action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.execute(
            anyDiscordMessage,
            messageFlag
          );

          expect(result).toStrictEqual(discordCommandFlagSuccess);
          expect(actionMock).toHaveBeenCalledTimes(1);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage, `true`);
        });
      });
    });

    describe(`when the given message flag is a shortcut flag`, (): void => {
      beforeEach((): void => {
        messageFlag = `-beta-flag`;
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
          messageFlag = `-beta-flag`;
        });

        it(`should execute the flag action`, async (): Promise<void> => {
          expect.assertions(3);

          const result = await discordCommandFlags.execute(
            anyDiscordMessage,
            messageFlag
          );

          expect(result).toStrictEqual(discordCommandFlagSuccess);
          expect(actionMock).toHaveBeenCalledTimes(1);
          expect(actionMock).toHaveBeenCalledWith(anyDiscordMessage, undefined);
        });
      });
    });
  });
});
