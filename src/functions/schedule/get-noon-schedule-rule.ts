/**
 * @description
 * Get the schedule to run a job each day at noon.
 * @returns {string} A schedule which is trigger each day at noon.
 */
export function getNoonScheduleRule(): string {
  return `0 12 * * *`;
}
