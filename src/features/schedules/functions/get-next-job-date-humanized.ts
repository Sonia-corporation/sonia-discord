import moment from "moment-timezone";
import { Job } from "node-schedule";
import { fromNow } from "../../time/functions/from-now";

export function getNextJobDateHumanized(job: Readonly<Job>): string {
  return fromNow(
    moment(job.nextInvocation().toISOString()).toISOString(),
    false
  );
}
