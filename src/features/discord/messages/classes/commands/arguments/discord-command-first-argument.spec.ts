import { DiscordCommandFirstArgument } from './discord-command-first-argument';
import { IDiscordCommandFirstArgument } from '../../../interfaces/commands/discord-command-first-argument';
import { DiscordMessageCommandFeatureNameEnum } from '../../../services/command/feature/enums/discord-message-command-feature-name.enum';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordCommandFirstArgument`, (): void => {
  let discordCommandFirstArgument: DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>;

  describe(`constructor()`, (): void => {
    describe(`when the class is created with a description`, (): void => {
      it(`should update the description inside the class`, (): void => {
        expect.assertions(1);

        discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            description: `dummy-description`,
          })
        );

        expect(discordCommandFirstArgument.getDescription()).toStrictEqual(`dummy-description`);
      });
    });

    describe(`when the class is created with a name`, (): void => {
      it(`should update the name inside the class`, (): void => {
        expect.assertions(1);

        discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
          createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
            name: DiscordMessageCommandFeatureNameEnum.NOON,
          })
        );

        expect(discordCommandFirstArgument.getName()).toStrictEqual(DiscordMessageCommandFeatureNameEnum.NOON);
      });
    });

    describe(`when the class is created with some shortcuts`, (): void => {
      describe(`when there is no shortcuts`, (): void => {
        it(`should remove the shortcuts inside the class`, (): void => {
          expect.assertions(1);

          discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
            createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
              shortcuts: undefined,
            })
          );

          expect(discordCommandFirstArgument.getShortcuts()).toBeUndefined();
        });
      });

      describe(`when there is some shortcuts`, (): void => {
        it(`should update the shortcuts inside the class`, (): void => {
          expect.assertions(1);

          discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
            createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
              shortcuts: [DiscordMessageCommandFeatureNameEnum.N],
            })
          );

          expect(discordCommandFirstArgument.getShortcuts()).toStrictEqual([DiscordMessageCommandFeatureNameEnum.N]);
        });
      });
    });
  });

  describe(`getDescription()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>()
      );
    });

    it(`should return the description`, (): void => {
      expect.assertions(1);
      discordCommandFirstArgument.setDescription(`dummy-description`);

      const result = discordCommandFirstArgument.getDescription();

      expect(result).toStrictEqual(`dummy-description`);
    });
  });

  describe(`setDescription()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>()
      );
    });

    it(`should update the description with the given one`, (): void => {
      expect.assertions(1);

      discordCommandFirstArgument.setDescription(`dummy-description`);

      expect(discordCommandFirstArgument.getDescription()).toStrictEqual(`dummy-description`);
    });
  });

  describe(`getName()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>()
      );
    });

    it(`should return the name`, (): void => {
      expect.assertions(1);
      discordCommandFirstArgument.setName(DiscordMessageCommandFeatureNameEnum.NOON);

      const result = discordCommandFirstArgument.getName();

      expect(result).toStrictEqual(DiscordMessageCommandFeatureNameEnum.NOON);
    });
  });

  describe(`getLowerCaseName()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>()
      );
    });

    it(`should return the lower case name`, (): void => {
      expect.assertions(1);
      discordCommandFirstArgument.setName(DiscordMessageCommandFeatureNameEnum.NOON);

      const result = discordCommandFirstArgument.getLowerCaseName();

      expect(result).toStrictEqual(`noon`);
    });
  });

  describe(`setName()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>()
      );
    });

    it(`should update the name with the given one`, (): void => {
      expect.assertions(1);

      discordCommandFirstArgument.setName(DiscordMessageCommandFeatureNameEnum.NOON);

      expect(discordCommandFirstArgument.getName()).toStrictEqual(DiscordMessageCommandFeatureNameEnum.NOON);
    });
  });

  describe(`getShortcuts()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>()
      );
    });

    it(`should return the shortcuts`, (): void => {
      expect.assertions(1);
      discordCommandFirstArgument.setShortcuts([DiscordMessageCommandFeatureNameEnum.N]);

      const result = discordCommandFirstArgument.getShortcuts();

      expect(result).toStrictEqual([DiscordMessageCommandFeatureNameEnum.N]);
    });
  });

  describe(`getLowerCaseShortcuts()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>()
      );
    });

    it(`should return the shortcuts as lower case`, (): void => {
      expect.assertions(1);
      discordCommandFirstArgument.setShortcuts([
        DiscordMessageCommandFeatureNameEnum.NOON,
        DiscordMessageCommandFeatureNameEnum.N,
      ]);

      const result = discordCommandFirstArgument.getShortcuts();

      expect(result).toStrictEqual([`noon`, `n`]);
    });
  });

  describe(`setShortcuts()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>()
      );
    });

    it(`should update the shortcuts with the given one`, (): void => {
      expect.assertions(1);

      discordCommandFirstArgument.setShortcuts([DiscordMessageCommandFeatureNameEnum.N]);

      expect(discordCommandFirstArgument.getShortcuts()).toStrictEqual([DiscordMessageCommandFeatureNameEnum.N]);
    });
  });

  describe(`getLowerCaseNameAndShortcutsExample()`, (): void => {
    beforeEach((): void => {
      discordCommandFirstArgument = new DiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>(
        createHydratedMock<IDiscordCommandFirstArgument<DiscordMessageCommandFeatureNameEnum>>({
          name: DiscordMessageCommandFeatureNameEnum.NOON,
        })
      );
    });

    describe(`when the shortcuts are undefined`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArgument.setShortcuts(undefined);
      });

      it(`should return only the lower case name`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArgument.getLowerCaseNameAndShortcutsExample();

        expect(result).toStrictEqual(`noon`);
      });
    });

    describe(`when there is no shortcuts`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArgument.setShortcuts([]);
      });

      it(`should return only the lower case name`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArgument.getLowerCaseNameAndShortcutsExample();

        expect(result).toStrictEqual(`noon`);
      });
    });

    describe(`when there is one shortcut`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArgument.setShortcuts([DiscordMessageCommandFeatureNameEnum.N]);
      });

      it(`should return the lower case name and the shortcut wrapped in parentheses`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArgument.getLowerCaseNameAndShortcutsExample();

        expect(result).toStrictEqual(`noon (or n)`);
      });
    });

    describe(`when there is two shortcuts`, (): void => {
      beforeEach((): void => {
        discordCommandFirstArgument.setShortcuts([
          DiscordMessageCommandFeatureNameEnum.N,
          DiscordMessageCommandFeatureNameEnum.N,
        ]);
      });

      it(`should return the lower case name and the shortcuts wrapped in parentheses and separator with comma`, (): void => {
        expect.assertions(1);

        const result = discordCommandFirstArgument.getLowerCaseNameAndShortcutsExample();

        expect(result).toStrictEqual(`noon (or n, n)`);
      });
    });
  });
});
