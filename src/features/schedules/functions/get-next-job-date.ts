import moment from 'moment-timezone';
import { Job } from 'node-schedule';

/**
 * @param root0
 * @param root0.nextInvocation
 */
export function getNextJobDate({ nextInvocation }: Readonly<Job>): string {
  return moment(nextInvocation().toISOString()).format(`HH:mm:ss`);
}
