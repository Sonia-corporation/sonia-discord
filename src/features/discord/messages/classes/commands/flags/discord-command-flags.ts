import { getLastSequenceRegexp } from '../../../../../../functions/formatters/get-last-sequence-regexp';
import { getRandomBoolean } from '../../../../../../functions/randoms/get-random-boolean';
import { ChalkService } from '../../../../../logger/services/chalk/chalk.service';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { DiscordCommandFlagTypeEnum } from '../../../enums/commands/discord-command-flag-type.enum';
import { DiscordCommandFlagErrorTitleEnum } from '../../../enums/commands/flags/discord-command-flag-error-title.enum';
import { discordCommandGetFlagName } from '../../../functions/commands/flags/discord-command-get-flag-name';
import { discordCommandGetFlagValue } from '../../../functions/commands/flags/discord-command-get-flag-value';
import { discordCommandIsMessageFlag } from '../../../functions/commands/flags/discord-command-is-message-flag';
import { discordCommandRemoveFlagPrefix } from '../../../functions/commands/flags/discord-command-remove-flag-prefix';
import { discordCommandSplitMessageFlags } from '../../../functions/commands/flags/discord-command-split-message-flags';
import { IDiscordCommandFlagDuplicated } from '../../../interfaces/commands/flags/discord-command-flag-duplicated';
import { IDiscordCommandFlagError } from '../../../interfaces/commands/flags/discord-command-flag-error';
import { IDiscordCommandFlagOpposite } from '../../../interfaces/commands/flags/discord-command-flag-opposite';
import { IDiscordCommandFlags } from '../../../interfaces/commands/flags/discord-command-flags';
import { IDiscordCommandMessageFlag } from '../../../interfaces/commands/flags/discord-command-message-flag';
import { IDiscordCommandMessageFlagWithName } from '../../../interfaces/commands/flags/discord-command-message-flag-with-name';
import { IAnyDiscordMessage } from '../../../types/any-discord-message';
import { IDiscordCommandFlagResponse } from '../../../types/commands/flags/discord-command-flag-response';
import { IDiscordCommandFlagTypes } from '../../../types/commands/flags/discord-command-flag-types';
import { IDiscordCommandFlagsDuplicated } from '../../../types/commands/flags/discord-command-flags-duplicated';
import { IDiscordCommandFlagsErrors } from '../../../types/commands/flags/discord-command-flags-errors';
import { IDiscordCommandFlagsOpposite } from '../../../types/commands/flags/discord-command-flags-opposite';
import { IDiscordCommandFlagsResponse } from '../../../types/commands/flags/discord-command-flags-response';
import { IDiscordMessageFlag } from '../../../types/commands/flags/discord-message-flag';
import { DiscordCommandFirstArgument } from '../arguments/discord-command-first-argument';
import { EmbedFieldData } from 'discord.js';
import _, { Dictionary } from 'lodash';

const ONE_FLAG = 1;

export class DiscordCommandFlags<T extends string> {
  private _command: DiscordCommandFirstArgument<string>;
  private _flags: IDiscordCommandFlagTypes<T>[] = [];
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

  public getFlags(): IDiscordCommandFlagTypes<T>[] {
    return this._flags;
  }

  public getOrderedFlags(): IDiscordCommandFlagTypes<T>[] {
    return _.orderBy(this.getFlags(), (flag: Readonly<IDiscordCommandFlagTypes<T>>): T => flag.getName(), `asc`);
  }

  public setFlags(flags: IDiscordCommandFlagTypes<T>[]): void {
    this._flags = flags;
  }

  public getRandomFlag(): IDiscordCommandFlagTypes<T> | undefined {
    return _.sample(this.getFlags());
  }

  /**
   * @description
   * Return a flag usage example at the most simply way
   * Include the prefix
   *
   * @example
   * => --alpha-flag=true
   * => -e
   *
   * @returns {string | undefined} An example or undefined
   */
  public getRandomFlagUsageExample(): string | undefined {
    const randomFlag: IDiscordCommandFlagTypes<T> | undefined = this.getRandomFlag();

    if (_.isNil(randomFlag)) {
      return undefined;
    }

    const flagName: string = randomFlag.getLowerCaseName();
    const flagType: DiscordCommandFlagTypeEnum = randomFlag.getType();
    let usageExample = `--${flagName}`;

    if (flagType === DiscordCommandFlagTypeEnum.BOOLEAN) {
      usageExample += `=${_.toString(getRandomBoolean())}`;
    }

    return usageExample;
  }

  public getDiscordCommandMessageFlagNames(discordCommandMessageFlags: IDiscordCommandMessageFlag<T>[]): T[] {
    return _.compact(
      _.map(
        discordCommandMessageFlags,
        (discordCommandMessageFlag: Readonly<IDiscordCommandMessageFlag<T>>): T | undefined =>
          discordCommandMessageFlag.flag.getName()
      )
    );
  }

  /**
   * @description
   * Return all the flags name as example
   * This is only the flag names without the shortcuts and without value
   * Include the prefix
   *
   * @example
   * => `--alpha-flag`
   * => `--alpha-flag`, `--beta-flag`
   *
   * @returns {string} The list of all the flags name as example
   */
  public getAllFlagsNameExample(): string {
    return _.trimEnd(
      _.reduce(
        this.getAllFlagsLowerCaseName(),
        (value: Readonly<string>, flagName: Readonly<string>): string => `${value}\`--${flagName}\`, `,
        ``
      ),
      `, `
    );
  }

  /**
   * @description
   * Return all the flags name as example
   * This is the flag names with the shortcuts and without values
   * Include the prefix
   *
   * @example
   * => `--alpha-flag`
   * => `--alpha-flag (or -e)`
   * => `--alpha-flag (or -e, -d)`, `--beta-flag (or -f, -g)`
   *
   * @returns {string} The list of all the flags name as example with their shortcuts
   */
  public getAllFlagsNameWithShortcutsExample(): string {
    return _.trimEnd(
      _.reduce(
        this.getOrderedFlags(),
        (value: Readonly<string>, flag: Readonly<IDiscordCommandFlagTypes<T>>): string =>
          `${value}\`${flag.getLowerCaseNameAndShortcutsExample()}\`, `,
        ``
      ),
      `, `
    );
  }

  /**
   * @description
   * Return a list of all the flag names lowered
   *
   * @example
   * => [alpha-flag]
   * => [alpha-flag, beta-flag]
   *
   * @returns {string[]} The list of all the flags name lowered
   */
  public getAllFlagsLowerCaseName(): string[] {
    return _.map(this.getOrderedFlags(), (flag: Readonly<IDiscordCommandFlagTypes<T>>): string =>
      flag.getLowerCaseName()
    );
  }

  /**
   * @description
   * Return a list of all the flag names lowered
   * Contains also their shortcuts
   *
   * @example
   * => [alpha-flag]
   * => [alpha-flag, beta-flag]
   *
   * @returns {string[]} The list of all the flags name lowered and their shortcuts
   */
  public getAllFlagsLowerCaseNameWithShortcuts(): string[] {
    return _.flatten(
      _.map(this.getOrderedFlags(), (flag: Readonly<IDiscordCommandFlagTypes<T>>): string[] =>
        _.compact(_.flatten([flag.getLowerCaseName(), flag.getLowerCaseShortcuts()]))
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
   * @returns {IDiscordCommandFlagsErrors | null} A list of errors or null
   */
  public getErrors(messageFlags: Readonly<string>): IDiscordCommandFlagsErrors | null | never {
    if (_.isEmpty(messageFlags)) {
      throw new Error(`The message should not be empty`);
    }

    const splittedMessageFlags: IDiscordMessageFlag[] = discordCommandSplitMessageFlags(messageFlags);
    const flagsErrors: IDiscordCommandFlagsErrors = this._getFlagsErrors(splittedMessageFlags);

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
   * @returns {IDiscordCommandFlagsDuplicated | null} A list of duplicated flags or null
   */
  public getDuplicated(messageFlags: Readonly<string>): IDiscordCommandFlagsDuplicated | null | never {
    if (_.isEmpty(messageFlags)) {
      throw new Error(`The message should not be empty`);
    }

    const splittedMessageFlags: IDiscordMessageFlag[] = discordCommandSplitMessageFlags(messageFlags);
    const flagsDuplicated: IDiscordCommandFlagsDuplicated = this._getFlagsDuplicated(splittedMessageFlags);

    return _.isEmpty(flagsDuplicated) ? null : flagsDuplicated;
  }

  /**
   * @description
   * Search inside the given message for all the opposite flags
   *
   * Throw an error if the given message is empty
   *
   * @example
   * getOpposites('--enabled=true')
   * getOpposites('--enabled=wrong-value')
   * getOpposites('-e')
   *
   * @param {Readonly<string>} messageFlags A partial message containing only a string with flags
   *
   * @returns {IDiscordCommandFlagsOpposite | null} A list of opposite flags or null
   */
  public getOpposites(messageFlags: Readonly<string>): IDiscordCommandFlagsOpposite | null | never {
    if (_.isEmpty(messageFlags)) {
      throw new Error(`The message should not be empty`);
    }

    const splittedMessageFlags: IDiscordMessageFlag[] = discordCommandSplitMessageFlags(messageFlags);
    const oppositeFlags: IDiscordCommandFlagsOpposite = this._getOppositeFlags(splittedMessageFlags);

    return _.isEmpty(oppositeFlags) ? null : oppositeFlags;
  }

  public executeAll(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    messageFlags: Readonly<string>
  ): Promise<IDiscordCommandFlagsResponse> {
    LoggerService.getInstance().debug({
      context: this._className,
      hasExtendedContext: true,
      message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `handling all flags...`),
    });

    const discordMessageFlags: IDiscordMessageFlag[] = discordCommandSplitMessageFlags(messageFlags);

    return Promise.all(
      _.map(
        discordMessageFlags,
        (discordMessageFlag: Readonly<IDiscordMessageFlag>): Promise<IDiscordCommandFlagResponse> =>
          this.execute(anyDiscordMessage, discordMessageFlag)
      )
    ).then((discordCommandFlagsSuccess: IDiscordCommandFlagsResponse): Promise<IDiscordCommandFlagsResponse> => {
      LoggerService.getInstance().success({
        context: this._className,
        hasExtendedContext: true,
        message: LoggerService.getInstance().getSnowflakeContext(anyDiscordMessage.id, `all flags handled`),
      });

      return Promise.resolve(discordCommandFlagsSuccess);
    });
  }

  /**
   * @description
   * Execute the action related to this flag
   *
   * @param {Readonly<IAnyDiscordMessage>} anyDiscordMessage The original Discord message
   * @param {Readonly<IDiscordMessageFlag>} messageFlag A message flag
   *
   * @returns {Promise<unknown>}
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
        `handling ${ChalkService.getInstance().value(discordCommandGetFlagName(messageFlag))} flag...`
      ),
    });

    if (discordCommandIsMessageFlag(messageFlag)) {
      const flag: IDiscordCommandFlagTypes<T> | undefined = this._getFlagFromMessageFlag(messageFlag);

      if (this._isFlag(flag)) {
        return flag.executeAction(anyDiscordMessage, discordCommandGetFlagValue(messageFlag), this);
      }

      return Promise.reject(new Error(`The flag does not exists. Could not perform the execution`));
    }

    const shortcutFlag: IDiscordCommandFlagTypes<T> | undefined = this._getShortcutFlagFromMessageFlag(messageFlag);

    if (!this._isFlag(shortcutFlag)) {
      return Promise.reject(new Error(`The shortcut flag does not exists. Could not perform the execution`));
    }

    return shortcutFlag.executeAction(anyDiscordMessage, undefined, this);
  }

  public getAllFlagsAsEmbedFields(): EmbedFieldData[] {
    return _.map(this.getOrderedFlags(), (flag: Readonly<IDiscordCommandFlagTypes<T>>): EmbedFieldData => {
      return {
        name: flag.getLowerCaseNameAndShortcutsExample(),
        value: flag.getDescription(),
      };
    });
  }

  private _getFlagsErrors(messageFlags: Readonly<string>[]): IDiscordCommandFlagsErrors {
    return _.reduce(
      messageFlags,
      (
        flagsErrors: IDiscordCommandFlagsErrors,
        messageFlag: Readonly<IDiscordMessageFlag>
      ): IDiscordCommandFlagsErrors => {
        const flagError: IDiscordCommandFlagError | null = this._getFlagError(messageFlag);

        if (_.isNil(flagError)) {
          return flagsErrors;
        }

        return _.concat(flagsErrors, flagError);
      },
      []
    );
  }

  private _getFlagError(messageFlag: Readonly<IDiscordMessageFlag>): IDiscordCommandFlagError | null {
    if (discordCommandIsMessageFlag(messageFlag)) {
      const flag: IDiscordCommandFlagTypes<T> | undefined = this._getFlagFromMessageFlag(messageFlag);

      if (this._isFlag(flag)) {
        return flag.getInvalidFlagError(discordCommandRemoveFlagPrefix(messageFlag));
      }

      return this._getUnknownFlagError(messageFlag);
    }

    const shortcutFlag: IDiscordCommandFlagTypes<T> | undefined = this._getShortcutFlagFromMessageFlag(messageFlag);

    if (this._isFlag(shortcutFlag)) {
      return null;
    }

    return this._getUnknownFlagError(messageFlag);
  }

  private _isFlag(flag: IDiscordCommandFlagTypes<T> | null | undefined): flag is IDiscordCommandFlagTypes<T> {
    return !_.isNil(flag);
  }

  private _getFlagFromMessageFlag(messageFlag: Readonly<IDiscordMessageFlag>): IDiscordCommandFlagTypes<T> | undefined {
    return _.find(this.getFlags(), (flag: Readonly<IDiscordCommandFlagTypes<T>>): boolean =>
      _.isEqual(flag.getLowerCaseName(), discordCommandGetFlagName(messageFlag, true))
    );
  }

  private _getShortcutFlagFromMessageFlag(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): IDiscordCommandFlagTypes<T> | undefined {
    return _.find(
      this.getFlags(),
      (flag: Readonly<IDiscordCommandFlagTypes<T>>): boolean =>
        !_.isNil(
          _.find(flag.getLowerCaseShortcuts(), (shortcutFlag: Readonly<string>): boolean => {
            const flagName: string | null = discordCommandGetFlagName(messageFlag, true);

            return _.isEqual(shortcutFlag, flagName);
          })
        )
    );
  }

  private _getUnknownFlagError(messageFlag: Readonly<IDiscordMessageFlag>): IDiscordCommandFlagError {
    return {
      description: `The flag \`${_.toString(
        discordCommandGetFlagName(messageFlag)
      )}\` is unknown to the ${this.getCommand().getLowerCaseName()} feature.`,
      isUnknown: true,
      name: DiscordCommandFlagErrorTitleEnum.UNKNOWN_FLAG,
    };
  }

  private _getFlagsDuplicated(messageFlags: Readonly<string>[]): IDiscordCommandFlagsDuplicated {
    const messageFlagsWithName: IDiscordCommandMessageFlagWithName[][] =
      this._getDuplicatedMessagesFlagsByName(messageFlags);

    return _.map(
      messageFlagsWithName,
      (duplicatedMessagesFlagByName: Readonly<IDiscordCommandMessageFlagWithName>[]): IDiscordCommandFlagDuplicated => {
        return {
          description: `The flags ${this._getDuplicatedFlagsList(duplicatedMessagesFlagByName)} are duplicated.`,
          name: `${_.toString(_.head(duplicatedMessagesFlagByName)?.name ?? `unknown`)} flag duplicated`,
        };
      }
    );
  }

  private _getOppositeFlags(messageFlags: Readonly<string>[]): IDiscordCommandFlagsOpposite {
    const commandMessageFlagsWithOpposite: IDiscordCommandMessageFlag<T>[][] =
      this._getOppositeMessagesFlags(messageFlags);

    return _.map(
      commandMessageFlagsWithOpposite,
      (commandMessageFlagWithOpposite: Readonly<IDiscordCommandMessageFlag<T>>[]): IDiscordCommandFlagOpposite => {
        return {
          description: `The flags ${this._getOppositeFlagsList(commandMessageFlagWithOpposite)} are opposites.`,
          name: `${this._getHumanizedOppositeFlagsList(commandMessageFlagWithOpposite)} flags can not be combined`,
        };
      }
    );
  }

  private _getMessageFlagWithName(messageFlag: Readonly<IDiscordMessageFlag>): IDiscordCommandMessageFlagWithName {
    return {
      messageFlag,
      name: this._getHumanizedFlagName(messageFlag),
    };
  }

  private _getMessageFlag(messageFlag: Readonly<IDiscordMessageFlag>): IDiscordCommandMessageFlag<T> | null {
    const flag: IDiscordCommandFlagTypes<T> | undefined = this._getFlag(messageFlag);

    if (_.isNil(flag)) {
      return null;
    }

    return {
      flag,
      messageFlag,
    };
  }

  private _getMessageFlagsWithName(messageFlags: Readonly<string>[]): IDiscordCommandMessageFlagWithName[] {
    return _.map(
      messageFlags,
      (messageFlag: Readonly<string>): IDiscordCommandMessageFlagWithName => this._getMessageFlagWithName(messageFlag)
    );
  }

  private _getMessageFlags(messageFlags: Readonly<string>[]): IDiscordCommandMessageFlag<T>[] {
    return _.compact(
      _.map(messageFlags, (messageFlag: Readonly<string>): IDiscordCommandMessageFlag<T> | null =>
        this._getMessageFlag(messageFlag)
      )
    );
  }

  private _getGroupedMessageFlagsByName(
    messageFlags: Readonly<string>[]
  ): Dictionary<IDiscordCommandMessageFlagWithName[]> {
    return _.groupBy(this._getMessageFlagsWithName(messageFlags), `name`);
  }

  private _getDuplicatedMessagesFlagsByName(messageFlags: Readonly<string>[]): IDiscordCommandMessageFlagWithName[][] {
    return _.filter(this._getGroupedMessageFlagsByName(messageFlags), (array): boolean =>
      _.gt(_.size(array), ONE_FLAG)
    );
  }

  /**
   * @private
   *
   * @description
   * When I comment some code it means that the following code is cringe as fuck
   * You were warned
   *
   * @summary
   * Convert all the message flags to real flags
   * List all the flags by name
   * Loop the flags
   * If a flag as opposite flags
   * Loop the opposite flags
   * If the opposite flag match one of the flag by name (from the list)
   * If the flag and his opposite are not inside the list of opposite flags (to avoid A opposite of B and B opposite of A stuff)
   * Add the flag and his opposite to the list of opposite flags (array inside the global array)
   *
   * @param {Readonly<string>[]} messageFlags The list of message flags
   *
   * @returns {unknown} A list of list of flags considered not compatibles
   */
  private _getOppositeMessagesFlags(messageFlags: Readonly<string>[]): IDiscordCommandMessageFlag<T>[][] {
    const commandMessageFlags: IDiscordCommandMessageFlag<T>[] = this._getMessageFlags(messageFlags);
    const commandMessageFlagNames: T[] = this.getDiscordCommandMessageFlagNames(commandMessageFlags);
    const commandMessageFlagNamesFound: T[] = [];
    const commandMessageFlagsWithOpposite: IDiscordCommandMessageFlag<T>[][] = [];

    _.forEach(commandMessageFlags, (commandMessageFlag: IDiscordCommandMessageFlag<T>): void => {
      const opposites: T[] | undefined = commandMessageFlag.flag.getOpposites();

      if (!_.isEmpty(opposites)) {
        _.forEach(opposites, (opposite: Readonly<T>): void => {
          if (_.includes(commandMessageFlagNames, opposite)) {
            const oppositeCommandMessageFlag: IDiscordCommandMessageFlag<T> | undefined = _.find(
              commandMessageFlags,
              (commandMessageFlag): boolean => _.isEqual(commandMessageFlag.flag.getName(), opposite)
            );

            if (!_.isNil(oppositeCommandMessageFlag)) {
              if (
                !_.includes(commandMessageFlagNamesFound, commandMessageFlag.flag.getName()) &&
                !_.includes(commandMessageFlagNamesFound, oppositeCommandMessageFlag.flag.getName())
              ) {
                commandMessageFlagsWithOpposite.push([commandMessageFlag, oppositeCommandMessageFlag]);
                commandMessageFlagNamesFound.push(
                  commandMessageFlag.flag.getName(),
                  oppositeCommandMessageFlag.flag.getName()
                );
              }
            }
          }
        });
      }
    });

    return commandMessageFlagsWithOpposite;
  }

  private _getFlag(messageFlag: Readonly<IDiscordMessageFlag>): IDiscordCommandFlagTypes<T> | undefined {
    if (discordCommandIsMessageFlag(messageFlag)) {
      return this._getFlagFromMessageFlag(messageFlag);
    }

    return this._getShortcutFlagFromMessageFlag(messageFlag);
  }

  private _getHumanizedFlagName(messageFlag: Readonly<IDiscordMessageFlag>): string | undefined {
    return this._getFlag(messageFlag)?.getHumanizedName();
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
            duplicatedMessagesFlagByName: Readonly<IDiscordCommandMessageFlagWithName>
          ): string => `${value}\`${duplicatedMessagesFlagByName.messageFlag}\`, `,
          ``
        ),
        `, `
      ),
      getLastSequenceRegexp(`, `),
      ` and `
    );
  }

  private _getOppositeFlagsList(oppositeMessagesFlag: Readonly<IDiscordCommandMessageFlag<T>>[]): string {
    return _.replace(
      _.trimEnd(
        _.reduce(
          oppositeMessagesFlag,
          (value: Readonly<string>, duplicatedMessagesFlag: Readonly<IDiscordCommandMessageFlag<T>>): string =>
            `${value}\`${duplicatedMessagesFlag.messageFlag}\`, `,
          ``
        ),
        `, `
      ),
      getLastSequenceRegexp(`, `),
      ` and `
    );
  }

  private _getHumanizedOppositeFlagsList(oppositeMessagesFlag: Readonly<IDiscordCommandMessageFlag<T>>[]): string {
    return _.replace(
      _.trimEnd(
        _.reduce(
          oppositeMessagesFlag,
          (value: Readonly<string>, duplicatedMessagesFlag: Readonly<IDiscordCommandMessageFlag<T>>): string =>
            `${value}${duplicatedMessagesFlag.flag.getHumanizedName() ?? `unknown`}, `,
          ``
        ),
        `, `
      ),
      getLastSequenceRegexp(`, `),
      ` and `
    );
  }
}
