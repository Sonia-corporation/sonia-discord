import _ from "lodash";
import { getRandomBoolean } from "../../../../../../functions/randoms/get-random-boolean";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
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

  public getCommand(): string | DiscordCommandFirstArgument<string> {
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

    return null;
  }
}
