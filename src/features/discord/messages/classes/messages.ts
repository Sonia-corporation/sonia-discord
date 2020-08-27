import _ from "lodash";
import { IAnyObject } from "../../../../types/any-object";
import { IMessageConfig } from "../interfaces/message-config";

export class Messages<T extends string> {
  private _defaultMessage: T;
  private _messages: IAnyObject<T>;

  public constructor({
    defaultMessage,
    messages,
  }: Readonly<IMessageConfig<T>>) {
    this._defaultMessage = defaultMessage;
    this._messages = messages;
  }

  public getDefaultMessage(): T {
    return this._defaultMessage;
  }

  public setDefaultMessage(message: Readonly<T>): void {
    this._defaultMessage = message;
  }

  public getMessages(): IAnyObject<T> {
    return this._messages;
  }

  public setMessages(messages: Readonly<IAnyObject<T>>): void {
    this._messages = messages;
  }

  public getRandomMessage(): T {
    return _.sample(this.getMessages()) || this.getDefaultMessage();
  }
}
