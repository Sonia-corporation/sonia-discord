import moment from 'moment-timezone';
import { Job } from 'node-schedule';

/**
 * @description
 * From a job, return the next invocation date.
 * @param   {Job}    job The job to check.
 * @returns {string}     The given job next invocation date.
 */
export function getNextJobDate(job: Job): string {
  return moment(job.nextInvocation().toISOString()).format(`HH:mm:ss`);
}
