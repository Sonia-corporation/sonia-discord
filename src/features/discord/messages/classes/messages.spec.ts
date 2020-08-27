import _ from "lodash";
import { createMock } from "ts-auto-mock";
import { DiscordSoniaEmotionalStateEnum } from "../../emotional-states/enums/discord-sonia-emotional-state.enum";
import { IMessageConfig } from "../interfaces/message-config";
import { Messages } from "./messages";

describe(`Messages`, (): void => {
  let messages: Messages<DiscordSoniaEmotionalStateEnum>;

  describe(`constructor()`, (): void => {
    describe(`when the class is created with a default message`, (): void => {
      it(`should update the default message inside the class`, (): void => {
        expect.assertions(1);

        messages = new Messages<DiscordSoniaEmotionalStateEnum>(
          createMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>({
            defaultMessage: DiscordSoniaEmotionalStateEnum.CRAZY,
          })
        );

        expect(messages.getDefaultMessage()).toStrictEqual(
          DiscordSoniaEmotionalStateEnum.CRAZY
        );
      });
    });

    describe(`when the class is created with messages`, (): void => {
      it(`should update the messages inside the class`, (): void => {
        expect.assertions(1);

        messages = new Messages<DiscordSoniaEmotionalStateEnum>(
          createMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>({
            messages: DiscordSoniaEmotionalStateEnum,
          })
        );

        expect(messages.getMessages()).toStrictEqual(
          DiscordSoniaEmotionalStateEnum
        );
      });
    });
  });

  describe(`getDefaultMessage()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum>(
        createMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
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
      messages = new Messages<DiscordSoniaEmotionalStateEnum>(
        createMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
      );
    });

    it(`should update the default message with the given one`, (): void => {
      expect.assertions(1);

      messages.setDefaultMessage(DiscordSoniaEmotionalStateEnum.CRAZY);

      expect(messages.getDefaultMessage()).toStrictEqual(
        DiscordSoniaEmotionalStateEnum.CRAZY
      );
    });
  });

  describe(`getMessages()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum>(
        createMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
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
      messages = new Messages<DiscordSoniaEmotionalStateEnum>(
        createMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>()
      );
    });

    it(`should update the messages with the given ones`, (): void => {
      expect.assertions(1);

      messages.setMessages(DiscordSoniaEmotionalStateEnum);

      expect(messages.getMessages()).toStrictEqual(
        DiscordSoniaEmotionalStateEnum
      );
    });
  });

  describe(`getRandomMessage()`, (): void => {
    beforeEach((): void => {
      messages = new Messages<DiscordSoniaEmotionalStateEnum>(
        createMock<IMessageConfig<DiscordSoniaEmotionalStateEnum>>({
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

        expect(result).toBeOneOf(
          _.flatten(_.values(DiscordSoniaEmotionalStateEnum))
        );
      });
    });
  });
});
