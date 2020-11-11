import { fromNow } from '../../time/functions/from-now';
import moment from 'moment-timezone';
import { Job } from 'node-schedule';

export function getNextJobDateHumanized({ nextInvocation }: Readonly<Job>): string {
  return fromNow(moment(nextInvocation().toISOString()).toISOString(), false);
}
