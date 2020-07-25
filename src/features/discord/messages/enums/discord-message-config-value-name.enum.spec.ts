import { DiscordMessageConfigValueNameEnum } from "./discord-message-config-value-name.enum";

describe(`DiscordMessageConfigValueNameEnum`, (): void => {
  it(`should have a member "COMMAND_COOKIE_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_COOKIE_IMAGE_COLOR
    ).toStrictEqual(`message command cookie image color`);
  });

  it(`should have a member "COMMAND_COOKIE_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_COOKIE_IMAGE_URL
    ).toStrictEqual(`message command cookie image url`);
  });

  it(`should have a member "COMMAND_ERROR_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_ERROR_IMAGE_COLOR
    ).toStrictEqual(`message command error image color`);
  });

  it(`should have a member "COMMAND_ERROR_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_ERROR_IMAGE_URL
    ).toStrictEqual(`message command error image url`);
  });

  it(`should have a member "COMMAND_HELP_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_HELP_IMAGE_COLOR
    ).toStrictEqual(`message command help image color`);
  });

  it(`should have a member "COMMAND_HELP_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_HELP_IMAGE_URL
    ).toStrictEqual(`message command help image url`);
  });

  it(`should have a member "COMMAND_LUNCH_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_LUNCH_IMAGE_COLOR
    ).toStrictEqual(`message command lunch image color`);
  });

  it(`should have a member "COMMAND_LUNCH_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_LUNCH_IMAGE_URL
    ).toStrictEqual(`message command lunch image url`);
  });

  it(`should have a member "COMMAND_PREFIX"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageConfigValueNameEnum.COMMAND_PREFIX).toStrictEqual(
      `message command prefix`
    );
  });

  it(`should have a member "COMMAND_RELEASE_NOTES_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_IMAGE_COLOR
    ).toStrictEqual(`message command release notes image color`);
  });

  it(`should have a member "COMMAND_RELEASE_NOTES_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_IMAGE_URL
    ).toStrictEqual(`message command release notes image url`);
  });

  it(`should have a member "COMMAND_VERSION_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_VERSION_IMAGE_COLOR
    ).toStrictEqual(`message command version image color`);
  });

  it(`should have a member "COMMAND_VERSION_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_VERSION_IMAGE_URL
    ).toStrictEqual(`message command version image url`);
  });

  it(`should have a member "ERROR_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageConfigValueNameEnum.ERROR_IMAGE_COLOR).toStrictEqual(
      `message error image color`
    );
  });

  it(`should have a member "ERROR_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageConfigValueNameEnum.ERROR_IMAGE_URL).toStrictEqual(
      `message error image url`
    );
  });

  it(`should have a member "WARNING_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageConfigValueNameEnum.WARNING_IMAGE_COLOR).toStrictEqual(
      `message warning image color`
    );
  });

  it(`should have a member "WARNING_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageConfigValueNameEnum.WARNING_IMAGE_URL).toStrictEqual(
      `message warning image url`
    );
  });
});
