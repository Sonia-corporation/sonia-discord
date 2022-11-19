/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * @description
 * Add a new version each time the [Firebase guild channel]{@link IFirebaseGuildChannel} model change.
 * Update the [current Firebase guild channel version]{@link FIREBASE_GUILD_CHANNEL_CURRENT_VERSION} on change.
 */
export enum FirebaseGuildChannelVersionEnum {
  V1 = 1,
  V2 = 2,
}
