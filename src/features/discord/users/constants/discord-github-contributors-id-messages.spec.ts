import { DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES } from './discord-github-contributors-id-messages';
import { Messages } from '../../messages/classes/messages';
import { DiscordGithubContributorsIdEnum } from '../enums/discord-github-contributors-id.enum';

describe(`DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES`, (): void => {
  it(`should be a messages of Discord GitHub contributors ids`, (): void => {
    expect.assertions(1);

    expect(DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES).toStrictEqual(
      new Messages<DiscordGithubContributorsIdEnum>({
        defaultMessage: DiscordGithubContributorsIdEnum.C0ZEN,
        messages: DiscordGithubContributorsIdEnum,
      })
    );
  });
});
