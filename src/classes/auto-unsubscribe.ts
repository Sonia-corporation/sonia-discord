import { Subscription } from 'rxjs';

/**
 * @description
 * This allows you to automatically unsubscribe your subscriptions
 * to avoid memory leaks and bugs
 *
 * @todo unsubscribe the root subscription when the class is destroyed
 */
export abstract class AutoUnsubscribe {
  private readonly _rootSubscription: Subscription = new Subscription();

  protected _registerSubscription(subscription: Readonly<Subscription>): void {
    this._rootSubscription.add(subscription);
  }
}
