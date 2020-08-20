import moment from "moment-timezone";
import { Job } from "node-schedule";

export function getNextJobDate({ nextInvocation }: Readonly<Job>): string {
  return moment(nextInvocation().toISOString()).format(`HH:mm:ss`);
}
