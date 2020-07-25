import _ from "lodash";
import { AbstractService } from "../../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordMessageResponse } from "../../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../../types/any-discord-message";
import { DiscordMessageConfigService } from "../config/discord-message-config.service";
import { DiscordMessageCommandCookieService } from "./cookie/discord-message-command-cookie.service";
import { DiscordMessageCommandErrorService } from "./error/discord-message-command-error.service";
import { DiscordMessageCommandHelpService } from "./help/discord-message-command-help.service";
import { DiscordMessageCommandLunchService } from "./lunch/discord-message-command-lunch.service";
import { DiscordMessageCommandReleaseNotesService } from "./release-notes/discord-message-command-release-notes.service";
import { DiscordMessageCommandVersionService } from "./version/discord-message-command-version.service";
import { DiscordMessageContentService } from "../discord-message-content.service";

export class DiscordMessageCommandService extends AbstractService {
  private static _instance: DiscordMessageCommandService;

  public static getInstance(): DiscordMessageCommandService {
    if (_.isNil(DiscordMessageCommandService._instance)) {
      DiscordMessageCommandService._instance = new DiscordMessageCommandService();
    }

    return DiscordMessageCommandService._instance;
  }

  private readonly _discordMessageConfigService: DiscordMessageConfigService = DiscordMessageConfigService.getInstance();
  private readonly _discordMessageCommandVersionService: DiscordMessageCommandVersionService = DiscordMessageCommandVersionService.getInstance();
  private readonly _discordMessageCommandErrorService: DiscordMessageCommandErrorService = DiscordMessageCommandErrorService.getInstance();
  private readonly _discordMessageCommandHelpService: DiscordMessageCommandHelpService = DiscordMessageCommandHelpService.getInstance();
  private readonly _discordMessageCommandCookieService: DiscordMessageCommandCookieService = DiscordMessageCommandCookieService.getInstance();
  private readonly _discordMessageCommandLunchService: DiscordMessageCommandLunchService = DiscordMessageCommandLunchService.getInstance();
  private readonly _discordMessageContentService: DiscordMessageContentService = DiscordMessageContentService.getInstance();
  private readonly _discordMessageCommandReleaseNotesService: DiscordMessageCommandReleaseNotesService = DiscordMessageCommandReleaseNotesService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_COMMAND_SERVICE);
  }

  public hasCommand(message: Readonly<string>): boolean {
    if (this.hasVersionCommand(message)) {
      return true;
    } else if (this.hasErrorCommand(message)) {
      return true;
    } else if (this.hasHelpCommand(message)) {
      return true;
    } else if (this.hasCookieCommand(message)) {
      return true;
    } else if (this.hasLunchCommand(message)) {
      return true;
    } else if (this.hasReleaseNotesCommand(message)) {
      return true;
    }

    return false;
  }

  public hasVersionCommand(message: Readonly<string>): boolean {
    return this._hasThisCommand(message, [
      DiscordMessageCommandEnum.VERSION,
      DiscordMessageCommandEnum.V,
    ]);
  }

  public hasErrorCommand(message: Readonly<string>): boolean {
    return this._hasThisCommand(message, [
      DiscordMessageCommandEnum.ERROR,
      DiscordMessageCommandEnum.BUG,
    ]);
  }

  public hasHelpCommand(message: Readonly<string>): boolean {
    return this._hasThisCommand(message, [
      DiscordMessageCommandEnum.HELP,
      DiscordMessageCommandEnum.H,
    ]);
  }

  public hasCookieCommand(message: Readonly<string>): boolean {
    return this._hasThisCommand(message, [
      DiscordMessageCommandEnum.COOKIE,
      DiscordMessageCommandEnum.COOKIES,
      DiscordMessageCommandEnum.C,
    ]);
  }

  public hasLunchCommand(message: Readonly<string>): boolean {
    return this._hasThisCommand(message, [
      DiscordMessageCommandEnum.LUNCH,
      DiscordMessageCommandEnum.L,
    ]);
  }

  public hasReleaseNotesCommand(message: Readonly<string>): boolean {
    return this._hasThisCommand(message, [
      DiscordMessageCommandEnum.RELEASE_NOTES,
      DiscordMessageCommandEnum.R,
    ]);
  }

  public handleVersionCommand(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    return this._discordMessageCommandVersionService.handleResponse(
      anyDiscordMessage
    );
  }

  public handleErrorCommand(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    return this._discordMessageCommandErrorService.handleResponse(
      anyDiscordMessage
    );
  }

  public handleHelpCommand(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    return this._discordMessageCommandHelpService.handleResponse(
      anyDiscordMessage
    );
  }

  public handleCookieCommand(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    return this._discordMessageCommandCookieService.handleResponse(
      anyDiscordMessage
    );
  }

  public handleLunchCommand(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    return this._discordMessageCommandLunchService.handleResponse(
      anyDiscordMessage
    );
  }

  public handleReleaseNotesCommand(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse {
    return this._discordMessageCommandReleaseNotesService.handleResponse(
      anyDiscordMessage
    );
  }

  public handleCommands(
    anyDiscordMessage: Readonly<AnyDiscordMessage>
  ): IDiscordMessageResponse | null {
    if (
      this._discordMessageContentService.hasContent(anyDiscordMessage.content)
    ) {
      if (this.hasVersionCommand(anyDiscordMessage.content)) {
        return this.handleVersionCommand(anyDiscordMessage);
      } else if (this.hasErrorCommand(anyDiscordMessage.content)) {
        return this.handleErrorCommand(anyDiscordMessage);
      } else if (this.hasHelpCommand(anyDiscordMessage.content)) {
        return this.handleHelpCommand(anyDiscordMessage);
      } else if (this.hasCookieCommand(anyDiscordMessage.content)) {
        return this.handleCookieCommand(anyDiscordMessage);
      } else if (this.hasLunchCommand(anyDiscordMessage.content)) {
        return this.handleLunchCommand(anyDiscordMessage);
      } else if (this.hasReleaseNotesCommand(anyDiscordMessage.content)) {
        return this.handleReleaseNotesCommand(anyDiscordMessage);
      }
    }

    return null;
  }

  private _containsThisCommandWithPrefix(
    message: Readonly<string>,
    prefix: Readonly<string>,
    commands:
      | Readonly<DiscordMessageCommandEnum>
      | Readonly<DiscordMessageCommandEnum>[]
  ): boolean {
    let containsThisCommandWithPrefix = false;

    if (_.isString(commands)) {
      containsThisCommandWithPrefix = this._strictlyContainsThisCommandWithPrefix(
        message,
        prefix,
        commands
      );
    } else if (_.isArray(commands)) {
      _.forEach(commands, (command: Readonly<DiscordMessageCommandEnum>):
        | false
        | void => {
        if (
          this._strictlyContainsThisCommandWithPrefix(message, prefix, command)
        ) {
          containsThisCommandWithPrefix = true;

          return false;
        }
      });
    }

    return containsThisCommandWithPrefix;
  }

  private _strictlyContainsThisCommandWithPrefix(
    message: Readonly<string>,
    prefix: Readonly<string>,
    command: Readonly<DiscordMessageCommandEnum>
  ): boolean {
    // @todo could be better to use a RegExp instead of pure white space
    return (
      _.includes(_.toLower(message), _.toLower(`${prefix}${command} `)) ||
      _.endsWith(_.toLower(message), _.toLower(`${prefix}${command}`))
    );
  }

  private _containsThisCommandWithOneOfThesePrefixes(
    message: Readonly<string>,
    prefixes: Readonly<string[]>,
    commands:
      | Readonly<DiscordMessageCommandEnum>
      | Readonly<DiscordMessageCommandEnum>[]
  ): boolean {
    let containsThisCommand = false;

    _.forEach(prefixes, (prefix: Readonly<string>): false | void => {
      if (this._containsThisCommandWithPrefix(message, prefix, commands)) {
        containsThisCommand = true;

        return false;
      }
    });

    return containsThisCommand;
  }

  private _hasThisCommand(
    message: Readonly<string>,
    commands:
      | Readonly<DiscordMessageCommandEnum>
      | Readonly<DiscordMessageCommandEnum>[]
  ): boolean {
    const prefix:
      | string
      | string[] = this._discordMessageConfigService.getMessageCommandPrefix();

    if (_.isString(prefix)) {
      return this._containsThisCommandWithPrefix(message, prefix, commands);
    } else if (_.isArray(prefix)) {
      return this._containsThisCommandWithOneOfThesePrefixes(
        message,
        prefix,
        commands
      );
    }

    return false;
  }
}
