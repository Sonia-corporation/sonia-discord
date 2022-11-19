import { FirebaseGuildsChannelsFeaturesNoonService } from './firebase-guilds-channels-features-noon.service';
import { AbstractService } from '../../../../../../../classes/services/abstract.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { flattenObject } from '../../../../../../../functions/formatters/flatten-object';
import { IObject } from '../../../../../../../types/object';
import { IAnyDiscordChannel } from '../../../../../../discord/channels/types/any-discord-channel';
import { ChalkService } from '../../../../../../logger/services/chalk/chalk.service';
import { LoggerConfigService } from '../../../../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { isUpToDateFirebaseGuild } from '../../../../../functions/guilds/is-up-to-date-firebase-guild';
import { IFirebaseGuildChannelVFinal } from '../../../../../types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuild } from '../../../../../types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../../../../types/guilds/firebase-guild-v-final';
import { FirebaseGuildsService } from '../../../firebase-guilds.service';
import { FirebaseGuildsChannelsService } from '../../firebase-guilds-channels.service';
import { FirebaseGuildsChannelsFeaturesService } from '../firebase-guilds-channels-features.service';
import { Guild } from 'discord.js';
import { CollectionReference, WriteResult } from 'firebase-admin/firestore';
import _ from 'lodash';

export class FirebaseGuildsChannelsFeaturesNoonEnabledService extends AbstractService {
  private static _instance: FirebaseGuildsChannelsFeaturesNoonEnabledService;

  public static getInstance(): FirebaseGuildsChannelsFeaturesNoonEnabledService {
    if (_.isNil(FirebaseGuildsChannelsFeaturesNoonEnabledService._instance)) {
      FirebaseGuildsChannelsFeaturesNoonEnabledService._instance =
        new FirebaseGuildsChannelsFeaturesNoonEnabledService();
    }

    return FirebaseGuildsChannelsFeaturesNoonEnabledService._instance;
  }

  public constructor() {
    super(ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_SERVICE);
  }

  public updateStateByGuildId(
    id: Guild['id'],
    channelId: IAnyDiscordChannel['id'],
    isEnabled: boolean
  ): Promise<WriteResult | void> {
    const collectionReference: CollectionReference<IFirebaseGuild> | undefined =
      FirebaseGuildsService.getInstance().getCollectionReference();

    if (_.isNil(collectionReference)) {
      return Promise.reject(new Error(`Collection not available`));
    }

    if (_.isEqual(LoggerConfigService.getInstance().shouldDisplayMoreDebugLogs(), true)) {
      LoggerService.getInstance().debug({
        context: this._serviceName,
        message: ChalkService.getInstance().text(
          `Collection reference ID: ${ChalkService.getInstance().value(collectionReference.id)}`
        ),
      });
    }

    this._logUpdatingStateStart();

    return FirebaseGuildsService.getInstance()
      .getGuild(id)
      .then((firebaseGuild: IFirebaseGuild | null | undefined): Promise<WriteResult> => {
        if (!this._isValidGuild(firebaseGuild)) {
          this._logInvalidFirebaseGuild(id);

          return Promise.reject(new Error(`Firebase guild does not exists or is not up-to-date`));
        }

        return this.updateState(collectionReference, id, channelId, isEnabled, firebaseGuild);
      });
  }

  /**
   * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}
   * @param {Snowflake} channelId The [id]{@link Snowflake} of the channel
   * @param {boolean} isEnabled The new [enabled state]{@link IFirebaseGuildVFinal#channels#features#noon#isEnabled}
   * @param {IFirebaseGuildVFinal} firebaseGuild The current guild in the store
   * @returns {IObject} A flatten object updating only the enabled state or a more complete object to also up-to-date the models
   */
  public getUpdatedGuild(
    channelId: IAnyDiscordChannel['id'],
    isEnabled: boolean,
    firebaseGuild: IFirebaseGuildVFinal
  ): IObject {
    if (!this._isGuildFullyUpToDate(channelId, firebaseGuild)) {
      this._logNotUpToDateFirebaseGuild(firebaseGuild.id);

      return this._getUpdatedGuild(channelId, isEnabled, firebaseGuild);
    }

    this._logFullyUpToDateFirebaseGuild(firebaseGuild.id);

    return this._getUpdatedGuildWithPathOnly(channelId, isEnabled);
  }

  public updateState(
    collectionReference: CollectionReference<IFirebaseGuild>,
    id: Guild['id'],
    channelId: IAnyDiscordChannel['id'],
    isEnabled: boolean,
    firebaseGuild: IFirebaseGuildVFinal
  ): Promise<WriteResult> {
    return collectionReference
      .doc(id)
      .update(this.getUpdatedGuild(channelId, isEnabled, firebaseGuild))
      .then((writeResult: WriteResult): Promise<WriteResult> => {
        this._logUpdateStateSuccess(id, isEnabled);

        return Promise.resolve(writeResult);
      });
  }

  private _isGuildFullyUpToDate(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): boolean {
    return (
      this._isValidChannel(channelId, firebaseGuild) &&
      this._isValidFeature(channelId, firebaseGuild) &&
      this._isValidNoonFeature(channelId, firebaseGuild)
    );
  }

  private _isValidChannel(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): boolean {
    return FirebaseGuildsChannelsService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId]
    );
  }

  private _isValidFeature(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): boolean {
    return FirebaseGuildsChannelsFeaturesService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId].features
    );
  }

  private _isValidNoonFeature(channelId: IAnyDiscordChannel['id'], firebaseGuild: IFirebaseGuildVFinal): boolean {
    return FirebaseGuildsChannelsFeaturesNoonService.getInstance().isValid(
      firebaseGuild.channels && firebaseGuild.channels[channelId].features?.noon
    );
  }

  private _getUpdatedGuild(
    channelId: IAnyDiscordChannel['id'],
    isEnabled: boolean,
    firebaseGuild: IFirebaseGuildVFinal
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

    if (!_.isNil(updatedFirebaseGuild.channels) && !_.isNil(updatedFirebaseGuild.channels[channelId])) {
      const firebaseGuildChannel: IFirebaseGuildChannelVFinal = updatedFirebaseGuild.channels[channelId];

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
     * @see https://github.com/microsoft/TypeScript/issues/15300#issuecomment-436793742 for the destructuring part
     */
    return flattenObject({ ...updatedFirebaseGuild });
  }

  /**
   * @private
   * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}
   * @param {Snowflake} channelId The [id]{@link Snowflake} of the channel
   * @param {boolean} isEnabled The new [enabled state]{@link IFirebaseGuildVFinal#channels#features#noon#isEnabled}
   * @returns {IObject} A flatten object updating only the enabled state
   */
  private _getUpdatedGuildWithPathOnly(channelId: IAnyDiscordChannel['id'], isEnabled: boolean): IObject {
    const flattenFirebaseGuild: IObject = {};

    _.set(flattenFirebaseGuild, `channels.${channelId}.features.noon.isEnabled`, isEnabled);

    return flattenObject(flattenFirebaseGuild);
  }

  private _logUpdatingStateStart(): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`updating Firebase guild noon feature enabled state...`),
    });
  }

  private _isValidGuild(firebaseGuild: IFirebaseGuild | null | undefined): firebaseGuild is IFirebaseGuildVFinal {
    return !_.isNil(firebaseGuild) && isUpToDateFirebaseGuild(firebaseGuild);
  }

  private _logUpdateStateSuccess(id: Guild['id'], isEnabled: boolean): void {
    LoggerService.getInstance().success({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `Firebase guild ${ChalkService.getInstance().value(
          id
        )} noon feature enabled state updated to ${ChalkService.getInstance().value(isEnabled)}`
      ),
    });
  }

  private _logInvalidFirebaseGuild(id: Guild['id']): void {
    LoggerService.getInstance().error({
      context: this._serviceName,
      message: ChalkService.getInstance().text(
        `the Firebase guild ${ChalkService.getInstance().value(id)} is not valid or up-to-date`
      ),
    });
  }

  private _logFullyUpToDateFirebaseGuild(id: Guild['id'] | undefined): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase guild ${_.toString(id)} is up-to-date`),
    });
  }

  private _logNotUpToDateFirebaseGuild(id: Guild['id'] | undefined): void {
    LoggerService.getInstance().debug({
      context: this._serviceName,
      message: ChalkService.getInstance().text(`Firebase guild ${_.toString(id)} is not up-to-date`),
    });
  }
}
