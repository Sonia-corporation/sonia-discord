import moment from "moment-timezone";
import { Job } from "node-schedule";

export function getNextJobDate(job: Readonly<Job>): string {
  return moment(job.nextInvocation().toISOString()).format(`HH:mm:ss`);
}
