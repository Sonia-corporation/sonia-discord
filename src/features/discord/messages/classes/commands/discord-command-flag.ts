import _ from "lodash";
import { DiscordCommandFlagTypeEnum } from "../../enums/commands/discord-command-flag-type.enum";
import { IDiscordCommandFlag } from "../../interfaces/commands/discord-command-flag";

export class DiscordCommandFlag<T> {
  private _description;
  private _name: T;
  private _shortcuts: T[] | undefined;
  private _type: DiscordCommandFlagTypeEnum;

  /**
   * @param {Readonly<IDiscordCommandFlag>} discordCommandFlag Default values
   */
  public constructor({
    description,
    name,
    shortcuts,
    type,
  }: Readonly<IDiscordCommandFlag<T>>) {
    this._description = description;
    this._name = name;
    this._shortcuts = shortcuts;
    this._type = type;
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

  public setShortcuts(shortcuts: Readonly<T>[] | Readonly<undefined>): void {
    this._shortcuts = shortcuts;
  }

  public getType(): DiscordCommandFlagTypeEnum {
    return this._type;
  }

  public setType(type: Readonly<DiscordCommandFlagTypeEnum>): void {
    this._type = type;
  }
}
