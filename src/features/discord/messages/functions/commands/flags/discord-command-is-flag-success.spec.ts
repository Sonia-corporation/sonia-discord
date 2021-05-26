import { discordCommandIsFlagSuccess } from './discord-command-is-flag-success';
import { IDiscordCommandFlagSuccess } from '../../../interfaces/commands/flags/discord-command-flag-success';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { DiscordMessageCommandNoonFlagSuccessTitleEnum } from '../../../services/command/feature/features/noon/enums/discord-message-command-noon-flag-success-title.enum';
import { IDiscordCommandFlagResponse } from '../../../types/commands/flags/discord-command-flag-response';
import { createHydratedMock } from 'ts-auto-mock';

describe(`discordCommandIsFlagSuccess()`, (): void => {
  let value: IDiscordCommandFlagResponse;

  describe(`when the given value is a Discord message response`, (): void => {
    beforeEach((): void => {
      value = createHydratedMock<IDiscordMessageResponse>();
    });

    it(`should return false`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsFlagSuccess(value);

      expect(result).toStrictEqual(false);
    });
  });

  describe(`when the given value is a Discord command flag success`, (): void => {
    beforeEach((): void => {
      value = createHydratedMock<IDiscordCommandFlagSuccess>({
        description: ``,
        name: DiscordMessageCommandNoonFlagSuccessTitleEnum.NOON_FEATURE_ENABLED,
      });
    });

    it(`should return true`, (): void => {
      expect.assertions(1);

      const result = discordCommandIsFlagSuccess(value);

      expect(result).toStrictEqual(true);
    });
  });
});
