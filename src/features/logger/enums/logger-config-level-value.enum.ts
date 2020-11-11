/* eslint-disable @typescript-eslint/naming-convention */
import { LOGGER_DEBUG_LEVEL } from '../constants/levels/logger-debug-level';
import { LOGGER_ERROR_LEVEL } from '../constants/levels/logger-error-level';
import { LOGGER_LOG_LEVEL } from '../constants/levels/logger-log-level';
import { LOGGER_SUCCESS_LEVEL } from '../constants/levels/logger-success-level';
import { LOGGER_WARNING_LEVEL } from '../constants/levels/logger-warning-level';

export enum LoggerConfigLevelValueEnum {
  error = LOGGER_ERROR_LEVEL,
  warning = LOGGER_WARNING_LEVEL,
  success = LOGGER_SUCCESS_LEVEL,
  log = LOGGER_LOG_LEVEL,
  debug = LOGGER_DEBUG_LEVEL,
}
