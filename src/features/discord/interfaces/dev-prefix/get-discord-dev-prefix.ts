export interface IGetDiscordDevPrefix {
  readonly asMention?: boolean;
  readonly discordId: string | null;
  readonly hasEmphasis?: boolean;
  readonly nickname: string | null;
}
