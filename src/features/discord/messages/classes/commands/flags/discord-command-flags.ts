import _ from "lodash";
import { getRandomBoolean } from "../../../../../../functions/randoms/get-random-boolean";
import { ChalkService } from "../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { DiscordCommandFlagErrorTitleEnum } from "../../../enums/commands/flags/discord-command-flag-error-title.enum";
import { discordCommandGetFlagName } from "../../../functions/commands/flags/discord-command-get-flag-name";
import { discordCommandGetFlagValue } from "../../../functions/commands/flags/discord-command-get-flag-value";
import { discordCommandIsMessageFlag } from "../../../functions/commands/flags/discord-command-is-message-flag";
import { discordCommandRemoveFlagPrefix } from "../../../functions/commands/flags/discord-command-remove-flag-prefix";
import { discordCommandSplitMessageFlags } from "../../../functions/commands/flags/discord-command-split-message-flags";
import { IDiscordCommandFlagError } from "../../../interfaces/commands/flags/discord-command-flag-error";
import { IDiscordCommandFlagSuccess } from "../../../interfaces/commands/flags/discord-command-flag-success";
import { IDiscordCommandFlags } from "../../../interfaces/commands/flags/discord-command-flags";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { IDiscordCommandFlagsErrors } from "../../../types/commands/flags/discord-command-flags-errors";
import { IDiscordCommandFlagsSuccess } from "../../../types/commands/flags/discord-command-flags-success";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
import { DiscordCommandFirstArgument } from "../arguments/discord-command-first-argument";
import { DiscordCommandFlag } from "./discord-command-flag";

export class DiscordCommandFlags<T extends string> {
  private _command: DiscordCommandFirstArgument<string>;
  private _flags: DiscordCommandFlag<T>[] = [];
  private readonly _className = `DiscordCommandFlags`;

  /**
   * @param {Readonly<string>} command Default values
   * @param {DiscordCommandFlag[]} flags Default values
   */
  public constructor({ command, flags }: Readonly<IDiscordCommandFlags<T>>) {
    this._command = command;
    this._flags = flags;
  }

  public getCommand(): DiscordCommandFirstArgument<string> {
    return this._command;
  }

  public setCommand(command: DiscordCommandFirstArgument<string>): void {
    this._command = command;
  }

  public getFlags(): DiscordCommandFlag<T>[] {
    return this._flags;
  }

  public setFlags(flags: DiscordCommandFlag<T>[]): void {
    this._flags = flags;
  }

  public getRandomFlag(): DiscordCommandFlag<T> | undefined {
    return _.sample(this.getFlags());
  }

  public getRandomFlagUsageExample(): string | undefined {
    const randomFlag: DiscordCommandFlag<T> | undefined = this.getRandomFlag();

    if (!_.isNil(randomFlag)) {
      const flagName: string = randomFlag.getLowerCaseName();
      const flagType: DiscordCommandFlagTypeEnum = randomFlag.getType();
      let usageExample = `--${flagName}`;

      if (flagType === DiscordCommandFlagTypeEnum.BOOLEAN) {
        usageExample += `=${_.toString(getRandomBoolean())}`;
      }

      return usageExample;
    }

    return undefined;
  }

  public getAllFlagsNameExample(): string {
    return _.trimEnd(
      _.reduce(
        this.getAllFlagsLowerCaseName(),
        (value: Readonly<string>, flagName: Readonly<string>): string =>
          `${value}\`--${flagName}\`, `,
        ``
      ),
      `, `
    );
  }

  public getAllFlagsNameWithShortcutsExample(): string {
    return _.trimEnd(
      _.reduce(
        this.getFlags(),
        (
          value: Readonly<string>,
          flag: Readonly<DiscordCommandFlag<T>>
        ): string =>
          `${value}\`${flag.getLowerCaseNameAndShortcutsExample()}\`, `,
        ``
      ),
      `, `
    );
  }

  public getAllFlagsLowerCaseName(): string[] {
    return _.map(
      this.getFlags(),
      (flag: Readonly<DiscordCommandFlag<T>>): string => flag.getLowerCaseName()
    );
  }

  public getAllFlagsLowerCaseNameWithShortcuts(): string[] {
    return _.flatten(
      _.map(
        this.getFlags(),
        (flag: Readonly<DiscordCommandFlag<T>>): string[] =>
          _.compact(
            _.flatten([flag.getLowerCaseName(), flag.getLowerCaseShortcuts()])
          )
      )
    );
  }

  /**
   * @description
   * Search inside the given message for all the flags on error
   *
   * Throw an error if the given message is empty
   *
   * @example
   * getErrors('--enabled=true')
   * getErrors('--enabled=wrong-value')
   * getErrors('-e')
   *
   * @param {Readonly<string>} messageFlags A partial message containing only a string with flags
   *
   * @return {IDiscordCommandFlagsErrors | null} A list of errors or null
   */
  public getErrors(
    messageFlags: Readonly<string>
  ): IDiscordCommandFlagsErrors | null | never {
    if (_.isEmpty(messageFlags)) {
      throw new Error(`The message should not be empty`);
    }

    const splittedMessageFlags: IDiscordMessageFlag[] = discordCommandSplitMessageFlags(
      messageFlags
    );
    const flagsErrors: IDiscordCommandFlagsErrors = this._getFlagsErrors(
      splittedMessageFlags
    );

    return _.isEmpty(flagsErrors) ? null : flagsErrors;
  }

  public executeAll(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    messageFlags: Readonly<string>
  ): Promise<IDiscordCommandFlagsSuccess> {
    LoggerService.getInstance().debug({
      context: this._className,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `handling all flags...`
      ),
    });

    const discordMessageFlags: IDiscordMessageFlag[] = discordCommandSplitMessageFlags(
      messageFlags
    );

    return Promise.all(
      _.map(
        discordMessageFlags,
        (
          discordMessageFlag: Readonly<IDiscordMessageFlag>
        ): Promise<IDiscordCommandFlagSuccess> =>
          this.execute(anyDiscordMessage, discordMessageFlag)
      )
    ).then(
      (
        discordCommandFlagsSuccess: Readonly<IDiscordCommandFlagsSuccess>
      ): Promise<IDiscordCommandFlagsSuccess> => {
        LoggerService.getInstance().success({
          context: this._className,
          hasExtendedContext: true,
          message: LoggerService.getInstance().getSnowflakeContext(
            anyDiscordMessage.id,
            `all flags handled`
          ),
        });

        return Promise.resolve(discordCommandFlagsSuccess);
      }
    );
  }

  /**
   * @description
   * Execute the action related to this flag
   *
   * @param {Readonly<IAnyDiscordMessage>} anyDiscordMessage The original Discord message
   * @param {Readonly<IDiscordMessageFlag>} messageFlag A message flag
   *
   * @return {Promise<unknown>}
   */
  public execute(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    messageFlag: Readonly<IDiscordMessageFlag>
  ): Promise<IDiscordCommandFlagSuccess | never> {
    LoggerService.getInstance().debug({
      context: this._className,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(
        anyDiscordMessage.id,
        `handling ${ChalkService.getInstance().value(
          discordCommandGetFlagName(messageFlag)
        )} flag...`
      ),
    });

    if (discordCommandIsMessageFlag(messageFlag)) {
      const flag:
        | DiscordCommandFlag<T>
        | undefined = this._getFlagFromMessageFlag(messageFlag);

      if (this._isFlag(flag)) {
        return flag.executeAction(
          anyDiscordMessage,
          discordCommandGetFlagValue(messageFlag)
        );
      }

      return Promise.reject(
        new Error(`The flag does not exists. Could not perform the execution`)
      );
    }

    const shortcutFlag:
      | DiscordCommandFlag<T>
      | undefined = this._getShortcutFlagFromMessageFlag(messageFlag);

    if (this._isFlag(shortcutFlag)) {
      return shortcutFlag.executeAction(anyDiscordMessage);
    }

    return Promise.reject(
      new Error(
        `The shortcut flag does not exists. Could not perform the execution`
      )
    );
  }

  private _getFlagsErrors(
    messageFlags: Readonly<string>[]
  ): IDiscordCommandFlagsErrors {
    return _.reduce(
      messageFlags,
      (
        flagsErrors: IDiscordCommandFlagsErrors,
        messageFlag: Readonly<IDiscordMessageFlag>
      ): IDiscordCommandFlagsErrors => {
        const flagError: IDiscordCommandFlagError | null = this._getFlagError(
          messageFlag
        );

        if (_.isNil(flagError)) {
          return flagsErrors;
        }

        return _.concat(flagsErrors, flagError);
      },
      []
    );
  }

  private _getFlagError(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): IDiscordCommandFlagError | null {
    if (discordCommandIsMessageFlag(messageFlag)) {
      const flag:
        | DiscordCommandFlag<T>
        | undefined = this._getFlagFromMessageFlag(messageFlag);

      if (this._isFlag(flag)) {
        return flag.getInvalidFlagError(
          discordCommandRemoveFlagPrefix(messageFlag)
        );
      }

      return this._getUnknownFlagError(messageFlag);
    }

    const shortcutFlag:
      | DiscordCommandFlag<T>
      | undefined = this._getShortcutFlagFromMessageFlag(messageFlag);

    if (this._isFlag(shortcutFlag)) {
      return null;
    }

    return this._getUnknownFlagError(messageFlag);
  }

  private _isFlag(
    flag: DiscordCommandFlag<T> | null | undefined
  ): flag is DiscordCommandFlag<T> {
    return !_.isNil(flag);
  }

  private _getFlagFromMessageFlag(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): DiscordCommandFlag<T> | undefined {
    return _.find(
      this.getFlags(),
      (flag: Readonly<DiscordCommandFlag<T>>): boolean =>
        _.isEqual(
          flag.getLowerCaseName(),
          discordCommandGetFlagName(messageFlag, true)
        )
    );
  }

  private _getShortcutFlagFromMessageFlag(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): DiscordCommandFlag<T> | undefined {
    return _.find(
      this.getFlags(),
      (flag: Readonly<DiscordCommandFlag<T>>): boolean =>
        !_.isNil(
          _.find(
            flag.getLowerCaseShortcuts(),
            (shortcutFlag: Readonly<string>): boolean => {
              const flagName: string | null = discordCommandGetFlagName(
                messageFlag,
                true
              );

              return _.isEqual(shortcutFlag, flagName);
            }
          )
        )
    );
  }

  private _getUnknownFlagError(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): IDiscordCommandFlagError {
    return {
      description: `The flag \`${_.toString(
        discordCommandGetFlagName(messageFlag)
      )}\` is unknown to the \`${this.getCommand().getLowerCaseName()}\` feature.`,
      isUnknown: true,
      name: DiscordCommandFlagErrorTitleEnum.UNKNOWN_FLAG,
    };
  }
}
