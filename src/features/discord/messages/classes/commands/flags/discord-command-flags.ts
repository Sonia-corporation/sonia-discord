import _, { Dictionary } from "lodash";
import { getLastSequenceRegexp } from "../../../../../../functions/formatters/get-last-sequence-regexp";
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
import { IDiscordCommandFlagDuplicated } from "../../../interfaces/commands/flags/discord-command-flag-duplicated";
import { IDiscordCommandFlagError } from "../../../interfaces/commands/flags/discord-command-flag-error";
import { IDiscordCommandFlags } from "../../../interfaces/commands/flags/discord-command-flags";
import { IDiscordCommandMessageFlagWithName } from "../../../interfaces/commands/flags/discord-command-message-flag-with-name";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { IDiscordCommandFlagResponse } from "../../../types/commands/flags/discord-command-flag-response";
import { IDiscordCommandFlagsDuplicated } from "../../../types/commands/flags/discord-command-flags-duplicated";
import { IDiscordCommandFlagsErrors } from "../../../types/commands/flags/discord-command-flags-errors";
import { IDiscordCommandFlagsResponse } from "../../../types/commands/flags/discord-command-flags-response";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
import { DiscordCommandFirstArgument } from "../arguments/discord-command-first-argument";
import { DiscordCommandFlag } from "./discord-command-flag";

const ONE_FLAG = 1;

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

  public getOrderedFlags(): DiscordCommandFlag<T>[] {
    return _.orderBy(
      this.getFlags(),
      (flag: Readonly<DiscordCommandFlag<T>>): T => flag.getName(),
      `asc`
    );
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
        this.getOrderedFlags(),
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
      this.getOrderedFlags(),
      (flag: Readonly<DiscordCommandFlag<T>>): string => flag.getLowerCaseName()
    );
  }

  public getAllFlagsLowerCaseNameWithShortcuts(): string[] {
    return _.flatten(
      _.map(
        this.getOrderedFlags(),
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

  /**
   * @description
   * Search inside the given message for all the duplicated flags
   *
   * Throw an error if the given message is empty
   *
   * @example
   * getDuplicated('--enabled=true')
   * getDuplicated('--enabled=wrong-value')
   * getDuplicated('-e')
   *
   * @param {Readonly<string>} messageFlags A partial message containing only a string with flags
   *
   * @return {IDiscordCommandFlagsDuplicated | null} A list of duplicated flags or null
   */
  public getDuplicated(
    messageFlags: Readonly<string>
  ): IDiscordCommandFlagsDuplicated | null | never {
    if (_.isEmpty(messageFlags)) {
      throw new Error(`The message should not be empty`);
    }

    const splittedMessageFlags: IDiscordMessageFlag[] = discordCommandSplitMessageFlags(
      messageFlags
    );
    const flagsDuplicated: IDiscordCommandFlagsDuplicated = this._getFlagsDuplicated(
      splittedMessageFlags
    );

    return _.isEmpty(flagsDuplicated) ? null : flagsDuplicated;
  }

  public executeAll(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    messageFlags: Readonly<string>
  ): Promise<IDiscordCommandFlagsResponse> {
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
        ): Promise<IDiscordCommandFlagResponse> =>
          this.execute(anyDiscordMessage, discordMessageFlag)
      )
    ).then(
      (
        discordCommandFlagsSuccess: IDiscordCommandFlagsResponse
      ): Promise<IDiscordCommandFlagsResponse> => {
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
  ): Promise<IDiscordCommandFlagResponse | never> {
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

  private _getFlagsDuplicated(
    messageFlags: Readonly<string>[]
  ): IDiscordCommandFlagsDuplicated {
    const messageFlagsWithName: IDiscordCommandMessageFlagWithName[][] = this._getDuplicatedMessagesFlagsByName(
      messageFlags
    );

    return _.map(
      messageFlagsWithName,
      (
        duplicatedMessagesFlagByName: Readonly<
          IDiscordCommandMessageFlagWithName
        >[]
      ): IDiscordCommandFlagDuplicated => {
        return {
          description: `The flags ${this._getDuplicatedFlagsList(
            duplicatedMessagesFlagByName
          )} are duplicated.`,
          name: `${_.toString(
            _.head(duplicatedMessagesFlagByName)?.name ?? `unknown`
          )} flag duplicated`,
        };
      }
    );
  }

  private _getMessageFlagWithName(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): IDiscordCommandMessageFlagWithName {
    return {
      messageFlag,
      name: this._getHumanizedFlagName(messageFlag),
    };
  }

  private _getMessageFlagsWithName(
    messageFlags: Readonly<string>[]
  ): IDiscordCommandMessageFlagWithName[] {
    return _.map(
      messageFlags,
      (messageFlag: Readonly<string>): IDiscordCommandMessageFlagWithName =>
        this._getMessageFlagWithName(messageFlag)
    );
  }

  private _getGroupedMessageFlagsByName(
    messageFlags: Readonly<string>[]
  ): Dictionary<IDiscordCommandMessageFlagWithName[]> {
    return _.groupBy(this._getMessageFlagsWithName(messageFlags), `name`);
  }

  private _getDuplicatedMessagesFlagsByName(
    messageFlags: Readonly<string>[]
  ): IDiscordCommandMessageFlagWithName[][] {
    return _.filter(
      this._getGroupedMessageFlagsByName(messageFlags),
      (array): boolean => _.gt(_.size(array), ONE_FLAG)
    );
  }

  private _getHumanizedFlagName(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): string | undefined {
    if (discordCommandIsMessageFlag(messageFlag)) {
      const flag:
        | DiscordCommandFlag<T>
        | undefined = this._getFlagFromMessageFlag(messageFlag);

      return flag?.getHumanizedName();
    }

    const shortcutFlag:
      | DiscordCommandFlag<T>
      | undefined = this._getShortcutFlagFromMessageFlag(messageFlag);

    return shortcutFlag?.getHumanizedName();
  }

  private _getDuplicatedFlagsList(
    duplicatedMessagesFlagByName: Readonly<IDiscordCommandMessageFlagWithName>[]
  ): string {
    return _.replace(
      _.trimEnd(
        _.reduce(
          duplicatedMessagesFlagByName,
          (
            value: Readonly<string>,
            duplicatedMessagesFlagByName: Readonly<
              IDiscordCommandMessageFlagWithName
            >
          ): string =>
            `${value}\`${duplicatedMessagesFlagByName.messageFlag}\`, `,
          ``
        ),
        `, `
      ),
      getLastSequenceRegexp(`, `),
      ` and `
    );
  }
}
