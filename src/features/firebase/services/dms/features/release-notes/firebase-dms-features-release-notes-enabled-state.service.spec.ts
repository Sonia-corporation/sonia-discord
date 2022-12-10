import { FirebaseDmsFeaturesReleaseNotesEnabledStateService } from './firebase-dms-features-release-notes-enabled-state.service';
import { ServiceNameEnum } from '../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../logger/services/logger.service';
import { FirebaseDmFeatureReleaseNotesVersionEnum } from '../../../../enums/dms/features/firebase-dm-feature-release-notes-version.enum';
import { FirebaseDmFeatureVersionEnum } from '../../../../enums/dms/features/firebase-dm-feature-version.enum';
import { FirebaseDmVersionEnum } from '../../../../enums/dms/firebase-dm-version.enum';
import { IFirebaseDmVFinal } from '../../../../types/dms/firebase-dm-v-final';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseDmsFeaturesReleaseNotesEnabledStateService`, (): void => {
  let service: FirebaseDmsFeaturesReleaseNotesEnabledStateService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseDmsFeaturesReleaseNotesEnabledState service`, (): void => {
      expect.assertions(1);

      service = FirebaseDmsFeaturesReleaseNotesEnabledStateService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseDmsFeaturesReleaseNotesEnabledStateService));
    });

    it(`should return the created FirebaseDmsFeaturesReleaseNotesEnabledState service`, (): void => {
      expect.assertions(1);

      const result = FirebaseDmsFeaturesReleaseNotesEnabledStateService.getInstance();

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

    it(`should notify the FirebaseDmsFeaturesReleaseNotesEnabledState service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseDmsFeaturesReleaseNotesEnabledStateService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_DMS_FEATURES_RELEASE_NOTES_ENABLED_STATE_SERVICE
      );
    });
  });

  describe(`isEnabled()`, (): void => {
    let firebaseDm: IFirebaseDmVFinal;

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseDmsFeaturesReleaseNotesEnabledStateService();
      firebaseDm = createMock<IFirebaseDmVFinal>({
        id: `dummy-dm-id`,
        version: FirebaseDmVersionEnum.V1,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
    });

    describe(`when the DM features are not set`, (): void => {
      beforeEach((): void => {
        firebaseDm = {
          features: undefined,
          id: `dummy-dm-id`,
          version: FirebaseDmVersionEnum.V1,
        };
      });

      it(`should log about the features being not set`, (): void => {
        expect.assertions(2);

        service.isEnabled(firebaseDm);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseDmsFeaturesReleaseNotesEnabledStateService`,
          message: `text-Firebase DM value-dummy-dm-id features not set`,
        } as ILoggerLog);
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isEnabled(firebaseDm);

        expect(result).toBe(false);
      });
    });

    describe(`when the DM features are set`, (): void => {
      beforeEach((): void => {
        firebaseDm = {
          features: {},
          id: `dummy-dm-id`,
          version: FirebaseDmVersionEnum.V1,
        };
      });

      describe(`when the features are not up-to-date`, (): void => {
        beforeEach((): void => {
          firebaseDm = {
            features: {
              version: undefined,
            },
            id: `dummy-dm-id`,
            version: FirebaseDmVersionEnum.V1,
          };
        });

        it(`should log about the features being not up-to-date`, (): void => {
          expect.assertions(2);

          service.isEnabled(firebaseDm);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `FirebaseDmsFeaturesReleaseNotesEnabledStateService`,
            message: `text-Firebase DM value-dummy-dm-id features not up-to-date`,
          } as ILoggerLog);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isEnabled(firebaseDm);

          expect(result).toBe(false);
        });
      });

      describe(`when the features are up-to-date`, (): void => {
        beforeEach((): void => {
          firebaseDm = {
            features: {
              version: FirebaseDmFeatureVersionEnum.V1,
            },
            id: `dummy-dm-id`,
            version: FirebaseDmVersionEnum.V1,
          };
        });

        describe(`when the feature release notes is not set`, (): void => {
          beforeEach((): void => {
            firebaseDm = {
              features: {
                releaseNotes: undefined,
                version: FirebaseDmFeatureVersionEnum.V1,
              },
              id: `dummy-dm-id`,
              version: FirebaseDmVersionEnum.V1,
            };
          });

          it(`should log about the release notes feature being not set`, (): void => {
            expect.assertions(2);

            service.isEnabled(firebaseDm);

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `FirebaseDmsFeaturesReleaseNotesEnabledStateService`,
              message: `text-Firebase DM value-dummy-dm-id release notes feature not set`,
            } as ILoggerLog);
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.isEnabled(firebaseDm);

            expect(result).toBe(false);
          });
        });

        describe(`when the feature release notes is set`, (): void => {
          beforeEach((): void => {
            firebaseDm = {
              features: {
                releaseNotes: {},
                version: FirebaseDmFeatureVersionEnum.V1,
              },
              id: `dummy-dm-id`,
              version: FirebaseDmVersionEnum.V1,
            };
          });

          describe(`when the feature release notes is not up-to-date`, (): void => {
            beforeEach((): void => {
              firebaseDm = {
                features: {
                  releaseNotes: {
                    version: undefined,
                  },
                  version: FirebaseDmFeatureVersionEnum.V1,
                },
                id: `dummy-dm-id`,
                version: FirebaseDmVersionEnum.V1,
              };
            });

            it(`should log about the release notes feature being not up-to-date`, (): void => {
              expect.assertions(2);

              service.isEnabled(firebaseDm);

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                context: `FirebaseDmsFeaturesReleaseNotesEnabledStateService`,
                message: `text-Firebase DM value-dummy-dm-id release notes feature not up-to-date`,
              } as ILoggerLog);
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = service.isEnabled(firebaseDm);

              expect(result).toBe(false);
            });
          });

          describe(`when the feature release notes is up-to-date`, (): void => {
            beforeEach((): void => {
              firebaseDm = {
                features: {
                  releaseNotes: {
                    version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
                  },
                  version: FirebaseDmFeatureVersionEnum.V1,
                },
                id: `dummy-dm-id`,
                version: FirebaseDmVersionEnum.V1,
              };
            });

            describe(`when the feature release notes enabled state is undefined`, (): void => {
              beforeEach((): void => {
                firebaseDm = {
                  features: {
                    releaseNotes: {
                      isEnabled: undefined,
                      version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
                    },
                    version: FirebaseDmFeatureVersionEnum.V1,
                  },
                  id: `dummy-dm-id`,
                  version: FirebaseDmVersionEnum.V1,
                };
              });

              it(`should not log`, (): void => {
                expect.assertions(1);

                service.isEnabled(firebaseDm);

                expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
              });

              it(`should return false`, (): void => {
                expect.assertions(1);

                const result = service.isEnabled(firebaseDm);

                expect(result).toBe(false);
              });
            });

            describe(`when the feature release notes enabled state is false`, (): void => {
              beforeEach((): void => {
                firebaseDm = {
                  features: {
                    releaseNotes: {
                      isEnabled: false,
                      version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
                    },
                    version: FirebaseDmFeatureVersionEnum.V1,
                  },
                  id: `dummy-dm-id`,
                  version: FirebaseDmVersionEnum.V1,
                };
              });

              it(`should not log`, (): void => {
                expect.assertions(1);

                service.isEnabled(firebaseDm);

                expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
              });

              it(`should return false`, (): void => {
                expect.assertions(1);

                const result = service.isEnabled(firebaseDm);

                expect(result).toBe(false);
              });
            });

            describe(`when the feature release notes enabled state is true`, (): void => {
              beforeEach((): void => {
                firebaseDm = {
                  features: {
                    releaseNotes: {
                      isEnabled: true,
                      version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
                    },
                    version: FirebaseDmFeatureVersionEnum.V1,
                  },
                  id: `dummy-dm-id`,
                  version: FirebaseDmVersionEnum.V1,
                };
              });

              it(`should not log`, (): void => {
                expect.assertions(1);

                service.isEnabled(firebaseDm);

                expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
              });

              it(`should return true`, (): void => {
                expect.assertions(1);

                const result = service.isEnabled(firebaseDm);

                expect(result).toBe(true);
              });
            });
          });
        });
      });
    });
  });
});
