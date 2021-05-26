import { Messages } from './messages';
import { IObject } from '../../../../types/object';
import { DiscordSoniaEmotionalStateEnum } from '../../emotional-states/enums/discord-sonia-emotional-state.enum';
import { IMessageConfig } from '../interfaces/message-config';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

enum DummyEnum {
  WITH_VAR = `dummy message with {{ variable }}`,
}

describe(`Messages`, (): void => {
  let messages: Messages<DiscordSoniaEmotionalStateEnum, IObject>;

  describe(`constructor()`, (): void => {
    describe(`when the class is created with a default message`, (): void => {
      it(`should update the default message inside the class`, (): void => {
        expect.assertions(1);

        messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
          createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>({
            defaultMessage: DiscordSoniaEmotionalStateEnum.CRAZY,
          })
        );

        expect(messages.getDefaultMessage()).toStrictEqual(DiscordSoniaEmotionalStateEnum.CRAZY);
      });
    });

    describe(`when the class is created with messages`, (): void => {
      it(`should update the messages inside the class`, (): void => {
        expect.assertions(1);

        messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
          createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>({
            messages: DiscordSoniaEmotionalStateEnum,
          })
        );

        expect(messages.getMessages()).toStrictEqual(DiscordSoniaEmotionalStateEnum);
      });
    });

    describe(`when the class is created with params`, (): void => {
      it(`should update the params inside the class`, (): void => {
        expect.assertions(1);

        messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
          createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum, IObject>>({
            params: {
              key1: `value1`,
            },
          })
        );

        expect(messages.getParams()).toStrictEqual({
          key1: `value1`,
        });
      });
    });
  });

  describe(`getDefaultMessage()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
        createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
      );
    });

    it(`should return the default message`, (): void => {
      expect.assertions(1);
      messages.setDefaultMessage(DiscordSoniaEmotionalStateEnum.CRAZY);

      const result = messages.getDefaultMessage();

      expect(result).toStrictEqual(DiscordSoniaEmotionalStateEnum.CRAZY);
    });
  });

  describe(`setDefaultMessage()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
        createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
      );
    });

    it(`should update the default message with the given one`, (): void => {
      expect.assertions(1);

      messages.setDefaultMessage(DiscordSoniaEmotionalStateEnum.CRAZY);

      expect(messages.getDefaultMessage()).toStrictEqual(DiscordSoniaEmotionalStateEnum.CRAZY);
    });
  });

  describe(`getMessages()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
        createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
      );
    });

    it(`should return the messages`, (): void => {
      expect.assertions(1);
      messages.setMessages(DiscordSoniaEmotionalStateEnum);

      const result = messages.getMessages();

      expect(result).toStrictEqual(DiscordSoniaEmotionalStateEnum);
    });
  });

  describe(`setMessages()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
        createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
      );
    });

    it(`should update the messages with the given ones`, (): void => {
      expect.assertions(1);

      messages.setMessages(DiscordSoniaEmotionalStateEnum);

      expect(messages.getMessages()).toStrictEqual(DiscordSoniaEmotionalStateEnum);
    });
  });

  describe(`getParams()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
        createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
      );
    });

    it(`should return the params`, (): void => {
      expect.assertions(1);
      messages.setParams({
        key1: `value1`,
      });

      const result = messages.getParams();

      expect(result).toStrictEqual({
        key1: `value1`,
      });
    });
  });

  describe(`setParams()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
        createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
      );
    });

    it(`should update the params with the given ones`, (): void => {
      expect.assertions(1);

      messages.setParams({
        key1: `value1`,
      });

      expect(messages.getParams()).toStrictEqual({
        key1: `value1`,
      });
    });
  });

  describe(`getRandomMessage()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum, IObject>(
        createHydratedMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>({
          defaultMessage: DiscordSoniaEmotionalStateEnum.AGITATED,
        })
      );
    });

    describe(`when there is no messages`, (): void => {
      beforeEach((): void => {
        messages.setMessages({});
      });

      it(`should return the default message instead`, (): void => {
        expect.assertions(1);

        const result = messages.getRandomMessage();

        expect(result).toStrictEqual(DiscordSoniaEmotionalStateEnum.AGITATED);
      });
    });

    describe(`when there is multiple messages`, (): void => {
      beforeEach((): void => {
        messages.setMessages(DiscordSoniaEmotionalStateEnum);
      });

      it(`should return one of the message`, (): void => {
        expect.assertions(1);

        const result = messages.getRandomMessage();

        expect(result).toBeOneOf(_.flatten(_.values(DiscordSoniaEmotionalStateEnum)));
      });
    });
  });

  describe(`getHumanizedRandomMessage()`, (): void => {
    let messages: Messages<DummyEnum, IObject>;

    beforeEach((): void => {
      messages = new Messages<DummyEnum, IObject>(
        createHydratedMock<IMessageConfig<DummyEnum>>({
          defaultMessage: DummyEnum.WITH_VAR,
        })
      );
    });

    describe(`when there is no messages`, (): void => {
      beforeEach((): void => {
        messages.setMessages({});
      });

      describe(`when there is no params`, (): void => {
        beforeEach((): void => {
          messages.setParams(_.stubObject());
        });

        describe(`when there is no given params`, (): void => {
          it(`should return the default message instead without replacing the variable`, (): void => {
            expect.assertions(1);

            const result = messages.getHumanizedRandomMessage();

            expect(result).toStrictEqual(`dummy message with {{ variable }}`);
          });
        });

        describe(`when there is a given params but not matching the replacement`, (): void => {
          it(`should return the default message instead without replacing the variable`, (): void => {
            expect.assertions(1);

            const result = messages.getHumanizedRandomMessage({
              key2: `value2`,
            });

            expect(result).toStrictEqual(`dummy message with {{ variable }}`);
          });
        });

        describe(`when there is a given params matching the replacement`, (): void => {
          it(`should return the default message instead and replace the variable`, (): void => {
            expect.assertions(1);

            const result = messages.getHumanizedRandomMessage({
              variable: `replacement argument`,
            });

            expect(result).toStrictEqual(`dummy message with replacement argument`);
          });
        });
      });

      describe(`when there is params but not matching the replacement`, (): void => {
        beforeEach((): void => {
          messages.setParams({
            key1: `value1`,
          });
        });

        describe(`when there is no given params`, (): void => {
          it(`should return the default message instead without replacing the variable`, (): void => {
            expect.assertions(1);

            const result = messages.getHumanizedRandomMessage();

            expect(result).toStrictEqual(`dummy message with {{ variable }}`);
          });
        });

        describe(`when there is a given params but not matching the replacement`, (): void => {
          it(`should return the default message instead without replacing the variable`, (): void => {
            expect.assertions(1);

            const result = messages.getHumanizedRandomMessage({
              key2: `value2`,
            });

            expect(result).toStrictEqual(`dummy message with {{ variable }}`);
          });
        });

        describe(`when there is a given params matching the replacement`, (): void => {
          it(`should return the default message instead and replace the variable`, (): void => {
            expect.assertions(1);

            const result = messages.getHumanizedRandomMessage({
              variable: `replacement argument`,
            });

            expect(result).toStrictEqual(`dummy message with replacement argument`);
          });
        });
      });

      describe(`when there is params matching the replacement`, (): void => {
        beforeEach((): void => {
          messages.setParams({
            variable: `replacement`,
          });
        });

        describe(`when there is no given params`, (): void => {
          it(`should return the default message instead and replace the variable`, (): void => {
            expect.assertions(1);

            const result = messages.getHumanizedRandomMessage();

            expect(result).toStrictEqual(`dummy message with replacement`);
          });
        });

        describe(`when there is a given params but not matching the replacement`, (): void => {
          it(`should return the default message instead without replacing the variable`, (): void => {
            expect.assertions(1);

            const result = messages.getHumanizedRandomMessage({
              key2: `value2`,
            });

            expect(result).toStrictEqual(`dummy message with {{ variable }}`);
          });
        });

        describe(`when there is a given params matching the replacement`, (): void => {
          it(`should return the default message instead and replace the variable`, (): void => {
            expect.assertions(1);

            const result = messages.getHumanizedRandomMessage({
              variable: `replacement argument`,
            });

            expect(result).toStrictEqual(`dummy message with replacement argument`);
          });
        });
      });
    });
  });
});
