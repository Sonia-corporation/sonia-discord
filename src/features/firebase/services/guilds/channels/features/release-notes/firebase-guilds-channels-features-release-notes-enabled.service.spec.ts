import { FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService } from './firebase-guilds-channels-features-release-notes-enabled.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { IObject } from '../../../../../../../types/object';
import { CoreEventService } from '../../../../../../core/services/core-event.service';
import { IAnyDiscordChannel } from '../../../../../../discord/channels/types/any-discord-channel';
import { ILoggerLog } from '../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from '../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-release-notes-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { FirebaseGuildChannelVersionEnum } from '../../../../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { FirebaseGuildVersionEnum } from '../../../../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV1 } from '../../../../../interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildVFinal } from '../../../../../types/guilds/firebase-guild-v-final';
import { IFirebaseGuild } from '../../../../../types/guilds/firebase-guild';
import { FirebaseGuildsService } from '../../../firebase-guilds.service';
import { Guild } from 'discord.js';
import * as admin from 'firebase-admin';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService`, (): void => {
  let service: FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService;
  let coreEventService: CoreEventService;
  let firebaseGuildsService: FirebaseGuildsService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsChannelsFeaturesReleaseNotesEnabled service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService));
    });

    it(`should return the created FirebaseGuildsChannelsFeaturesReleaseNotesEnabled service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the FirebaseGuildsChannelsFeaturesReleaseNotesEnabled service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_ENABLED_SERVICE
      );
    });
  });

  describe(`updateStateByGuildId()`, (): void => {
    let id: Guild['id'];
    let channelId: IAnyDiscordChannel['id'];
    let isEnabled: boolean;
    let collectionReference: admin.firestore.CollectionReference<IFirebaseGuild> | undefined;
    let firebaseGuild: IFirebaseGuild | null | undefined;
    let writeResult: admin.firestore.WriteResult;

    let firebaseGuildsServiceGetCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetGuildSpy: jest.SpyInstance;
    let updateStateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService();
      id = `dummy-id`;
      channelId = `dummy-channel-id`;
      isEnabled = true;

      firebaseGuildsServiceGetCollectionReferenceSpy = jest
        .spyOn(firebaseGuildsService, `getCollectionReference`)
        .mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      firebaseGuildsServiceGetGuildSpy = jest
        .spyOn(firebaseGuildsService, `getGuild`)
        .mockRejectedValue(new Error(`getGuild error`));
      updateStateSpy = jest.spyOn(service, `updateState`).mockRejectedValue(new Error(`updateState error`));
    });

    it(`should get the Firebase guilds collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
        new Error(`Collection not available`)
      );

      expect(firebaseGuildsServiceGetCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsServiceGetCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the Firebase guilds collection is undefined`, (): void => {
      beforeEach((): void => {
        firebaseGuildsServiceGetCollectionReferenceSpy.mockImplementation();
      });

      it(`should throw an error about the collection not available`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
          new Error(`Collection not available`)
        );
      });
    });

    describe(`when the Firebase guilds collection is valid`, (): void => {
      beforeEach((): void => {
        collectionReference = createHydratedMock<admin.firestore.CollectionReference<IFirebaseGuild>>();

        firebaseGuildsServiceGetCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should log about the start of the update state`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
          new Error(`getGuild error`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService`,
          message: `text-updating Firebase guild release notes feature enabled state...`,
        } as ILoggerLog);
      });

      it(`should fetch the Firebase guild with the given id`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
          new Error(`getGuild error`)
        );

        expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledTimes(1);
        expect(firebaseGuildsServiceGetGuildSpy).toHaveBeenCalledWith(`dummy-id`);
      });

      describe(`when the Firebase guild does not exists`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildSpy.mockRejectedValue(new Error(`getGuild error`));
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
            new Error(`getGuild error`)
          );
        });
      });

      describe(`when the Firebase guild exists`, (): void => {
        beforeEach((): void => {
          firebaseGuild = undefined;

          firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
        });

        describe(`when the Firebase guild is undefined`, (): void => {
          beforeEach((): void => {
            firebaseGuild = undefined;

            firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
              new Error(`Firebase guild does not exists or is not up-to-date`)
            );
          });

          it(`should log about not finding a valid Firebase guild`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
              new Error(`Firebase guild does not exists or is not up-to-date`)
            );

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService`,
              message: `text-the Firebase guild value-dummy-id is not valid or up-to-date`,
            } as ILoggerLog);
          });
        });

        describe(`when the Firebase guild is null`, (): void => {
          beforeEach((): void => {
            firebaseGuild = null;

            firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
              new Error(`Firebase guild does not exists or is not up-to-date`)
            );
          });

          it(`should log about not finding a valid Firebase guild`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
              new Error(`Firebase guild does not exists or is not up-to-date`)
            );

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService`,
              message: `text-the Firebase guild value-dummy-id is not valid or up-to-date`,
            } as ILoggerLog);
          });
        });

        describe(`when the Firebase guild is a Firebase guild`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createHydratedMock<IFirebaseGuild>();

            firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
          });

          describe(`when the Firebase guild is a Firebase guild not up-to-date`, (): void => {
            beforeEach((): void => {
              firebaseGuild = createHydratedMock<IFirebaseGuildV1>({
                version: FirebaseGuildVersionEnum.V1,
              });

              firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
            });

            it(`should throw an error`, async (): Promise<void> => {
              expect.assertions(1);

              await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
                new Error(`Firebase guild does not exists or is not up-to-date`)
              );
            });

            it(`should log about not finding a valid Firebase guild`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.updateStateByGuildId(id, channelId, isEnabled)).rejects.toThrow(
                new Error(`Firebase guild does not exists or is not up-to-date`)
              );

              expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService`,
                message: `text-the Firebase guild value-dummy-id is not valid or up-to-date`,
              } as ILoggerLog);
            });
          });

          describe(`when the Firebase guild is a Firebase guild up-to-date`, (): void => {
            beforeEach((): void => {
              firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
                version: FirebaseGuildVersionEnum.V5,
              });

              firebaseGuildsServiceGetGuildSpy.mockResolvedValue(firebaseGuild);
              updateStateSpy.mockResolvedValue(writeResult);
            });

            it(`should update the enabled state for this Firebase guild`, async (): Promise<void> => {
              expect.assertions(3);

              const result = await service.updateStateByGuildId(id, channelId, isEnabled);

              expect(result).toStrictEqual(writeResult);
              expect(updateStateSpy).toHaveBeenCalledTimes(1);
              expect(updateStateSpy).toHaveBeenCalledWith(
                collectionReference,
                `dummy-id`,
                `dummy-channel-id`,
                true,
                firebaseGuild
              );
            });
          });
        });
      });
    });
  });

  describe(`getUpdatedGuild()`, (): void => {
    let id: IAnyDiscordChannel['id'];
    let isEnabled: boolean;
    let firebaseGuild: IFirebaseGuildVFinal;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService();
      id = `dummy-id`;
      isEnabled = false;
    });

    describe(`when the given Firebase guild is fully up-to-date`, (): void => {
      beforeEach((): void => {
        firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
          channels: {
            'dummy-id': {
              features: {
                releaseNotes: {
                  version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
                },
                version: FirebaseGuildChannelFeatureVersionEnum.V2,
              },
              id: `dummy-id`,
              version: FirebaseGuildChannelVersionEnum.V2,
            },
          },
        });
      });

      describe(`when the given enable state is false`, (): void => {
        beforeEach((): void => {
          isEnabled = false;
        });

        it(`should return an object with a single path updating the enable state to false`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

          expect(result).toStrictEqual({
            'channels.dummy-id.features.releaseNotes.isEnabled': false,
          });
        });
      });

      describe(`when the given enable state is true`, (): void => {
        beforeEach((): void => {
          isEnabled = true;
        });

        it(`should return an object with a single path updating the enable state to true`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

          expect(result).toStrictEqual({
            'channels.dummy-id.features.releaseNotes.isEnabled': true,
          });
        });
      });
    });

    describe(`when the given Firebase guild is not fully up-to-date`, (): void => {
      beforeEach((): void => {
        firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>();
      });

      describe(`when the given Firebase guild does not have the channel with the given id`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
            channels: {
              'other-id': {
                id: `other-id`,
                version: FirebaseGuildChannelVersionEnum.V2,
              },
            },
          });
        });

        describe(`when the given enable state is false`, (): void => {
          beforeEach((): void => {
            isEnabled = false;
          });

          it(`should return an object with a multiple paths updating the enable state to true`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

            expect(result).toStrictEqual({
              'channels.dummy-id.features.releaseNotes.isEnabled': false,
              'channels.dummy-id.features.releaseNotes.version': 1,
              'channels.dummy-id.features.version': 2,
              'channels.dummy-id.id': `dummy-id`,
              'channels.dummy-id.version': 2,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

            expect(result).toStrictEqual({
              'channels.dummy-id.features.releaseNotes.isEnabled': true,
              'channels.dummy-id.features.releaseNotes.version': 1,
              'channels.dummy-id.features.version': 2,
              'channels.dummy-id.id': `dummy-id`,
              'channels.dummy-id.version': 2,
            });
          });
        });
      });

      describe(`when the given Firebase guild does have a channel with the given id but without any features`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
            channels: {
              'dummy-id': {
                id: `dummy-id`,
                version: FirebaseGuildChannelVersionEnum.V2,
              },
              'other-id': {
                id: `other-id`,
                version: FirebaseGuildChannelVersionEnum.V2,
              },
            },
          });
        });

        describe(`when the given enable state is false`, (): void => {
          beforeEach((): void => {
            isEnabled = false;
          });

          it(`should return an object with a multiple paths updating the enable state to true`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

            expect(result).toStrictEqual({
              'channels.dummy-id.features.releaseNotes.isEnabled': false,
              'channels.dummy-id.features.releaseNotes.version': 1,
              'channels.dummy-id.features.version': 2,
              'channels.dummy-id.id': `dummy-id`,
              'channels.dummy-id.version': 2,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

            expect(result).toStrictEqual({
              'channels.dummy-id.features.releaseNotes.isEnabled': true,
              'channels.dummy-id.features.releaseNotes.version': 1,
              'channels.dummy-id.features.version': 2,
              'channels.dummy-id.id': `dummy-id`,
              'channels.dummy-id.version': 2,
            });
          });
        });
      });

      describe(`when the given Firebase guild does have a channel with the given id with features but without release notes`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
            channels: {
              'dummy-id': {
                features: {
                  version: FirebaseGuildChannelFeatureVersionEnum.V2,
                },
                id: `dummy-id`,
                version: FirebaseGuildChannelVersionEnum.V2,
              },
              'other-id': {
                id: `other-id`,
                version: FirebaseGuildChannelVersionEnum.V2,
              },
            },
          });
        });

        describe(`when the given enable state is false`, (): void => {
          beforeEach((): void => {
            isEnabled = false;
          });

          it(`should return an object with a multiple paths updating the enable state to true`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

            expect(result).toStrictEqual({
              'channels.dummy-id.features.releaseNotes.isEnabled': false,
              'channels.dummy-id.features.releaseNotes.version': 1,
              'channels.dummy-id.features.version': 2,
              'channels.dummy-id.id': `dummy-id`,
              'channels.dummy-id.version': 2,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

            expect(result).toStrictEqual({
              'channels.dummy-id.features.releaseNotes.isEnabled': true,
              'channels.dummy-id.features.releaseNotes.version': 1,
              'channels.dummy-id.features.version': 2,
              'channels.dummy-id.id': `dummy-id`,
              'channels.dummy-id.version': 2,
            });
          });
        });
      });

      describe(`when the given Firebase guild does have a channel with the given id with release notes feature`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
            channels: {
              'dummy-id': {
                features: {
                  releaseNotes: {
                    version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
                  },
                  version: FirebaseGuildChannelFeatureVersionEnum.V2,
                },
                id: `dummy-id`,
                version: FirebaseGuildChannelVersionEnum.V2,
              },
              'other-id': {
                id: `other-id`,
                version: FirebaseGuildChannelVersionEnum.V2,
              },
            },
          });
        });

        describe(`when the given enable state is false`, (): void => {
          beforeEach((): void => {
            isEnabled = false;
          });

          it(`should return an object with a multiple paths updating the enable state to true`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

            expect(result).toStrictEqual({
              'channels.dummy-id.features.releaseNotes.isEnabled': false,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(id, isEnabled, firebaseGuild);

            expect(result).toStrictEqual({
              'channels.dummy-id.features.releaseNotes.isEnabled': true,
            });
          });
        });
      });
    });
  });

  describe(`updateState()`, (): void => {
    let collectionReference: admin.firestore.CollectionReference<IFirebaseGuild>;
    let id: Guild['id'];
    let channelId: IAnyDiscordChannel['id'];
    let isEnabled: boolean;
    let firebaseGuild: IFirebaseGuildVFinal;
    let updatedFirebaseGuild: IObject;
    let writeResult: admin.firestore.WriteResult;

    let docMock: jest.Mock;
    let updateMock: jest.Mock;
    let getUpdatedGuildSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService();
      id = `dummy-id`;
      channelId = `dummy-channel-id`;
      isEnabled = true;
      firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>();
      updatedFirebaseGuild = createHydratedMock<IObject>();

      updateMock = jest.fn().mockRejectedValue(new Error(`update error`));
      docMock = jest.fn().mockReturnValue({
        update: updateMock,
      });
      collectionReference = createHydratedMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
        doc: docMock,
      });
      getUpdatedGuildSpy = jest.spyOn(service, `getUpdatedGuild`).mockReturnValue(updatedFirebaseGuild);
      loggerServiceSuccessSpy = jest.spyOn(loggerService, `success`).mockImplementation();
    });

    it(`should get the Firebase guild with the given id from the guilds`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.updateState(collectionReference, id, channelId, isEnabled, firebaseGuild)).rejects.toThrow(
        new Error(`update error`)
      );

      expect(docMock).toHaveBeenCalledTimes(1);
      expect(docMock).toHaveBeenCalledWith(`dummy-id`);
    });

    it(`should get the updated Firebase guild`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.updateState(collectionReference, id, channelId, isEnabled, firebaseGuild)).rejects.toThrow(
        new Error(`update error`)
      );

      expect(getUpdatedGuildSpy).toHaveBeenCalledTimes(1);
      expect(getUpdatedGuildSpy).toHaveBeenCalledWith(`dummy-channel-id`, true, firebaseGuild);
    });

    it(`should update the Firebase guild`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.updateState(collectionReference, id, channelId, isEnabled, firebaseGuild)).rejects.toThrow(
        new Error(`update error`)
      );

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith(updatedFirebaseGuild);
    });

    describe(`when the Firebase guild was not successfully updated`, (): void => {
      beforeEach((): void => {
        updateMock = jest.fn().mockRejectedValue(new Error(`update error`));
        docMock = jest.fn().mockReturnValue({
          update: updateMock,
        });
        collectionReference = createHydratedMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
          doc: docMock,
        });
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.updateState(collectionReference, id, channelId, isEnabled, firebaseGuild)).rejects.toThrow(
          new Error(`update error`)
        );
      });
    });

    describe(`when the Firebase guild was successfully updated`, (): void => {
      beforeEach((): void => {
        writeResult = createHydratedMock<admin.firestore.WriteResult>();

        updateMock = jest.fn().mockResolvedValue(writeResult);
        docMock = jest.fn().mockReturnValue({
          update: updateMock,
        });
        collectionReference = createHydratedMock<admin.firestore.CollectionReference<IFirebaseGuild>>({
          doc: docMock,
        });
      });

      it(`should log about the Firebase guild updated`, async (): Promise<void> => {
        expect.assertions(2);

        await service.updateState(collectionReference, id, channelId, isEnabled, firebaseGuild);

        expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService`,
          message: `text-Firebase guild value-dummy-id release notes feature enabled state updated to value-true`,
        } as ILoggerLog);
      });

      it(`should return the result`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.updateState(collectionReference, id, channelId, isEnabled, firebaseGuild);

        expect(result).toStrictEqual(writeResult);
      });
    });
  });
});
