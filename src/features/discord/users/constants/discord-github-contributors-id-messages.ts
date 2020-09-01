import { Messages } from "../../messages/classes/messages";
import { DiscordGithubContributorsIdEnum } from "../enums/discord-github-contributors-id.enum";

export const DISCORD_GITHUB_CONTRIBUTORS_ID_MESSAGES: Messages<DiscordGithubContributorsIdEnum> = new Messages<
  DiscordGithubContributorsIdEnum
>({
  defaultMessage: DiscordGithubContributorsIdEnum.C0ZEN,
  messages: DiscordGithubContributorsIdEnum,
});
