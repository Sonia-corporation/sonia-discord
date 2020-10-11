import { Guild } from "discord.js";
import admin from "firebase-admin";
import _ from "lodash";
import { AbstractService } from "../../../../../../../classes/services/abstract.service";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { flattenObject } from "../../../../../../../functions/formatters/flatten-object";
import { IObject } from "../../../../../../../types/object";
import { IAnyDiscordChannel } from "../../../../../../discord/channels/types/any-discord-channel";
import { ChalkService } from "../../../../../../logger/services/chalk/chalk.service";
import { LoggerService } from "../../../../../../logger/services/logger.service";
import { isUpToDateFirebaseGuild } from "../../../../../functions/guilds/is-up-to-date-firebase-guild";
import { IFirebaseGuildChannelVFinal } from "../../../../../types/guilds/channels/firebase-guild-channel-v-final";
import { IFirebaseGuild } from "../../../../../types/guilds/firebase-guild";
import { IFirebaseGuildVFinal } from "../../../../../types/guilds/firebase-guild-v-final";
import { FirebaseGuildsService } from "../../../firebase-guilds.service";
import { FirebaseGuildsChannelsService } from "../../firebase-guilds-channels.service";
import { FirebaseGuildsChannelsFeaturesService } from "../firebase-guilds-channels-features.service";
import { FirebaseGuildsChannelsFeaturesNoonService } from "./firebase-guilds-channels-features-noon.service";
import CollectionReference = admin.firestore.CollectionReference;
import WriteResult = admin.firestore.WriteResult;

export class FirebaseGuildsChannelsFeaturesNoonEnabledService extends AbstractService {
  private static _instance: FirebaseGuildsChannelsFeaturesNoonEnabledService;

  public static getInstance(): FirebaseGuildsChannelsFeaturesNoonEnabledService {
    if (_.isNil(FirebaseGuildsChannelsFeaturesNoonEnabledService._instance)) {
      FirebaseGuildsChannelsFeaturesNoonEnabledService._instance = new FirebaseGuildsChannelsFeaturesNoonEnabledService();
    }

    return FirebaseGuildsChannelsFeaturesNoonEnabledService._instance;
  }

  public constructor() {
    super(
      ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_SERVICE
    );
  }

  public updateStateByGuildId(
    id: Readonly<Guild["id"]>,
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>
  ): Promise<WriteResult | void> {
    const collectionReference:
      | CollectionReference<IFirebaseGuild>
      | undefined = FirebaseGuildsService.getInstance().getCollectionReference();

    if (!_.isNil(collectionReference)) {
      this._logUpdatingStateStart();

      return FirebaseGuildsService.getInstance()
        .getGuild(id)
        .then(
          (
            firebaseGuild: Readonly<IFirebaseGuild | null | undefined>
          ): Promise<WriteResult> => {
            if (this._isValidGuild(firebaseGuild)) {
              return this.updateState(
                collectionReference,
                id,
                channelId,
                isEnabled,
                firebaseGuild
              );
            }

            this._logInvalidFirebaseGuild(id);

            return Promise.reject(
              new Error(`Firebase guild does not exists or is not up-to-date`)
            );
          }
        );
    }

    return Promise.reject(new Error(`Collection not available`));
  }

  /**
   * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CONTRIBUTING.md#sonia-link-002}
   *
   * @param {Readonly<Snowflake>} channelId The [id]{@link Snowflake} of the channel
   * @param {Readonly<boolean>} isEnabled The new [enabled state]{@link IFirebaseGuildVFinal#channels#features#noon#isEnabled}
   * @param {Readonly<IFirebaseGuildVFinal>} firebaseGuild The current guild in the store
   *
   * @return {IObject} A flatten object updating only the enabled state or a more complete object to also up-to-date the models
   */
  public getUpdatedGuild(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): IObject {
    if (this._isGuildFullyUpToDate(channelId, firebaseGuild)) {
      this._logFullyUpToDateFirebaseGuild(firebaseGuild.id);

      return this._getUpdatedGuildWithPathOnly(channelId, isEnabled);
    }

    this._logNotUpToDateFirebaseGuild(firebaseGuild.id);

    return this._getUpdatedGuild(channelId, isEnabled, firebaseGuild);
  }

  public updateState(
    collectionReference: CollectionReference<IFirebaseGuild>,
    id: Readonly<Guild["id"]>,
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): Promise<WriteResult> {
    return collectionReference
      .doc(id)
      .update(this.getUpdatedGuild(channelId, isEnabled, firebaseGuild))
      .then(
        (writeResult: Readonly<WriteResult>): Promise<WriteResult> => {
          this._logUpdateStateSuccess(id, isEnabled);

          return Promise.resolve(writeResult);
        }
      );
  }

  private _isGuildFullyUpToDate(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return (
      this._isValidChannel(channelId, firebaseGuild) &&
      this._isValidFeature(channelId, firebaseGuild) &&
      this._isValidNoonFeature(channelId, firebaseGuild)
    );
  }

  private _isValidChannel(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return FirebaseGuildsChannelsService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId]
    );
  }

  private _isValidFeature(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return FirebaseGuildsChannelsFeaturesService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId].features
    );
  }

  private _isValidNoonFeature(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return FirebaseGuildsChannelsFeaturesNoonService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId].features?.noon
    );
  }

  private _getUpdatedGuild(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): IObject {
    const updatedFirebaseGuild: IFirebaseGuildVFinal = {
      channels: {
        [channelId]: FirebaseGuildsChannelsService.getInstance().getUpToDate(
          firebaseGuild.channels && firebaseGuild.channels[channelId],
          {
            id: channelId,
          }
        ),
      },
    };

    if (
      !_.isNil(updatedFirebaseGuild.channels) &&
      !_.isNil(updatedFirebaseGuild.channels[channelId])
    ) {
      const firebaseGuildChannel: IFirebaseGuildChannelVFinal =
        updatedFirebaseGuild.channels[channelId];

      firebaseGuildChannel.features = FirebaseGuildsChannelsFeaturesService.getInstance().getUpToDate(
        firebaseGuildChannel.features
      );
      firebaseGuildChannel.features.noon = FirebaseGuildsChannelsFeaturesNoonService.getInstance().getUpToDate(
        firebaseGuildChannel.features.noon
      );
      firebaseGuildChannel.features.noon.isEnabled = isEnabled;
      updatedFirebaseGuild.channels[channelId] = firebaseGuildChannel;
    }

    /**
     * @todo remove the spread once TS handle this properly
     *
     * @see https://github.com/microsoft/TypeScript/issues/15300#issuecomment-436793742 for the destructuring part
     */
    return flattenObject({ ...updatedFirebaseGuild });
  }

  /**
   * @private
   *
   * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CONTRIBUTING.md#sonia-link-002}
   *
   * @param {Readonly<Snowflake>} channelId The [id]{@link Snowflake} of the channel
   * @param {Readonly<boolean>} isEnabled The new [enabled state]{@link IFirebaseGuildVFinal#channels#features#noon#isEnabled}
   *
   * @return {IObject} A flatten object updating only the enabled state
   */
  private _getUpdatedGuildWithPathOnly(
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>
  ): IObject {
    const flattenFirebaseGuild: IObject = {};

    _.set(
      flattenFirebaseGuild,
      `channels.${channelId}.features.noon.isEnabled`,
      isEnabled
    );

    return flattenObject(flattenFirebaseGuild);
  }

  private _logUpdatingStateStart(): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `updating Firebase guild noon feature enabled state...`
      ),
    });
  }

  private _isValidGuild(
    firebaseGuild: Readonly<IFirebaseGuild | null | undefined>
  ): firebaseGuild is IFirebaseGuildVFinal {
    return !_.isNil(firebaseGuild) && isUpToDateFirebaseGuild(firebaseGuild);
  }

  private _logUpdateStateSuccess(
    id: Readonly<Guild["id"]>,
    isEnabled: Readonly<boolean>
  ): void {
    LoggerService.getInstance().success({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase guild ${ChalkService.getInstance().value(
          id
        )} noon feature enabled state updated to ${ChalkService.getInstance().value(
          isEnabled
        )}`
      ),
    });
  }

  private _logInvalidFirebaseGuild(id: Readonly<Guild["id"]>): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `the Firebase guild ${ChalkService.getInstance().value(
          id
        )} is not valid or up-to-date`
      ),
    });
  }

  private _logFullyUpToDateFirebaseGuild(
    id: Readonly<Guild["id"] | undefined>
  ): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase guild ${_.toString(id)} is up-to-date`
      ),
    });
  }

  private _logNotUpToDateFirebaseGuild(
    id: Readonly<Guild["id"] | undefined>
  ): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase guild ${_.toString(id)} is not up-to-date`
      ),
    });
  }
}
