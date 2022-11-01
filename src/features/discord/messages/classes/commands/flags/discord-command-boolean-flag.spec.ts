import { DiscordCommandBooleanFlag } from './discord-command-boolean-flag';
import { DiscordCommandFlagActionBoolean } from './discord-command-flag-action-boolean';
import { DiscordCommandFlags } from './discord-command-flags';
import { DiscordCommandFlagTypeEnum } from '../../../enums/commands/discord-command-flag-type.enum';
import { IDiscordCommandFlag } from '../../../interfaces/commands/flags/discord-command-flag';
import { IDiscordCommandFlagError } from '../../../interfaces/commands/flags/discord-command-flag-error';
import { IDiscordCommandFlagSuccess } from '../../../interfaces/commands/flags/discord-command-flag-success';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';
import { createMock } from 'ts-auto-mock';

enum DummyFlagEnum {
  ALPHA = `alpha-flag`,
  BETA = `beta-flag`,
  CHARLIE = `charlie-flag`,
}

describe(`DiscordCommandBooleanFlag`, (): void => {
  let discordCommandFlag: DiscordCommandBooleanFlag<DummyFlagEnum>;

  describe(`constructor()`, (): void => {
    describe(`when the class is created with an action`, (): void => {
      it(`should update the action inside the class`, (): void => {
        expect.assertions(1);
        const action = createMock<DiscordCommandFlagActionBoolean<DummyFlagEnum>>({
          execute: (): Promise<IDiscordCommandFlagSuccess> => Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
        });

        discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>({
            action,
          })
        );

        expect(discordCommandFlag.getAction()).toStrictEqual(action);
      });
    });

    describe(`when the class is created with a description`, (): void => {
      it(`should update the description inside the class`, (): void => {
        expect.assertions(1);

        discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>({
            description: `dummy-description`,
          })
        );

        expect(discordCommandFlag.getDescription()).toBe(`dummy-description`);
      });
    });

    describe(`when the class is created with a name`, (): void => {
      it(`should update the name inside the class`, (): void => {
        expect.assertions(1);

        discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
          createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>({
            name: DummyFlagEnum.ALPHA,
          })
        );

        expect(discordCommandFlag.getName()).toStrictEqual(DummyFlagEnum.ALPHA);
      });
    });

    describe(`when the class is created with some shortcuts`, (): void => {
      describe(`when there is no shortcuts`, (): void => {
        it(`should remove the shortcuts inside the class`, (): void => {
          expect.assertions(1);

          discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
            createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>({
              shortcuts: undefined,
            })
          );

          expect(discordCommandFlag.getShortcuts()).toBeUndefined();
        });
      });

      describe(`when there is some shortcuts`, (): void => {
        it(`should update the shortcuts inside the class`, (): void => {
          expect.assertions(1);

          discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
            createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>({
              shortcuts: [DummyFlagEnum.BETA],
            })
          );

          expect(discordCommandFlag.getShortcuts()).toStrictEqual([DummyFlagEnum.BETA]);
        });
      });
    });
  });

  describe(`getAction()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should return the action`, (): void => {
      expect.assertions(1);
      const action = createMock<DiscordCommandFlagActionBoolean<DummyFlagEnum>>({
        execute: (): Promise<IDiscordCommandFlagSuccess> => Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
      });
      discordCommandFlag.setAction(action);

      const result = discordCommandFlag.getAction();

      expect(result).toStrictEqual(action);
    });
  });

  describe(`setAction()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should update the action with the given one`, (): void => {
      expect.assertions(1);
      const action = createMock<DiscordCommandFlagActionBoolean<DummyFlagEnum>>({
        execute: (): Promise<IDiscordCommandFlagSuccess> => Promise.resolve(createMock<IDiscordCommandFlagSuccess>()),
      });

      discordCommandFlag.setAction(action);

      expect(discordCommandFlag.getAction()).toStrictEqual(action);
    });
  });

  describe(`getDescription()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should return the description`, (): void => {
      expect.assertions(1);
      discordCommandFlag.setDescription(`dummy-description`);

      const result = discordCommandFlag.getDescription();

      expect(result).toBe(`dummy-description`);
    });
  });

  describe(`setDescription()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should update the description with the given one`, (): void => {
      expect.assertions(1);

      discordCommandFlag.setDescription(`dummy-description`);

      expect(discordCommandFlag.getDescription()).toBe(`dummy-description`);
    });
  });

  describe(`getName()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should return the name`, (): void => {
      expect.assertions(1);
      discordCommandFlag.setName(DummyFlagEnum.ALPHA);

      const result = discordCommandFlag.getName();

      expect(result).toStrictEqual(DummyFlagEnum.ALPHA);
    });
  });

  describe(`getLowerCaseName()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should return the lower case name`, (): void => {
      expect.assertions(1);
      discordCommandFlag.setName(DummyFlagEnum.ALPHA);

      const result = discordCommandFlag.getLowerCaseName();

      expect(result).toBe(`alpha-flag`);
    });
  });

  describe(`getHumanizedName()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should return the capitalized case name`, (): void => {
      expect.assertions(1);
      discordCommandFlag.setName(DummyFlagEnum.ALPHA);

      const result = discordCommandFlag.getHumanizedName();

      expect(result).toBe(`Alpha-flag`);
    });
  });

  describe(`setName()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should update the name with the given one`, (): void => {
      expect.assertions(1);

      discordCommandFlag.setName(DummyFlagEnum.ALPHA);

      expect(discordCommandFlag.getName()).toStrictEqual(DummyFlagEnum.ALPHA);
    });
  });

  describe(`getOpposites()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should return the opposites`, (): void => {
      expect.assertions(1);
      discordCommandFlag.setOpposites([DummyFlagEnum.BETA]);

      const result = discordCommandFlag.getOpposites();

      expect(result).toStrictEqual([DummyFlagEnum.BETA]);
    });
  });

  describe(`setOpposites()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should update the opposites with the given one`, (): void => {
      expect.assertions(1);

      discordCommandFlag.setOpposites([DummyFlagEnum.BETA]);

      expect(discordCommandFlag.getOpposites()).toStrictEqual([DummyFlagEnum.BETA]);
    });
  });

  describe(`getShortcuts()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should return the shortcuts`, (): void => {
      expect.assertions(1);
      discordCommandFlag.setShortcuts([DummyFlagEnum.BETA]);

      const result = discordCommandFlag.getShortcuts();

      expect(result).toStrictEqual([DummyFlagEnum.BETA]);
    });
  });

  describe(`getLowerCaseShortcuts()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should return the shortcuts as lower case`, (): void => {
      expect.assertions(1);
      discordCommandFlag.setShortcuts([DummyFlagEnum.ALPHA, DummyFlagEnum.BETA]);

      const result = discordCommandFlag.getShortcuts();

      expect(result).toStrictEqual([`alpha-flag`, `beta-flag`]);
    });
  });

  describe(`setShortcuts()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should update the shortcuts with the given one`, (): void => {
      expect.assertions(1);

      discordCommandFlag.setShortcuts([DummyFlagEnum.BETA]);

      expect(discordCommandFlag.getShortcuts()).toStrictEqual([DummyFlagEnum.BETA]);
    });
  });

  describe(`getType()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should return the type`, (): void => {
      expect.assertions(1);
      discordCommandFlag.setType(DiscordCommandFlagTypeEnum.BOOLEAN);

      const result = discordCommandFlag.getType();

      expect(result).toStrictEqual(DiscordCommandFlagTypeEnum.BOOLEAN);
    });
  });

  describe(`setType()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
    });

    it(`should update the type with the given one`, (): void => {
      expect.assertions(1);

      discordCommandFlag.setType(DiscordCommandFlagTypeEnum.BOOLEAN);

      expect(discordCommandFlag.getType()).toStrictEqual(DiscordCommandFlagTypeEnum.BOOLEAN);
    });
  });

  describe(`getLowerCaseNameAndShortcutsExample()`, (): void => {
    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>({
          name: DummyFlagEnum.ALPHA,
        })
      );
    });

    describe(`when the shortcuts are undefined`, (): void => {
      beforeEach((): void => {
        discordCommandFlag.setShortcuts(undefined);
      });

      it(`should return only the lower case name`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getLowerCaseNameAndShortcutsExample();

        expect(result).toBe(`--alpha-flag`);
      });
    });

    describe(`when there is no shortcuts`, (): void => {
      beforeEach((): void => {
        discordCommandFlag.setShortcuts([]);
      });

      it(`should return only the lower case name`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getLowerCaseNameAndShortcutsExample();

        expect(result).toBe(`--alpha-flag`);
      });
    });

    describe(`when there is one shortcut`, (): void => {
      beforeEach((): void => {
        discordCommandFlag.setShortcuts([DummyFlagEnum.BETA]);
      });

      it(`should return the lower case name and the shortcut wrapped in parentheses`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getLowerCaseNameAndShortcutsExample();

        expect(result).toBe(`--alpha-flag (or -beta-flag)`);
      });
    });

    describe(`when there is two shortcuts`, (): void => {
      beforeEach((): void => {
        discordCommandFlag.setShortcuts([DummyFlagEnum.BETA, DummyFlagEnum.CHARLIE]);
      });

      it(`should return the lower case name and the shortcuts wrapped in parentheses and separator with comma`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getLowerCaseNameAndShortcutsExample();

        expect(result).toBe(`--alpha-flag (or -beta-flag, -charlie-flag)`);
      });
    });
  });

  describe(`isValid()`, (): void => {
    let messageFlag: IDiscordMessageFlag;

    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>({
          name: DummyFlagEnum.ALPHA,
        })
      );
    });

    describe(`when the given flag is empty`, (): void => {
      beforeEach((): void => {
        messageFlag = ``;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.isValid(messageFlag);

        expect(result).toBe(false);
      });
    });

    describe(`when the given flag is "alpha-flag"`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.isValid(messageFlag);

        expect(result).toBe(false);
      });
    });

    describe(`when the given flag is "alpha-flag="`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag=`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.isValid(messageFlag);

        expect(result).toBe(false);
      });
    });

    describe(`when the given flag is "alpha-flag=dummy"`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag=dummy`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.isValid(messageFlag);

        expect(result).toBe(false);
      });
    });

    describe(`when the given flag is "alpha-flag=true"`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag=true`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.isValid(messageFlag);

        expect(result).toBe(true);
      });
    });

    describe(`when the given flag is "alpha-flag=false"`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag=false`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.isValid(messageFlag);

        expect(result).toBe(true);
      });
    });
  });

  describe(`getInvalidFlagError()`, (): void => {
    let messageFlag: IDiscordMessageFlag;

    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>({
          name: DummyFlagEnum.ALPHA,
        })
      );
    });

    describe(`when the given flag is empty`, (): void => {
      beforeEach((): void => {
        messageFlag = ``;
      });

      it(`should return an error about not having specified a value`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toStrictEqual({
          description: `The flag \`\` does not have a value. Specify either \`true\` or \`false\`.`,
          isUnknown: false,
          name: `Invalid boolean flag`,
        } as IDiscordCommandFlagError);
      });
    });

    describe(`when the given flag is "alpha-flag"`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag`;
      });

      it(`should return an error about not having specified a value`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toStrictEqual({
          description: `The flag \`alpha-flag\` does not have a value. Specify either \`true\` or \`false\`.`,
          isUnknown: false,
          name: `Invalid boolean flag`,
        } as IDiscordCommandFlagError);
      });
    });

    describe(`when the given flag is "ALPHA-FLAG"`, (): void => {
      beforeEach((): void => {
        messageFlag = `ALPHA-FLAG`;
      });

      it(`should return an error about not having specified a value`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toStrictEqual({
          description: `The flag \`ALPHA-FLAG\` does not have a value. Specify either \`true\` or \`false\`.`,
          isUnknown: false,
          name: `Invalid boolean flag`,
        } as IDiscordCommandFlagError);
      });
    });

    describe(`when the given flag is "alpha-flag="`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag=`;
      });

      it(`should return an error about not having specified a valid value`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toStrictEqual({
          description: `The flag \`alpha-flag\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
          isUnknown: false,
          name: `Invalid boolean flag`,
        } as IDiscordCommandFlagError);
      });
    });

    describe(`when the given flag is "ALPHA-FLAG="`, (): void => {
      beforeEach((): void => {
        messageFlag = `ALPHA-FLAG=`;
      });

      it(`should return an error about not having specified a valid value`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toStrictEqual({
          description: `The flag \`ALPHA-FLAG\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
          isUnknown: false,
          name: `Invalid boolean flag`,
        } as IDiscordCommandFlagError);
      });
    });

    describe(`when the given flag is "alpha-flag=dummy"`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag=dummy`;
      });

      it(`should return an error about not having specified a valid value`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toStrictEqual({
          description: `The flag \`alpha-flag\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
          isUnknown: false,
          name: `Invalid boolean flag`,
        } as IDiscordCommandFlagError);
      });
    });

    describe(`when the given flag is "ALPHA-FLAG=DUMMY"`, (): void => {
      beforeEach((): void => {
        messageFlag = `ALPHA-FLAG=DUMMY`;
      });

      it(`should return an error about not having specified a valid value`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toStrictEqual({
          description: `The flag \`ALPHA-FLAG\` does not have a valid value. Use it with either \`true\` or \`false\`.`,
          isUnknown: false,
          name: `Invalid boolean flag`,
        } as IDiscordCommandFlagError);
      });
    });

    describe(`when the given flag is "alpha-flag=true"`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag=true`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toBeNull();
      });
    });

    describe(`when the given flag is "ALPHA-FLAG=TRUE"`, (): void => {
      beforeEach((): void => {
        messageFlag = `ALPHA-FLAG=TRUE`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toBeNull();
      });
    });

    describe(`when the given flag is "alpha-flag=false"`, (): void => {
      beforeEach((): void => {
        messageFlag = `alpha-flag=false`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toBeNull();
      });
    });

    describe(`when the given flag is "ALPHA-FLAG=FALSE"`, (): void => {
      beforeEach((): void => {
        messageFlag = `ALPHA-FLAG=FALSE`;
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = discordCommandFlag.getInvalidFlagError(messageFlag);

        expect(result).toBeNull();
      });
    });
  });

  describe(`executeAction()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let messageFlag: IDiscordMessageFlag;
    let discordCommandFlags: DiscordCommandFlags<DummyFlagEnum>;
    let discordCommandFlagSuccess: IDiscordCommandFlagSuccess;

    beforeEach((): void => {
      discordCommandFlag = new DiscordCommandBooleanFlag<DummyFlagEnum>(
        createMock<IDiscordCommandFlag<DummyFlagEnum, DiscordCommandFlagActionBoolean<DummyFlagEnum>>>()
      );
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
      messageFlag = `--alpha-flag=true`;
      discordCommandFlags = createMock<DiscordCommandFlags<DummyFlagEnum>>();
      discordCommandFlagSuccess = createMock<IDiscordCommandFlagSuccess>();
    });

    it(`should execute the action`, async (): Promise<void> => {
      expect.assertions(1);
      const action = createMock<DiscordCommandFlagActionBoolean<DummyFlagEnum>>({
        execute: (): Promise<IDiscordCommandFlagSuccess> => Promise.resolve(discordCommandFlagSuccess),
      });
      discordCommandFlag.setAction(action);

      const result = await discordCommandFlag.executeAction(anyDiscordMessage, messageFlag, discordCommandFlags);

      expect(result).toStrictEqual(discordCommandFlagSuccess);
    });
  });
});
