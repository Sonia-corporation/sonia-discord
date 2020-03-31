import { Message } from "discord.js";
import { createMock } from "ts-auto-mock";
import { DISCORD_MESSAGE_CONFIG } from "../constants/discord-message-config";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { DiscordMessageCommandService } from "./discord-message-command-service";
import { DiscordMessageCommandVersionService } from "./discord-message-command-version-service";

describe(`DiscordMessageCommandService`, (): void => {
  let service: DiscordMessageCommandService;
  let discordMessageCommandVersionService: DiscordMessageCommandVersionService;

  beforeEach((): void => {
    service = DiscordMessageCommandService.getInstance();
    discordMessageCommandVersionService = DiscordMessageCommandVersionService.getInstance();
  });

  describe(`hasCommand()`, (): void => {
    let message: string;

    beforeEach((): void => {
      message = `dummy-message`;

      DISCORD_MESSAGE_CONFIG.command.prefix = `--`;
    });

    describe(`when the given message does not contains the version command`, (): void => {
      beforeEach((): void => {
        message = `dummy-message`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.hasCommand(message);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given message contains the version command`, (): void => {
      beforeEach((): void => {
        message = `--version`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCommand(message);

        expect(result).toStrictEqual(true);
      });
    });
  });

  describe(`hasVersionCommand()`, (): void => {
    let message: string;

    beforeEach((): void => {
      message = `dummy-message`;
    });

    describe(`when the message command prefix is "@"`, (): void => {
      beforeEach((): void => {
        DISCORD_MESSAGE_CONFIG.command.prefix = `@`;
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@v`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--v`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!v`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@v dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--v dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!v dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@version dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--version dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!version dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@V`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--V`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!V`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@V dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--V dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!V dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@VERSION`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--VERSION`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!VERSION`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@VERSION dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--VERSION dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!VERSION dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });
    });

    describe(`when the message command prefix is "--" or "!"`, (): void => {
      beforeEach((): void => {
        DISCORD_MESSAGE_CONFIG.command.prefix = [`--`, `!`];
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ver`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ver dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@v`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--v`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!v`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@v dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--v dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!v dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--version`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@version dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--version dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!version dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@V`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--V`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!V`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@V dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--V dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!V dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@VERSION`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--VERSION`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!VERSION`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@VERSION dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--VERSION dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the version command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!VERSION dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasVersionCommand(message);

          expect(result).toStrictEqual(true);
        });
      });
    });
  });

  describe(`handleVersionCommand()`, (): void => {
    let anyDiscordMessage: Message;
    let discordMessageResponse: IDiscordMessageResponse;

    let discordMessageCommandVersionServiceHandleSpy: jest.SpyInstance;

    beforeEach((): void => {
      // @todo replace with real mock
      anyDiscordMessage = {} as Message;
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      discordMessageCommandVersionServiceHandleSpy = jest
        .spyOn(discordMessageCommandVersionService, `handle`)
        .mockReturnValue(discordMessageResponse);
    });

    it(`should handle the message command version`, (): void => {
      expect.assertions(2);

      service.handleVersionCommand(anyDiscordMessage);

      expect(
        discordMessageCommandVersionServiceHandleSpy
      ).toHaveBeenCalledTimes(1);
      expect(discordMessageCommandVersionServiceHandleSpy).toHaveBeenCalledWith(
        anyDiscordMessage
      );
    });

    it(`should return a message response`, (): void => {
      expect.assertions(1);

      const result = service.handleVersionCommand(anyDiscordMessage);

      expect(result).toStrictEqual(discordMessageResponse);
    });
  });

  describe(`handleCommands()`, (): void => {
    let anyDiscordMessage: Message;
    let discordMessageResponse: IDiscordMessageResponse;

    let discordMessageCommandVersionServiceHandleSpy: jest.SpyInstance;

    beforeEach((): void => {
      // @todo replace with real mock
      anyDiscordMessage = {} as Message;
      discordMessageResponse = createMock<IDiscordMessageResponse>();
      DISCORD_MESSAGE_CONFIG.command.prefix = `--`;

      discordMessageCommandVersionServiceHandleSpy = jest
        .spyOn(discordMessageCommandVersionService, `handle`)
        .mockReturnValue(discordMessageResponse);
    });

    describe(`when the given discord message has no content`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage.content = ``;
      });

      it(`should not handle the version command`, (): void => {
        expect.assertions(1);

        service.handleCommands(anyDiscordMessage);

        expect(
          discordMessageCommandVersionServiceHandleSpy
        ).not.toHaveBeenCalled();
      });

      it(`should return null`, (): void => {
        expect.assertions(1);

        const result = service.handleCommands(anyDiscordMessage);

        expect(result).toBeNull();
      });
    });

    describe(`when the given discord message has content`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage.content = `dummy-content`;
      });

      describe(`when the message does not contains the version command`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `dummy-content`;
        });

        it(`should not handle the version command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandVersionServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should return null`, (): void => {
          expect.assertions(1);

          const result = service.handleCommands(anyDiscordMessage);

          expect(result).toBeNull();
        });
      });

      describe(`when the message contains the version command`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `--version`;
        });

        it(`should handle the version command`, (): void => {
          expect.assertions(2);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandVersionServiceHandleSpy
          ).toHaveBeenCalledTimes(1);
          expect(
            discordMessageCommandVersionServiceHandleSpy
          ).toHaveBeenCalledWith(anyDiscordMessage);
        });

        it(`should return the Discord message response for the version command`, (): void => {
          expect.assertions(1);

          const result = service.handleCommands(anyDiscordMessage);

          expect(result).toStrictEqual(discordMessageResponse);
        });
      });
    });
  });
});
