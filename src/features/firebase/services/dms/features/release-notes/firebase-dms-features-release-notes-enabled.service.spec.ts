import { FirebaseDmsFeaturesReleaseNotesEnabledService } from './firebase-dms-features-release-notes-enabled.service';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { IObject } from '../../../../../../types/object';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../logger/interfaces/logger-log';
import { LoggerConfigService } from '../../../../../logger/services/config/logger-config.service';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { FirebaseDmFeatureReleaseNotesVersionEnum } from '../../../../enums/dms/features/firebase-dm-feature-release-notes-version.enum';
import { FirebaseDmFeatureVersionEnum } from '../../../../enums/dms/features/firebase-dm-feature-version.enum';
import { FirebaseDmVersionEnum } from '../../../../enums/dms/firebase-dm-version.enum';
import { IFirebaseDmV1 } from '../../../../interfaces/dms/firebase-dm-v1';
import { IFirebaseDm } from '../../../../types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../../../types/dms/firebase-dm-v-final';
import { FirebaseDmsService } from '../../firebase-dms.service';
import { User } from 'discord.js';
import { CollectionReference, WriteResult } from 'firebase-admin/firestore';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsFeaturesReleaseNotesEnabledService`, (): void => {
  let service: FirebaseDmsFeaturesReleaseNotesEnabledService;
  let coreEventService: CoreEventService;
  let firebaseDmsService: FirebaseDmsService;
  let loggerService: LoggerService;
  let loggerConfigService: LoggerConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseDmsService = FirebaseDmsService.getInstance();
    loggerService = LoggerService.getInstance();
    loggerConfigService = LoggerConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsFeaturesReleaseNotesEnabled service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsFeaturesReleaseNotesEnabledService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsFeaturesReleaseNotesEnabledService));
    });

    it(`should return the created FirebaseDmsFeaturesReleaseNotesEnabled service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsFeaturesReleaseNotesEnabledService.getInstance();

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

    it(`should notify the FirebaseDmsFeaturesReleaseNotesEnabled service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsFeaturesReleaseNotesEnabledService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_FEATURES_RELEASE_NOTES_ENABLED_SERVICE
      );
    });
  });

  describe(`updateStateByDmId()`, (): void => {
    let id: User['id'];
    let isEnabled: boolean;
    let collectionReference: CollectionReference<IFirebaseDm> | undefined;
    let firebaseDm: IFirebaseDm | null | undefined;
    let writeResult: WriteResult;

    let firebaseDmsServiceGetCollectionReferenceSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let firebaseDmsServiceGetDmSpy: jest.SpyInstance;
    let updateStateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesEnabledService();
      id = `dummy-user-id`;
      isEnabled = true;

      firebaseDmsServiceGetCollectionReferenceSpy = jest
        .spyOn(firebaseDmsService, `getCollectionReference`)
        .mockImplementation();
      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      firebaseDmsServiceGetDmSpy = jest.spyOn(firebaseDmsService, `getDm`).mockRejectedValue(new Error(`getDm error`));
      updateStateSpy = jest.spyOn(service, `updateState`).mockRejectedValue(new Error(`updateState error`));
      jest.spyOn(loggerConfigService, `shouldDisplayMoreDebugLogs`).mockReturnValue(true);
    });

    it(`should get the Firebase DMs collection`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(new Error(`Collection not available`));

      expect(firebaseDmsServiceGetCollectionReferenceSpy).toHaveBeenCalledTimes(1);
      expect(firebaseDmsServiceGetCollectionReferenceSpy).toHaveBeenCalledWith();
    });

    describe(`when the Firebase DMs collection is undefined`, (): void => {
      beforeEach((): void => {
        firebaseDmsServiceGetCollectionReferenceSpy.mockImplementation();
      });

      it(`should throw an error about the collection not available`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(new Error(`Collection not available`));
      });
    });

    describe(`when the Firebase DMs collection is valid`, (): void => {
      beforeEach((): void => {
        collectionReference = createMock<CollectionReference<IFirebaseDm>>({
          id: `dummy-collection-reference-id`,
        });

        firebaseDmsServiceGetCollectionReferenceSpy.mockReturnValue(collectionReference);
      });

      it(`should log the ID of the collection reference`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(new Error(`getDm error`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `FirebaseDmsFeaturesReleaseNotesEnabledService`,
          message: `text-Collection reference ID: value-dummy-collection-reference-id`,
        } as ILoggerLog);
      });

      it(`should log about the start of the update state`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(new Error(`getDm error`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
          context: `FirebaseDmsFeaturesReleaseNotesEnabledService`,
          message: `text-updating Firebase DM release notes feature enabled state...`,
        } as ILoggerLog);
      });

      it(`should fetch the Firebase DM with the given id`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(new Error(`getDm error`));

        expect(firebaseDmsServiceGetDmSpy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsServiceGetDmSpy).toHaveBeenCalledWith(`dummy-user-id`);
      });

      describe(`when the Firebase DM does not exists`, (): void => {
        beforeEach((): void => {
          firebaseDmsServiceGetDmSpy.mockRejectedValue(new Error(`getDm error`));
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(new Error(`getDm error`));
        });
      });

      describe(`when the Firebase DM exists`, (): void => {
        beforeEach((): void => {
          firebaseDm = undefined;

          firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
        });

        describe(`when the Firebase DM is undefined`, (): void => {
          beforeEach((): void => {
            firebaseDm = undefined;

            firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(
              new Error(`Firebase DM does not exists or is not up-to-date`)
            );
          });

          it(`should log about not finding a valid Firebase DM`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(
              new Error(`Firebase DM does not exists or is not up-to-date`)
            );

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
              context: `FirebaseDmsFeaturesReleaseNotesEnabledService`,
              message: `text-the Firebase DM value-dummy-user-id is not valid or up-to-date`,
            } as ILoggerLog);
          });
        });

        describe(`when the Firebase DM is null`, (): void => {
          beforeEach((): void => {
            firebaseDm = null;

            firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(
              new Error(`Firebase DM does not exists or is not up-to-date`)
            );
          });

          it(`should log about not finding a valid Firebase DM`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(
              new Error(`Firebase DM does not exists or is not up-to-date`)
            );

            expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
              context: `FirebaseDmsFeaturesReleaseNotesEnabledService`,
              message: `text-the Firebase DM value-dummy-user-id is not valid or up-to-date`,
            } as ILoggerLog);
          });
        });

        describe(`when the Firebase DM is a Firebase DM`, (): void => {
          beforeEach((): void => {
            firebaseDm = createMock<IFirebaseDm>();

            firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
          });

          // To change when v2 is out
          describe.skip(`when the Firebase DM is a Firebase DM not up-to-date`, (): void => {
            beforeEach((): void => {
              firebaseDm = createMock<IFirebaseDmV1>({
                // To change when v2 is out
                version: FirebaseDmVersionEnum.V1,
              });

              firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
            });

            it(`should throw an error`, async (): Promise<void> => {
              expect.assertions(1);

              await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(
                new Error(`Firebase DM does not exists or is not up-to-date`)
              );
            });

            it(`should log about not finding a valid Firebase DM`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.updateStateByDmId(id, isEnabled)).rejects.toThrow(
                new Error(`Firebase DM does not exists or is not up-to-date`)
              );

              expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
                context: `FirebaseDmsFeaturesReleaseNotesEnabledService`,
                message: `text-the Firebase DM value-dummy-user-id is not valid or up-to-date`,
              } as ILoggerLog);
            });
          });

          describe(`when the Firebase DM is a Firebase DM up-to-date`, (): void => {
            beforeEach((): void => {
              firebaseDm = createMock<IFirebaseDmVFinal>({
                version: FirebaseDmVersionEnum.V1,
              });

              firebaseDmsServiceGetDmSpy.mockResolvedValue(firebaseDm);
              updateStateSpy.mockResolvedValue(writeResult);
            });

            it(`should update the enabled state for this Firebase DM`, async (): Promise<void> => {
              expect.assertions(3);

              const result = await service.updateStateByDmId(id, isEnabled);

              expect(result).toStrictEqual(writeResult);
              expect(updateStateSpy).toHaveBeenCalledTimes(1);
              expect(updateStateSpy).toHaveBeenCalledWith(collectionReference, `dummy-user-id`, true, firebaseDm);
            });
          });
        });
      });
    });
  });

  describe(`getUpdatedDm()`, (): void => {
    let isEnabled: boolean;
    let firebaseDm: IFirebaseDmVFinal;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesEnabledService();
      isEnabled = false;
    });

    describe(`when the given Firebase DM is fully up-to-date`, (): void => {
      beforeEach((): void => {
        firebaseDm = createMock<IFirebaseDmVFinal>({
          features: {
            releaseNotes: {
              version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
            },
            version: FirebaseDmFeatureVersionEnum.V1,
          },
        });
      });

      describe(`when the given enable state is false`, (): void => {
        beforeEach((): void => {
          isEnabled = false;
        });

        it(`should return an object with a single path updating the enable state to false`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedDm(isEnabled, firebaseDm);

          expect(result).toStrictEqual({
            'features.releaseNotes.isEnabled': false,
          });
        });
      });

      describe(`when the given enable state is true`, (): void => {
        beforeEach((): void => {
          isEnabled = true;
        });

        it(`should return an object with a single path updating the enable state to true`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedDm(isEnabled, firebaseDm);

          expect(result).toStrictEqual({
            'features.releaseNotes.isEnabled': true,
          });
        });
      });
    });

    describe(`when the given Firebase DM is not fully up-to-date`, (): void => {
      beforeEach((): void => {
        firebaseDm = createMock<IFirebaseDmVFinal>();
      });

      describe(`when the given Firebase DM is without any features`, (): void => {
        beforeEach((): void => {
          firebaseDm = createMock<IFirebaseDmVFinal>({
            id: `dummy-dm-id`,
            version: FirebaseDmVersionEnum.V1,
          });
        });

        describe(`when the given enable state is false`, (): void => {
          beforeEach((): void => {
            isEnabled = false;
          });

          it(`should return an object with a multiple paths updating the enable state to true`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedDm(isEnabled, firebaseDm);

            expect(result).toStrictEqual({
              'features.releaseNotes.isEnabled': false,
              'features.releaseNotes.version': 1,
              'features.version': 1,
              'id': `dummy-dm-id`,
              'version': 1,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedDm(isEnabled, firebaseDm);

            expect(result).toStrictEqual({
              'features.releaseNotes.isEnabled': true,
              'features.releaseNotes.version': 1,
              'features.version': 1,
              'id': `dummy-dm-id`,
              'version': 1,
            });
          });
        });
      });

      describe(`when the given Firebase DM is with features but without release notes`, (): void => {
        beforeEach((): void => {
          firebaseDm = createMock<IFirebaseDmVFinal>({
            features: {
              version: FirebaseDmFeatureVersionEnum.V1,
            },
            id: `dummy-dm-id`,
            version: FirebaseDmVersionEnum.V1,
          });
        });

        describe(`when the given enable state is false`, (): void => {
          beforeEach((): void => {
            isEnabled = false;
          });

          it(`should return an object with a multiple paths updating the enable state to true`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedDm(isEnabled, firebaseDm);

            expect(result).toStrictEqual({
              'features.releaseNotes.isEnabled': false,
              'features.releaseNotes.version': 1,
              'features.version': 1,
              'id': `dummy-dm-id`,
              'version': 1,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedDm(isEnabled, firebaseDm);

            expect(result).toStrictEqual({
              'features.releaseNotes.isEnabled': true,
              'features.releaseNotes.version': 1,
              'features.version': 1,
              'id': `dummy-dm-id`,
              'version': 1,
            });
          });
        });
      });

      describe(`when the given Firebase DM is with release notes feature`, (): void => {
        beforeEach((): void => {
          firebaseDm = createMock<IFirebaseDmVFinal>({
            features: {
              releaseNotes: {
                version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
              },
              version: FirebaseDmFeatureVersionEnum.V1,
            },
            id: `dummy-dm-id`,
            version: FirebaseDmVersionEnum.V1,
          });
        });

        describe(`when the given enable state is false`, (): void => {
          beforeEach((): void => {
            isEnabled = false;
          });

          it(`should return an object with a multiple paths updating the enable state to true`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedDm(isEnabled, firebaseDm);

            expect(result).toStrictEqual({
              'features.releaseNotes.isEnabled': false,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedDm(isEnabled, firebaseDm);

            expect(result).toStrictEqual({
              'features.releaseNotes.isEnabled': true,
            });
          });
        });
      });
    });
  });

  describe(`updateState()`, (): void => {
    let collectionReference: CollectionReference<IFirebaseDm>;
    let id: User['id'];
    let isEnabled: boolean;
    let firebaseDm: IFirebaseDmVFinal;
    let updatedFirebaseDm: IObject;
    let writeResult: WriteResult;

    let docMock: jest.Mock;
    let updateMock: jest.Mock;
    let getUpdatedDmSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesEnabledService();
      id = `dummy-user-id`;
      isEnabled = true;
      firebaseDm = createMock<IFirebaseDmVFinal>();
      updatedFirebaseDm = createMock<IObject>();

      updateMock = jest.fn().mockRejectedValue(new Error(`update error`));
      docMock = jest.fn().mockReturnValue({
        update: updateMock,
      });
      collectionReference = createMock<CollectionReference<IFirebaseDm>>({
        doc: docMock,
      });
      getUpdatedDmSpy = jest.spyOn(service, `getUpdatedDm`).mockReturnValue(updatedFirebaseDm);
      loggerServiceSuccessSpy = jest.spyOn(loggerService, `success`).mockImplementation();
    });

    it(`should get the Firebase DM with the given id from the DMs`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.updateState(collectionReference, id, isEnabled, firebaseDm)).rejects.toThrow(
        new Error(`update error`)
      );

      expect(docMock).toHaveBeenCalledTimes(1);
      expect(docMock).toHaveBeenCalledWith(`dummy-user-id`);
    });

    it(`should get the updated Firebase DM`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.updateState(collectionReference, id, isEnabled, firebaseDm)).rejects.toThrow(
        new Error(`update error`)
      );

      expect(getUpdatedDmSpy).toHaveBeenCalledTimes(1);
      expect(getUpdatedDmSpy).toHaveBeenCalledWith(true, firebaseDm);
    });

    it(`should update the Firebase DM`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.updateState(collectionReference, id, isEnabled, firebaseDm)).rejects.toThrow(
        new Error(`update error`)
      );

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith(updatedFirebaseDm);
    });

    describe(`when the Firebase DM was not successfully updated`, (): void => {
      beforeEach((): void => {
        updateMock = jest.fn().mockRejectedValue(new Error(`update error`));
        docMock = jest.fn().mockReturnValue({
          update: updateMock,
        });
        collectionReference = createMock<CollectionReference<IFirebaseDm>>({
          doc: docMock,
        });
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.updateState(collectionReference, id, isEnabled, firebaseDm)).rejects.toThrow(
          new Error(`update error`)
        );
      });
    });

    describe(`when the Firebase DM was successfully updated`, (): void => {
      beforeEach((): void => {
        writeResult = createMock<WriteResult>();

        updateMock = jest.fn().mockResolvedValue(writeResult);
        docMock = jest.fn().mockReturnValue({
          update: updateMock,
        });
        collectionReference = createMock<CollectionReference<IFirebaseDm>>({
          doc: docMock,
        });
      });

      it(`should log about the Firebase DM updated`, async (): Promise<void> => {
        expect.assertions(2);

        await service.updateState(collectionReference, id, isEnabled, firebaseDm);

        expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsFeaturesReleaseNotesEnabledService`,
          message: `text-Firebase DM value-dummy-user-id release notes feature enabled state updated to value-true`,
        } as ILoggerLog);
      });

      it(`should return the result`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.updateState(collectionReference, id, isEnabled, firebaseDm);

        expect(result).toStrictEqual(writeResult);
      });
    });
  });
});
