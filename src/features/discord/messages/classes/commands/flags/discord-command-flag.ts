import _ from "lodash";
import { DiscordCommandFlagTypeEnum } from "../../../enums/commands/discord-command-flag-type.enum";
import { IDiscordCommandFlag } from "../../../interfaces/commands/flags/discord-command-flag";
import { IDiscordCommandFlagError } from "../../../interfaces/commands/flags/discord-command-flag-error";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { IDiscordCommandFlagAction } from "../../../types/commands/flags/discord-command-flag-action";
import { IDiscordCommandFlagResponse } from "../../../types/commands/flags/discord-command-flag-response";
import { IDiscordMessageFlag } from "../../../types/commands/flags/discord-message-flag";
import { DiscordCommandFlags } from "./discord-command-flags";

/**
 * @description
 * Common flag class
 * Contains all basic properties and methods for the flags
 */
export abstract class DiscordCommandFlag<
  T extends string,
  TAction extends IDiscordCommandFlagAction<T>
> {
  protected abstract _type: DiscordCommandFlagTypeEnum;
  protected _action: TAction;
  protected _description: string;
  protected _name: T;
  protected _opposites: T[] | undefined;
  protected _shortcuts: T[] | undefined;

  /**
   * @param {Readonly<IDiscordCommandFlag>} discordCommandFlag Default values
   */
  protected constructor({
    action,
    description,
    name,
    opposites,
    shortcuts,
  }: Readonly<IDiscordCommandFlag<T, TAction>>) {
    this._action = action;
    this._description = description;
    this._name = name;
    this._opposites = opposites;
    this._shortcuts = shortcuts;
  }

  public getAction(): TAction {
    return this._action;
  }

  public setAction(action: TAction): void {
    this._action = action;
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

  public getHumanizedName(): string {
    return _.capitalize(_.toString(this.getName()));
  }

  public setName(name: Readonly<T>): void {
    this._name = name;
  }

  public getOpposites(): T[] | undefined {
    return this._opposites;
  }

  public setOpposites(opposites: Readonly<T>[] | Readonly<undefined>): void {
    this._opposites = opposites;
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

  public getType(): DiscordCommandFlagTypeEnum {
    return this._type;
  }

  public setType(type: Readonly<DiscordCommandFlagTypeEnum>): void {
    this._type = type;
  }

  /**
   * @description
   * Return the flag name as example
   * This is the flag name with his shortcuts and without a value
   * Include the prefix
   *
   * @example
   * => `--alpha-flag`
   * => `--alpha-flag (or -e)`
   * => `--alpha-flag (or -e, -d)`
   *
   * @return {string} The flag name as example with his shortcuts
   */
  public getLowerCaseNameAndShortcutsExample(): string {
    const shortcuts: string[] | undefined = this.getLowerCaseShortcuts();
    let example = `--${this.getLowerCaseName()}`;

    if (_.isArray(shortcuts) && !_.isEmpty(shortcuts)) {
      example += ` (or ${_.trimEnd(
        _.reduce(
          shortcuts,
          (value: Readonly<string>, shortcut: Readonly<string>): string =>
            `${value}-${shortcut}, `,
          ``
        ),
        `, `
      )})`;
    }

    return example;
  }

  public executeAction(
    anyDiscordMessage: Readonly<IAnyDiscordMessage>,
    value: Readonly<string | null | undefined>,
    discordCommandFlags: Readonly<DiscordCommandFlags<T>>
  ): Promise<IDiscordCommandFlagResponse> {
    return this._action.execute(anyDiscordMessage, value, discordCommandFlags);
  }

  public abstract isValid(messageFlag: Readonly<IDiscordMessageFlag>): boolean;

  public abstract getInvalidFlagError(
    messageFlag: Readonly<IDiscordMessageFlag>
  ): IDiscordCommandFlagError | null;
}
