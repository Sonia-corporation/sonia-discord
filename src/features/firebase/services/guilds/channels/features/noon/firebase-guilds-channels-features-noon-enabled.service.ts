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
import { IFirebaseGuild } from "../../../../../types/guilds/firebase-guild";
import { IFirebaseGuildVFinal } from "../../../../../types/guilds/firebase-guild-v-final";
import { FirebaseGuildsService } from "../../../firebase-guilds.service";
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

  public updateState(
    id: Readonly<Guild["id"]>,
    channelId: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>
  ): Promise<WriteResult> {
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
              return this._updateState(
                collectionReference,
                id,
                channelId,
                isEnabled,
                firebaseGuild
              );
            }

            return Promise.reject(new Error(`Firebase guild does not exists`));
          }
        );
    }

    return Promise.reject(new Error(`Collection not available`));
  }

  /**
   * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CONTRIBUTING.md#sonia-link-002}
   *
   * @param {Readonly<Snowflake>} id The [id]{@link Snowflake} of channel
   * @param {Readonly<boolean>} isEnabled The new [enabled state]{@link IFirebaseGuildVFinal#channels#features#noon#isEnabled}
   * @param {Readonly<IFirebaseGuildVFinal>} firebaseGuild The current guild in the store
   *
   * @return {IObject} A flatten object updating only the enabled state
   */
  public getUpdatedGuild(
    id: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>,
    firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): IObject {
    if (this._isGuildUpToDate(id, firebaseGuild)) {
      return this._getUpdatedGuildWithPathOnly(id, isEnabled);
    }

    return this._getUpdatedGuild(id, isEnabled, firebaseGuild);
  }

  private _isGuildUpToDate(
    _id: Readonly<IAnyDiscordChannel["id"]>,
    _firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): boolean {
    return true;
  }

  private _getUpdatedGuild(
    _id: Readonly<IAnyDiscordChannel["id"]>,
    _isEnabled: Readonly<boolean>,
    _firebaseGuild: Readonly<IFirebaseGuildVFinal>
  ): IObject {
    return {};
  }

  private _getUpdatedGuildWithPathOnly(
    id: Readonly<IAnyDiscordChannel["id"]>,
    isEnabled: Readonly<boolean>
  ): IObject {
    const flattenFirebaseGuild: IObject = {};

    _.set(
      flattenFirebaseGuild,
      `channels.${id}.features.noon.isEnabled`,
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

  private _updateState(
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
}
