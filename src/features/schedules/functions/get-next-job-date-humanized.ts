import { fromNow } from '../../time/functions/from-now';
import moment from 'moment-timezone';
import { Job } from 'node-schedule';

/**
 * @description
 * From a job, return the next invocation date humanized.
 * @param   {Job}    job The job to check.
 * @returns {string}     The given job next invocation date humanized.
 */
export function getNextJobDateHumanized(job: Job): string {
  return fromNow(moment(job.nextInvocation().toISOString()).toISOString(), false);
}
