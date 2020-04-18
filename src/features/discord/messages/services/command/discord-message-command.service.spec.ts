import { Message } from "discord.js";
import { createMock } from "ts-auto-mock";
import { IDiscordMessageResponse } from "../../interfaces/discord-message-response";
import { DiscordMessageConfigService } from "../config/discord-message-config.service";
import { DiscordMessageCommandCookieService } from "./discord-message-command-cookie.service";
import { DiscordMessageCommandErrorService } from "./discord-message-command-error.service";
import { DiscordMessageCommandHelpService } from "./discord-message-command-help.service";
import { DiscordMessageCommandService } from "./discord-message-command.service";
import { DiscordMessageCommandVersionService } from "./discord-message-command-version.service";

describe(`DiscordMessageCommandService`, (): void => {
  let service: DiscordMessageCommandService;
  let discordMessageCommandVersionService: DiscordMessageCommandVersionService;
  let discordMessageCommandErrorService: DiscordMessageCommandErrorService;
  let discordMessageCommandHelpService: DiscordMessageCommandHelpService;
  let discordMessageCommandCookieService: DiscordMessageCommandCookieService;
  let discordMessageConfigService: DiscordMessageConfigService;

  let discordMessageConfigServiceGetMessageCommandPrefixSpy: jest.SpyInstance;

  beforeEach((): void => {
    service = DiscordMessageCommandService.getInstance();
    discordMessageCommandVersionService = DiscordMessageCommandVersionService.getInstance();
    discordMessageCommandErrorService = DiscordMessageCommandErrorService.getInstance();
    discordMessageCommandHelpService = DiscordMessageCommandHelpService.getInstance();
    discordMessageCommandCookieService = DiscordMessageCommandCookieService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();

    discordMessageConfigServiceGetMessageCommandPrefixSpy = jest
      .spyOn(discordMessageConfigService, `getMessageCommandPrefix`)
      .mockImplementation();
  });

  describe(`hasCommand()`, (): void => {
    let message: string;

    beforeEach((): void => {
      message = `dummy-message`;

      discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(
        `--`
      );
    });

    describe(`when the given message does not contains a command`, (): void => {
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

    describe(`when the given message contains the shortcut version command`, (): void => {
      beforeEach((): void => {
        message = `--v`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCommand(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message contains the error command`, (): void => {
      beforeEach((): void => {
        message = `--error`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCommand(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message contains the bug command`, (): void => {
      beforeEach((): void => {
        message = `--bug`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCommand(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message contains the help command`, (): void => {
      beforeEach((): void => {
        message = `--help`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCommand(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message contains the shortcut help command`, (): void => {
      beforeEach((): void => {
        message = `--h`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCommand(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message contains the cookie command`, (): void => {
      beforeEach((): void => {
        message = `--cookie`;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.hasCommand(message);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the given message contains the shortcut cookie command`, (): void => {
      beforeEach((): void => {
        message = `--c`;
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
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(
          `@`
        );
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
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue([
          `--`,
          `!`,
        ]);
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

  describe(`hasErrorCommand()`, (): void => {
    let message: string;

    beforeEach((): void => {
      message = `dummy-message`;
    });

    describe(`when the message command prefix is "@"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(
          `@`
        );
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@error`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--error`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!error`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@error dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--error dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!error dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@bug`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--bug`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!bug`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@bug dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--bug dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!bug dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@ERROR`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--ERROR`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ERROR`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ERROR dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--ERROR dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ERROR dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@BUG`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--BUG`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!BUG`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@BUG dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--BUG dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!BUG dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });
    });

    describe(`when the message command prefix is "--" or "!"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue([
          `--`,
          `!`,
        ]);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!err`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost error command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!err dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@error`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--error`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!error`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@error dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--error dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!error dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@ERROR`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--ERROR`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!ERROR`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@ERROR dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--ERROR dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the error command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!ERROR dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@bug`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--bug`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!bug`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@bug dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--bug dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!bug dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@BUG`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--BUG`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!BUG`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@BUG dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--BUG dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the bug command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!BUG dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasErrorCommand(message);

          expect(result).toStrictEqual(true);
        });
      });
    });
  });

  describe(`hasHelpCommand()`, (): void => {
    let message: string;

    beforeEach((): void => {
      message = `dummy-message`;
    });

    describe(`when the message command prefix is "@"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(
          `@`
        );
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@help dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--help dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!help dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@h`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--h`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!h`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@h dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--h dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!h dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@HELP`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--HELP`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!HELP`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@HELP dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--HELP dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!HELP dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@H`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--H`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!H`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@H dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--H dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!H dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });
    });

    describe(`when the message command prefix is "--" or "!"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue([
          `--`,
          `!`,
        ]);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost help command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@help`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--help`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!help`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@help dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--help dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!help dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@HELP`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--HELP`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!HELP`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@HELP dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--HELP dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the help command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!HELP dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@h`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--h`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!h`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@h dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--h dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!h dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@H`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--H`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!H`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@H dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--H dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut help command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!H dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasHelpCommand(message);

          expect(result).toStrictEqual(true);
        });
      });
    });
  });

  describe(`hasCookieCommand()`, (): void => {
    let message: string;

    beforeEach((): void => {
      message = `dummy-message`;
    });

    describe(`when the message command prefix is "@"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(
          `@`
        );
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@cookie`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--cookie`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!cookie`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@cookie dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--cookie dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!cookie dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@c`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--c`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!c`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@c dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--c dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!c dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@COOKIE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--COOKIE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!COOKIE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@COOKIE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--COOKIE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!COOKIE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@C`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--C`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!C`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@C dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--C dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!C dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });
    });

    describe(`when the message command prefix is "--" or "!"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue([
          `--`,
          `!`,
        ]);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!hel`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!hel dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@cookie`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--cookie`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!cookie`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@cookie dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--cookie dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!cookie dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@COOKIE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--COOKIE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!COOKIE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@COOKIE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--COOKIE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!COOKIE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@c`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with --`, (): void => {
        beforeEach((): void => {
          message = `--c`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!c`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@c dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--c dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!c dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@C`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with --`, (): void => {
        beforeEach((): void => {
          message = `--C`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!C`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@C dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with -- and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `--C dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut cookie command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!C dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.hasCookieCommand(message);

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
      anyDiscordMessage = createMock<Message>();
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

  describe(`handleErrorCommand()`, (): void => {
    let anyDiscordMessage: Message;
    let discordMessageResponse: IDiscordMessageResponse;

    let discordMessageCommandErrorServiceHandleSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createMock<Message>();
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      discordMessageCommandErrorServiceHandleSpy = jest
        .spyOn(discordMessageCommandErrorService, `handle`)
        .mockReturnValue(discordMessageResponse);
    });

    it(`should handle the message command error`, (): void => {
      expect.assertions(2);

      service.handleErrorCommand(anyDiscordMessage);

      expect(discordMessageCommandErrorServiceHandleSpy).toHaveBeenCalledTimes(
        1
      );
      expect(discordMessageCommandErrorServiceHandleSpy).toHaveBeenCalledWith(
        anyDiscordMessage
      );
    });

    it(`should return a message response`, (): void => {
      expect.assertions(1);

      const result = service.handleErrorCommand(anyDiscordMessage);

      expect(result).toStrictEqual(discordMessageResponse);
    });
  });

  describe(`handleHelpCommand()`, (): void => {
    let anyDiscordMessage: Message;
    let discordMessageResponse: IDiscordMessageResponse;

    let discordMessageCommandHelpServiceHandleSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createMock<Message>();
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      discordMessageCommandHelpServiceHandleSpy = jest
        .spyOn(discordMessageCommandHelpService, `handle`)
        .mockReturnValue(discordMessageResponse);
    });

    it(`should handle the message command help`, (): void => {
      expect.assertions(2);

      service.handleHelpCommand(anyDiscordMessage);

      expect(discordMessageCommandHelpServiceHandleSpy).toHaveBeenCalledTimes(
        1
      );
      expect(discordMessageCommandHelpServiceHandleSpy).toHaveBeenCalledWith(
        anyDiscordMessage
      );
    });

    it(`should return a message response`, (): void => {
      expect.assertions(1);

      const result = service.handleHelpCommand(anyDiscordMessage);

      expect(result).toStrictEqual(discordMessageResponse);
    });
  });

  describe(`handleCookieCommand()`, (): void => {
    let anyDiscordMessage: Message;
    let discordMessageResponse: IDiscordMessageResponse;

    let discordMessageCommandCookieServiceHandleSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createMock<Message>();
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      discordMessageCommandCookieServiceHandleSpy = jest
        .spyOn(discordMessageCommandCookieService, `handle`)
        .mockReturnValue(discordMessageResponse);
    });

    it(`should handle the message command cookie`, (): void => {
      expect.assertions(2);

      service.handleCookieCommand(anyDiscordMessage);

      expect(discordMessageCommandCookieServiceHandleSpy).toHaveBeenCalledTimes(
        1
      );
      expect(discordMessageCommandCookieServiceHandleSpy).toHaveBeenCalledWith(
        anyDiscordMessage
      );
    });

    it(`should return a message response`, (): void => {
      expect.assertions(1);

      const result = service.handleCookieCommand(anyDiscordMessage);

      expect(result).toStrictEqual(discordMessageResponse);
    });
  });

  describe(`handleCommands()`, (): void => {
    let anyDiscordMessage: Message;
    let discordMessageResponse: IDiscordMessageResponse;

    let discordMessageCommandVersionServiceHandleSpy: jest.SpyInstance;
    let discordMessageCommandErrorServiceHandleSpy: jest.SpyInstance;
    let discordMessageCommandHelpServiceHandleSpy: jest.SpyInstance;
    let discordMessageCommandCookieServiceHandleSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createMock<Message>();
      discordMessageResponse = createMock<IDiscordMessageResponse>();

      discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(
        `--`
      );
      discordMessageCommandVersionServiceHandleSpy = jest
        .spyOn(discordMessageCommandVersionService, `handle`)
        .mockReturnValue(discordMessageResponse);
      discordMessageCommandErrorServiceHandleSpy = jest
        .spyOn(discordMessageCommandErrorService, `handle`)
        .mockReturnValue(discordMessageResponse);
      discordMessageCommandHelpServiceHandleSpy = jest
        .spyOn(discordMessageCommandHelpService, `handle`)
        .mockReturnValue(discordMessageResponse);
      discordMessageCommandCookieServiceHandleSpy = jest
        .spyOn(discordMessageCommandCookieService, `handle`)
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

      it(`should not handle the error command`, (): void => {
        expect.assertions(1);

        service.handleCommands(anyDiscordMessage);

        expect(
          discordMessageCommandErrorServiceHandleSpy
        ).not.toHaveBeenCalled();
      });

      it(`should not handle the help command`, (): void => {
        expect.assertions(1);

        service.handleCommands(anyDiscordMessage);

        expect(
          discordMessageCommandHelpServiceHandleSpy
        ).not.toHaveBeenCalled();
      });

      it(`should not handle the cookie command`, (): void => {
        expect.assertions(1);

        service.handleCommands(anyDiscordMessage);

        expect(
          discordMessageCommandCookieServiceHandleSpy
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

        it(`should not handle the error command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandErrorServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should not handle the help command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandHelpServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should not handle the cookie command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandCookieServiceHandleSpy
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

        it(`should not handle the error command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandErrorServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should not handle the help command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandHelpServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should not handle the cookie command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandCookieServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should return the Discord message response for the version command`, (): void => {
          expect.assertions(1);

          const result = service.handleCommands(anyDiscordMessage);

          expect(result).toStrictEqual(discordMessageResponse);
        });
      });

      describe(`when the message contains the error command`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `--error`;
        });

        it(`should not handle the version command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandVersionServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should handle the error command`, (): void => {
          expect.assertions(2);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandErrorServiceHandleSpy
          ).toHaveBeenCalledTimes(1);
          expect(
            discordMessageCommandErrorServiceHandleSpy
          ).toHaveBeenCalledWith(anyDiscordMessage);
        });

        it(`should not handle the help command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandHelpServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should not handle the cookie command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandCookieServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should return the Discord message response for the error command`, (): void => {
          expect.assertions(1);

          const result = service.handleCommands(anyDiscordMessage);

          expect(result).toStrictEqual(discordMessageResponse);
        });
      });

      describe(`when the message contains the help command`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `--help`;
        });

        it(`should not handle the version command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandVersionServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should not handle the error command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandErrorServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should handle the help command`, (): void => {
          expect.assertions(2);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandHelpServiceHandleSpy
          ).toHaveBeenCalledTimes(1);
          expect(
            discordMessageCommandHelpServiceHandleSpy
          ).toHaveBeenCalledWith(anyDiscordMessage);
        });

        it(`should not handle the cookie command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandCookieServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should return the Discord message response for the error command`, (): void => {
          expect.assertions(1);

          const result = service.handleCommands(anyDiscordMessage);

          expect(result).toStrictEqual(discordMessageResponse);
        });
      });

      describe(`when the message contains the cookie command`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `--cookie`;
        });

        it(`should not handle the version command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandVersionServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should not handle the error command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandErrorServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should not handle the help command`, (): void => {
          expect.assertions(1);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandHelpServiceHandleSpy
          ).not.toHaveBeenCalled();
        });

        it(`should handle the cookie command`, (): void => {
          expect.assertions(2);

          service.handleCommands(anyDiscordMessage);

          expect(
            discordMessageCommandCookieServiceHandleSpy
          ).toHaveBeenCalledTimes(1);
          expect(
            discordMessageCommandCookieServiceHandleSpy
          ).toHaveBeenCalledWith(anyDiscordMessage);
        });

        it(`should return the Discord message response for the error command`, (): void => {
          expect.assertions(1);

          const result = service.handleCommands(anyDiscordMessage);

          expect(result).toStrictEqual(discordMessageResponse);
        });
      });
    });
  });
});
