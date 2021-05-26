import { DiscordCommandFirstArgument } from './discord-command-first-argument';
import { DiscordCommandFirstArguments } from './discord-command-first-arguments';
import { IDiscordCommandFirstArgument } from '../../../interfaces/commands/discord-command-first-argument';
import { DiscordMessageCommandFeatureNameEnum } from '../../../services/command/feature/enums/discord-message-command-feature-name.enum';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordCommandFirstArguments`, (): void => {
  let discordCommandFirstArguments: DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>;

  describe(`constructor()`, (): void => {
    describe(`when the class is created with some arguments`, (): void => {
      it(`should update the arguments inside the class`, (): void => {
        expect.assertions(1);
        const firstArguments = createHydratedMock<
          DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]
        >();

        discordCommandFirstArguments = new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>(
          firstArguments
        );

        expect(discordCommandFirstArguments.getArguments()).toStrictEqual(firstArguments);
      });
    });
  });

  describe(`getArguments()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArguments = new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>()
      );
    });

    it(`should return the arguments`, (): void => {
      expect.assertions(1);
      const firstArguments = createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>();
      discordCommandFirstArguments.setArguments(firstArguments);

      const result = discordCommandFirstArguments.getArguments();

      expect(result).toStrictEqual(firstArguments);
    });
  });

  describe(`setArguments()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArguments = new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>()
      );
    });

    it(`should update the arguments with the given ones`, (): void => {
      expect.assertions(1);
      const firstArguments = createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>();

      discordCommandFirstArguments.setArguments(firstArguments);

      expect(discordCommandFirstArguments.getArguments()).toStrictEqual(firstArguments);
    });
  });

  describe(`getRandomArgument()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArguments = new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>()
      );
    });

    describe(`when there is no arguments`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArguments.setArguments([]);
      });

      it(`should return undefined`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getRandomArgument();

        expect(result).toBeUndefined();
      });
    });

    describe(`when there is one argument`, (): void => {
      let firstArgument: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument = createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>();
        discordCommandFirstArguments.setArguments([firstArgument]);
      });

      it(`should return the argument`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getRandomArgument();

        expect(result).toStrictEqual(firstArgument);
      });
    });

    describe(`when there is multiple arguments`, (): void => {
      let firstArgument1: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;
      let firstArgument2: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument1 = createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>();
        firstArgument2 = createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>();
        discordCommandFirstArguments.setArguments([firstArgument1, firstArgument2]);
      });

      it(`should return one of the argument`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getRandomArgument();

        expect(result).toBeOneOf([firstArgument1, firstArgument2]);
      });
    });
  });

  describe(`getRandomArgumentUsageExample()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArguments = new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>()
      );
    });

    describe(`when there is no arguments`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArguments.setArguments([]);
      });

      it(`should return undefined`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getRandomArgumentUsageExample();

        expect(result).toBeUndefined();
      });
    });

    describe(`when there is one argument`, (): void => {
      let firstArgument: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument]);
      });

      it(`should return the argument name on lower case`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getRandomArgumentUsageExample();

        expect(result).toStrictEqual(`noon`);
      });
    });
  });

  describe(`getAllArgumentsNameExample()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArguments = new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>()
      );
    });

    describe(`when there is no arguments`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArguments.setArguments([]);
      });

      it(`should return an empty string`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsNameExample();

        expect(result).toStrictEqual(``);
      });
    });

    describe(`when there is one argument`, (): void => {
      let firstArgument: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument]);
      });

      it(`should return a string containing the name of the argument on lower case wrapped with backtick`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsNameExample();

        expect(result).toStrictEqual(`\`noon\``);
      });
    });

    describe(`when there is two arguments`, (): void => {
      let firstArgument1: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;
      let firstArgument2: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument1 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
          })
        );
        firstArgument2 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.N,
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument1, firstArgument2]);
      });

      it(`should return a string containing the names of the arguments on lower case wrapped with backtick and comma separated`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsNameExample();

        expect(result).toStrictEqual(`\`noon\`, \`n\``);
      });
    });
  });

  describe(`getAllArgumentsNameWithShortcutsExample()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArguments = new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>()
      );
    });

    describe(`when there is no arguments`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArguments.setArguments([]);
      });

      it(`should return an empty string`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsNameWithShortcutsExample();

        expect(result).toStrictEqual(``);
      });
    });

    describe(`when there is one argument`, (): void => {
      let firstArgument: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument]);
      });

      it(`should return a string containing the name of the argument on lower case wrapped with backtick`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsNameWithShortcutsExample();

        expect(result).toStrictEqual(`\`noon\``);
      });
    });

    describe(`when there is one argument with two shortcuts`, (): void => {
      let firstArgument: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
            shortcuts: [DiscordMessageCommandFeatureNameEnum.N, DiscordMessageCommandFeatureNameEnum.N],
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument]);
      });

      it(`should return a string containing the name and the shortcuts of the argument on lower case wrapped with backtick`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsNameWithShortcutsExample();

        expect(result).toStrictEqual(`\`noon (or n, n)\``);
      });
    });

    describe(`when there is two arguments`, (): void => {
      let firstArgument1: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;
      let firstArgument2: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument1 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
          })
        );
        firstArgument2 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.N,
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument1, firstArgument2]);
      });

      it(`should return a string containing the names of the arguments on lower case wrapped with backtick and comma separated`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsNameWithShortcutsExample();

        expect(result).toStrictEqual(`\`noon\`, \`n\``);
      });
    });

    describe(`when there is two arguments with two shortcuts`, (): void => {
      let firstArgument1: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;
      let firstArgument2: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument1 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
            shortcuts: [DiscordMessageCommandFeatureNameEnum.N, DiscordMessageCommandFeatureNameEnum.N],
          })
        );
        firstArgument2 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.N,
            shortcuts: [DiscordMessageCommandFeatureNameEnum.N, DiscordMessageCommandFeatureNameEnum.N],
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument1, firstArgument2]);
      });

      it(`should return a string containing the names of the arguments on lower case wrapped with backtick and comma separated`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsNameWithShortcutsExample();

        expect(result).toStrictEqual(`\`noon (or n, n)\`, \`n (or n, n)\``);
      });
    });
  });

  describe(`getAllArgumentsLowerCaseName()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArguments = new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>()
      );
    });

    describe(`when there is no arguments`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArguments.setArguments([]);
      });

      it(`should return an empty array`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsLowerCaseName();

        expect(result).toStrictEqual([]);
      });
    });

    describe(`when there is one argument`, (): void => {
      let firstArgument: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument]);
      });

      it(`should return an array containing the name of the argument`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsLowerCaseName();

        expect(result).toStrictEqual([`noon`]);
      });
    });

    describe(`when there is two arguments`, (): void => {
      let firstArgument1: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;
      let firstArgument2: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument1 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
          })
        );
        firstArgument2 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.N,
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument1, firstArgument2]);
      });

      it(`should return an array containing the names of the arguments`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsLowerCaseName();

        expect(result).toStrictEqual([`noon`, `n`]);
      });
    });
  });

  describe(`getAllArgumentsLowerCaseNameWithShortcuts()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArguments = new DiscordCommandFirstArguments<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>[]>()
      );
    });

    describe(`when there is no arguments`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArguments.setArguments([]);
      });

      it(`should return an empty array`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([]);
      });
    });

    describe(`when there is one argument`, (): void => {
      let firstArgument: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument]);
      });

      it(`should return an array containing the name of the argument`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([`noon`]);
      });
    });

    describe(`when there is two arguments with one shortcut each`, (): void => {
      let firstArgument1: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;
      let firstArgument2: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument1 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
            shortcuts: [DiscordMessageCommandFeatureNameEnum.N],
          })
        );
        firstArgument2 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.N,
            shortcuts: [DiscordMessageCommandFeatureNameEnum.NOON],
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument1, firstArgument2]);
      });

      it(`should return an array containing the names of the arguments and the shortcuts`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([`noon`, `n`, `n`, `noon`]);
      });
    });

    describe(`when there is two arguments with two shortcuts each`, (): void => {
      let firstArgument1: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;
      let firstArgument2: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

      beforeEach((): void => {
        firstArgument1 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
            shortcuts: [DiscordMessageCommandFeatureNameEnum.N, DiscordMessageCommandFeatureNameEnum.N],
          })
        );
        firstArgument2 = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.N,
            shortcuts: [DiscordMessageCommandFeatureNameEnum.NOON, DiscordMessageCommandFeatureNameEnum.NOON],
          })
        );
        discordCommandFirstArguments.setArguments([firstArgument1, firstArgument2]);
      });

      it(`should return an array containing the names of the arguments and the shortcuts`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArguments.getAllArgumentsLowerCaseNameWithShortcuts();

        expect(result).toStrictEqual([`noon`, `n`, `n`, `n`, `noon`, `noon`]);
      });
    });
  });
});
