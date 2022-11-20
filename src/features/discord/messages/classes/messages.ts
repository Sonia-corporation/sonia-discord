import { replaceInterpolation } from '../../../../functions/formatters/replace-interpolation';
import { IObject } from '../../../../types/object';
import { IMessageConfig } from '../interfaces/message-config';
import _ from 'lodash';

export class Messages<T extends string, TParams extends IObject | undefined = undefined> {
  private _defaultMessage: T;
  private _messages: IObject<T>;
  private _params: TParams | undefined = undefined;

  public constructor({ defaultMessage, messages, params }: IMessageConfig<T, TParams>) {
    this._defaultMessage = defaultMessage;
    this._messages = messages;
    this._params = params;
  }

  public getDefaultMessage(): T {
    return this._defaultMessage;
  }

  public setDefaultMessage(message: T): void {
    this._defaultMessage = message;
  }

  public getMessages(): IObject<T> {
    return this._messages;
  }

  public setMessages(messages: IObject<T>): void {
    this._messages = messages;
  }

  public getParams(): TParams | undefined {
    return this._params;
  }

  public setParams(params: TParams): void {
    this._params = params;
  }

  public getRandomMessage(): T {
    return _.sample(this.getMessages()) ?? this.getDefaultMessage();
  }

  /**
   * @template TParams, TParams - The parameters.
   * @description
   * Replace inside the picked string the variables with the params.
   * If the picked message is "a message with a {{ variable }}"
   * and params is an object containing a key `variable` with value `dummy`
   * then the replacement will be made with "a message with a {{ variable }}".
   * @param   {TParams | undefined} [params=getParams] The object containing the replacements.
   * @returns {string}                                 The humanized and parsed message.
   * @example
   * getHumanizedRandomMessage({variable: 'dummy'});
   * // -> 'a message with a dummy'
   * @example
   * setParams({variable: 'dummy'});
   * getHumanizedRandomMessage();
   * // -> 'a message with a dummy'
   * @example
   * new Messages<T>({params: {variable: 'dummy'}, ...});
   * getHumanizedRandomMessage();
   * // -> 'a message with a dummy'
   */
  public getHumanizedRandomMessage(params: TParams | undefined = this.getParams()): string {
    return replaceInterpolation(this.getRandomMessage(), params ?? {});
  }
}
