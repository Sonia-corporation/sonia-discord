import _ from 'lodash';
import moment from 'moment';

export class Time {
  private static _instance: Time;

  public static getInstance(): Time {
    if (_.isNil(Time._instance)) {
      Time._instance = new Time();
    }

    return Time._instance;
  }

  public now(): string {
    return moment().format('HH:mm:ss');
  }
}
