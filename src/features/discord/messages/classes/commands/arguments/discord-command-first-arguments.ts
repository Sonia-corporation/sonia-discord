import _ from "lodash";
import { removeUndefined } from "../../../../../../functions/formatters/remove-undefined";
import { DiscordCommandFirstArgument } from "./discord-command-first-argument";

export class DiscordCommandFirstArguments<T extends string> {
  private _arguments: DiscordCommandFirstArgument<T>[] = [];

  /**
   * @param {DiscordCommandFirstArgument<T>[]} discordCommandArguments Default values
   */
  public constructor(
    discordCommandArguments: DiscordCommandFirstArgument<T>[]
  ) {
    this._arguments = discordCommandArguments;
  }

  public getArguments(): DiscordCommandFirstArgument<T>[] {
    return this._arguments;
  }

  public setArguments(firstArguments: DiscordCommandFirstArgument<T>[]): void {
    this._arguments = firstArguments;
  }

  public getRandomArgument(): DiscordCommandFirstArgument<T> | undefined {
    return _.sample(this.getArguments());
  }

  public getRandomArgumentUsageExample(): string | undefined {
    const randomArgument:
      | DiscordCommandFirstArgument<T>
      | undefined = this.getRandomArgument();

    if (_.isNil(randomArgument)) {
      return undefined;
    }

    return randomArgument.getLowerCaseName();
  }

  public getAllArgumentsNameExample(): string {
    return _.trimEnd(
      _.reduce(
        this.getAllArgumentsLowerCaseName(),
        (value: Readonly<string>, argumentName: Readonly<string>): string =>
          `${value}\`${argumentName}\`, `,
        ``
      ),
      `, `
    );
  }

  public getAllArgumentsNameWithShortcutsExample(): string {
    return _.trimEnd(
      _.reduce(
        this.getArguments(),
        (
          value: Readonly<string>,
          argument: Readonly<DiscordCommandFirstArgument<T>>
        ): string =>
          `${value}\`${argument.getLowerCaseNameAndShortcutsExample()}\`, `,
        ``
      ),
      `, `
    );
  }

  public getAllArgumentsLowerCaseName(): string[] {
    return _.map(
      this.getArguments(),
      (argument: Readonly<DiscordCommandFirstArgument<T>>): string =>
        argument.getLowerCaseName()
    );
  }

  public getAllArgumentsLowerCaseNameWithShortcuts(): string[] {
    return _.flatten(
      _.map(
        this.getArguments(),
        (argument: Readonly<DiscordCommandFirstArgument<T>>): string[] =>
          removeUndefined(
            _.flatten([
              argument.getLowerCaseName(),
              argument.getLowerCaseShortcuts(),
            ])
          )
      )
    );
  }
}
