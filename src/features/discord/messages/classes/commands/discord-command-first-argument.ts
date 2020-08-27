import _ from "lodash";
import { IDiscordCommandFirstArgument } from "../../interfaces/commands/discord-command-first-argument";

export class DiscordCommandFirstArgument<T> {
  private _description;
  private _name: T;
  private _shortcuts: T[] | undefined;

  /**
   * @param {Readonly<DiscordCommandFirstArgument>} discordCommandFirstArgument Default values
   */
  public constructor({
    description,
    name,
    shortcuts,
  }: Readonly<IDiscordCommandFirstArgument<T>>) {
    this._description = description;
    this._name = name;
    this._shortcuts = shortcuts;
  }

  public getDescription(): string {
    return this._description;
  }

  public setDescription(description: Readonly<string>): void {
    this._description = description;
  }

  public getName(): T {
    return this._name;
  }

  public getLowerCaseName(): string {
    return _.toLower(_.toString(this.getName()));
  }

  public setName(name: Readonly<T>): void {
    this._name = name;
  }

  public getShortcuts(): T[] | undefined {
    return this._shortcuts;
  }

  public getLowerCaseShortcuts(): string[] | undefined {
    return _.map(this.getShortcuts(), (shortcut: Readonly<T>): string =>
      _.toLower(_.toString(shortcut))
    );
  }

  public setShortcuts(shortcuts: Readonly<T>[] | Readonly<undefined>): void {
    this._shortcuts = shortcuts;
  }

  public getLowerCaseNameAndShortcutsExample(): string {
    const shortcuts: string[] | undefined = this.getLowerCaseShortcuts();
    let example = this.getLowerCaseName();

    if (_.isArray(shortcuts) && !_.isEmpty(shortcuts)) {
      example += ` (or ${_.trimEnd(
        _.reduce(
          shortcuts,
          (value: Readonly<string>, shortcut: Readonly<string>): string =>
            `${value}${shortcut}, `,
          ``
        ),
        `, `
      )})`;
    }

    return example;
  }
}
