import _ from "lodash";
import { getRandomBoolean } from "../../../../../../functions/randoms/get-random-boolean";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { DiscordCommandFlagErrorTitleEnum } from "../../../enums/commands/flags/discord-command-flag-error-title.enum";
import { discordCommandGetFlagName } from "../../../functions/commands/flags/discord-command-get-flag-name";
import { discordCommandRemoveFlagPrefix } from "../../../functions/commands/flags/discord-command-remove-flag-prefix";
import { IDiscordCommandFlagError } from "../../../interfaces/commands/flags/discord-command-flag-error";
import { IDiscordCommandFlags } from "../../../interfaces/commands/flags/discord-command-flags";
import { IDiscordCommandFlagsErrors } from "../../../types/commands/discord-command-flags-errors";
import { DiscordCommandFirstArgument } from "../arguments/discord-command-first-argument";
import { DiscordCommandFlag } from "./discord-command-flag";

export class DiscordCommandFlags<T extends string> {
  private _command: DiscordCommandFirstArgument<string>;
  private _flags: DiscordCommandFlag<T>[] = [];

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
   * @param {Readonly<string>} message A partial message containing only a string with flags
   *
   * @return {IDiscordCommandFlagsErrors | null} A list of errors or null
   */
  public getErrors(
    message: Readonly<string>
  ): IDiscordCommandFlagsErrors | null | never {
    if (_.isEmpty(message)) {
      throw new Error(`The message should not be empty`);
    }

    const splittedMessageFlags = this._splitMessageFlags(message);
    const flagsErrors: IDiscordCommandFlagsErrors = this._getFlagsErrors(
      splittedMessageFlags
    );

    return _.isEmpty(flagsErrors) ? null : flagsErrors;
  }

  private _getFlagsErrors(
    messageFlags: Readonly<string>[]
  ): IDiscordCommandFlagsErrors {
    return _.reduce(
      messageFlags,
      (
        flagsErrors: IDiscordCommandFlagsErrors,
        messageFlag: Readonly<string>
      ): IDiscordCommandFlagsErrors => {
        const flagError: IDiscordCommandFlagError | null = this._getFlagError(
          messageFlag
        );

        if (!_.isNil(flagError)) {
          flagsErrors.push(flagError);
        }

        return flagsErrors;
      },
      []
    );
  }

  private _getFlagError(
    messageFlag: Readonly<string>
  ): IDiscordCommandFlagError | null {
    if (_.startsWith(messageFlag, `--`)) {
      const flag: DiscordCommandFlag<T> | undefined = _.find(
        this.getFlags(),
        (flag: Readonly<DiscordCommandFlag<T>>): boolean =>
          _.isEqual(
            flag.getLowerCaseName(),
            discordCommandGetFlagName(messageFlag, true)
          )
      );

      if (!_.isNil(flag)) {
        return flag.getInvalidFlagError(
          discordCommandRemoveFlagPrefix(messageFlag)
        );
      }

      return {
        description: `The flag \`${_.toString(
          discordCommandGetFlagName(messageFlag)
        )}\` is unknown to the \`${this.getCommand().getLowerCaseName()}\` feature.`,
        isUnknown: true,
        name: DiscordCommandFlagErrorTitleEnum.UNKNOWN_FLAG,
      };
    }
    const flag: DiscordCommandFlag<T> | undefined = _.find(
      this.getFlags(),
      (flag: Readonly<DiscordCommandFlag<T>>): boolean =>
        !_.isNil(
          _.find(
            flag.getShortcuts(),
            discordCommandRemoveFlagPrefix(messageFlag)
          )
        )
    );

    if (_.isNil(flag)) {
      return {
        description: `The flag \`${_.toString(
          discordCommandGetFlagName(messageFlag)
        )}\` is unknown to the \`${this.getCommand().getLowerCaseName()}\` feature.`,
        isUnknown: true,
        name: DiscordCommandFlagErrorTitleEnum.UNKNOWN_FLAG,
      };
    }

    return null;
  }

  private _splitMessageFlags(message: Readonly<string>): string[] {
    return _.split(message, ` `);
  }
}
