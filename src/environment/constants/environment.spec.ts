import { LoggerConfigLevelEnum } from "../../features/logger/enums/logger-config-level.enum";
import { ENVIRONMENT } from "./environment";

describe(`ENVIRONMENT`, (): void => {
  it(`should have some prefixes for the Discord messages command interpreter`, (): void => {
    expect.assertions(1);

    expect(ENVIRONMENT.discord.message.command?.prefix).toStrictEqual([
      `-`,
      `!`,
      `$`,
    ]);
  });

  it(`should have a Discord application id for Sonia`, (): void => {
    expect.assertions(1);

    expect(ENVIRONMENT.discord.sonia?.id).toStrictEqual(`689829775317139460`);
  });

  it(`should have a fake Discord secret token for the Sonia bot`, (): void => {
    expect.assertions(1);

    expect(ENVIRONMENT.discord.sonia?.secretToken).toStrictEqual(
      `TO_DEFINE_BY_ASKING_IT_AND_ADD_IT_IN_SECRET_ENVIRONMENT_JSON_FILE`
    );
  });

  it(`should have a fake GitHub personal access token`, (): void => {
    expect.assertions(1);

    expect(ENVIRONMENT.github?.personalAccessToken).toStrictEqual(
      `TO_DEFINE_BY_YOU_AND_ADD_IT_IN_SECRET_ENVIRONMENT_JSON_FILE`
    );
  });

  it(`should allow to log`, (): void => {
    expect.assertions(1);

    expect(ENVIRONMENT.logger?.isEnabled).toStrictEqual(true);
  });

  it(`should log with the debug level`, (): void => {
    expect.assertions(1);

    expect(ENVIRONMENT.logger?.level).toStrictEqual(
      LoggerConfigLevelEnum.DEBUG
    );
  });
});
