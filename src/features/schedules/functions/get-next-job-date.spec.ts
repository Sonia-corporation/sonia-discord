import _ from "lodash";
import moment from "moment-timezone";
import { Job, scheduleJob } from "node-schedule";
import { getEveryHourScheduleRule } from "../../../functions/schedule/get-every-hour-schedule-rule";
import { getEveryMinuteScheduleRule } from "../../../functions/schedule/get-every-minute-schedule-rule";
import { getNoonScheduleRule } from "../../../functions/schedule/get-noon-schedule-rule";
import { getNextJobDate } from "./get-next-job-date";

describe(`getNextJobDate()`, (): void => {
  let job: Job;

  describe(`when the given job is in one hour`, (): void => {
    beforeEach((): void => {
      job = scheduleJob(getEveryHourScheduleRule(), _.noop);
    });

    it(`should return an humanized date set to one hour later from now`, (): void => {
      expect.assertions(1);

      const result = getNextJobDate(job);

      expect(result).toStrictEqual(
        `${moment().add(1, `hour`).format(`HH`)}:00:00`
      );
    });
  });

  describe(`when the given job is in one minute`, (): void => {
    beforeEach((): void => {
      job = scheduleJob(getEveryMinuteScheduleRule(), _.noop);
    });

    it(`should return an humanized date set to one minute later from now`, (): void => {
      expect.assertions(1);
      const inOneMinute: moment.Moment = moment().add(1, `minute`);

      const result = getNextJobDate(job);

      expect(result).toStrictEqual(`${inOneMinute.format(`HH:mm`)}:00`);
    });
  });

  describe(`when the given job is at noon`, (): void => {
    beforeEach((): void => {
      job = scheduleJob(getNoonScheduleRule(), _.noop);
    });

    it(`should return an humanized date set to noon`, (): void => {
      expect.assertions(1);

      const result = getNextJobDate(job);

      expect(result).toStrictEqual(`12:00:00`);
    });
  });
});
