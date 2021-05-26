import { discordCommandSplitFlagsResponse } from './discord-command-split-flags-response';
import { IDiscordCommandFlagSuccess } from '../../../interfaces/commands/flags/discord-command-flag-success';
import { IDiscordMessageResponse } from '../../../interfaces/discord-message-response';
import { IDiscordCommandFlagsResponse } from '../../../types/commands/flags/discord-command-flags-response';
import { createHydratedMock } from 'ts-auto-mock';

describe(`discordCommandSplitFlagsResponse()`, (): void => {
  let discordCommandFlagsResponse: IDiscordCommandFlagsResponse;

  describe(`when the given Discord command flags response contains one command flag success`, (): void => {
    let discordCommandFlagSuccess: IDiscordCommandFlagSuccess;

    beforeEach((): void => {
      discordCommandFlagSuccess = createHydratedMock<IDiscordCommandFlagSuccess>();
      discordCommandFlagsResponse = [discordCommandFlagSuccess];
    });

    it(`should return a splitted list of flags response`, (): void => {
      expect.assertions(2);

      const result = discordCommandSplitFlagsResponse(discordCommandFlagsResponse);

      expect(result.commandFlagsSuccess).toStrictEqual([discordCommandFlagSuccess]);
      expect(result.messageResponses).toStrictEqual([]);
    });
  });

  describe(`when the given Discord command flags response contains two command flag success`, (): void => {
    let discordCommandFlagSuccessA: IDiscordCommandFlagSuccess;
    let discordCommandFlagSuccessB: IDiscordCommandFlagSuccess;

    beforeEach((): void => {
      discordCommandFlagSuccessA = createHydratedMock<IDiscordCommandFlagSuccess>();
      discordCommandFlagSuccessB = createHydratedMock<IDiscordCommandFlagSuccess>();
      discordCommandFlagsResponse = [discordCommandFlagSuccessA, discordCommandFlagSuccessB];
    });

    it(`should return a splitted list of flags response`, (): void => {
      expect.assertions(2);

      const result = discordCommandSplitFlagsResponse(discordCommandFlagsResponse);

      expect(result.commandFlagsSuccess).toStrictEqual([discordCommandFlagSuccessA, discordCommandFlagSuccessB]);
      expect(result.messageResponses).toStrictEqual([]);
    });
  });

  describe(`when the given Discord command flags response contains two command flag success and two message responses`, (): void => {
    let discordCommandFlagSuccessA: IDiscordCommandFlagSuccess;
    let discordCommandFlagSuccessB: IDiscordCommandFlagSuccess;
    let discordMessageResponseA: IDiscordMessageResponse;
    let discordMessageResponseB: IDiscordMessageResponse;

    beforeEach((): void => {
      discordCommandFlagSuccessA = createHydratedMock<IDiscordCommandFlagSuccess>();
      discordCommandFlagSuccessB = createHydratedMock<IDiscordCommandFlagSuccess>();
      discordMessageResponseA = createHydratedMock<IDiscordMessageResponse>();
      discordMessageResponseB = createHydratedMock<IDiscordMessageResponse>();
      discordCommandFlagsResponse = [
        discordCommandFlagSuccessA,
        discordCommandFlagSuccessB,
        discordMessageResponseA,
        discordMessageResponseB,
      ];
    });

    it(`should return a splitted list of flags response`, (): void => {
      expect.assertions(2);

      const result = discordCommandSplitFlagsResponse(discordCommandFlagsResponse);

      expect(result.commandFlagsSuccess).toStrictEqual([discordCommandFlagSuccessA, discordCommandFlagSuccessB]);
      expect(result.messageResponses).toStrictEqual([discordMessageResponseA, discordMessageResponseB]);
    });
  });
});
