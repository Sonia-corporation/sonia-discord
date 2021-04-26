import { FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService } from './firebase-guilds-channels-features-release-notes-enabled-state.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from '../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-release-notes-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { FirebaseGuildChannelVersionEnum } from '../../../../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { IFirebaseGuildChannel } from '../../../../../types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuildVFinal } from '../../../../../types/guilds/firebase-guild-v-final';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService`, (): void => {
  let service: FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsChannelsFeaturesReleaseNotesEnabledState service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService));
    });

    it(`should return the created FirebaseGuildsChannelsFeaturesReleaseNotesEnabledState service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService.getInstance();

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

    it(`should notify the FirebaseGuildsChannelsFeaturesReleaseNotesEnabledState service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_RELEASE_NOTES_ENABLED_STATE_SERVICE
      );
    });
  });

  describe(`isEnabled()`, (): void => {
    let channel: IFirebaseGuildChannel;
    let firebaseGuild: IFirebaseGuildVFinal;

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService();
      channel = createHydratedMock<IFirebaseGuildChannel>();
      firebaseGuild = createHydratedMock<IFirebaseGuildVFinal>({
        id: `dummy-guild-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
    });

    describe(`when the given Firebase guild channel id is undefined`, (): void => {
      beforeEach((): void => {
        channel.id = undefined;
      });

      it(`should log about the channel id being invalid`, (): void => {
        expect.assertions(2);

        service.isEnabled(channel, firebaseGuild);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService`,
          message: `text-Firebase guild value-dummy-guild-id channel value-unknown has an invalid id`,
        } as ILoggerLog);
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const result = service.isEnabled(channel, firebaseGuild);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given Firebase guild channel id is valid`, (): void => {
      beforeEach((): void => {
        channel.id = `dummy-channel-id`;
      });

      describe(`when the given Firebase guild does not have a channel with the given id`, (): void => {
        beforeEach((): void => {
          firebaseGuild.channels = {};
        });

        it(`should log about the channel being not set`, (): void => {
          expect.assertions(2);

          service.isEnabled(channel, firebaseGuild);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService`,
            message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id not set`,
          } as ILoggerLog);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isEnabled(channel, firebaseGuild);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the channel is not up-to-date`, (): void => {
        beforeEach((): void => {
          firebaseGuild.channels = {
            'dummy-channel-id': {
              version: undefined,
            },
          };
        });

        it(`should log about the channel being not up-to-date`, (): void => {
          expect.assertions(2);

          service.isEnabled(channel, firebaseGuild);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService`,
            message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id not up-to-date`,
          } as ILoggerLog);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isEnabled(channel, firebaseGuild);

          expect(result).toStrictEqual(false);
        });
      });

      describe(`when the channel is up-to-date`, (): void => {
        beforeEach((): void => {
          firebaseGuild.channels = {
            'dummy-channel-id': {
              version: FirebaseGuildChannelVersionEnum.V2,
            },
          };
        });

        describe(`when the channel features are not set`, (): void => {
          beforeEach((): void => {
            firebaseGuild.channels = {
              'dummy-channel-id': {
                features: undefined,
                version: FirebaseGuildChannelVersionEnum.V2,
              },
            };
          });

          it(`should log about the features being not set`, (): void => {
            expect.assertions(2);

            service.isEnabled(channel, firebaseGuild);

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService`,
              message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id features not set`,
            } as ILoggerLog);
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = service.isEnabled(channel, firebaseGuild);

            expect(result).toStrictEqual(false);
          });
        });

        describe(`when the channel features are set`, (): void => {
          beforeEach((): void => {
            firebaseGuild.channels = {
              'dummy-channel-id': {
                features: {},
                version: FirebaseGuildChannelVersionEnum.V2,
              },
            };
          });

          describe(`when the features are not up-to-date`, (): void => {
            beforeEach((): void => {
              firebaseGuild.channels = {
                'dummy-channel-id': {
                  features: {
                    version: undefined,
                  },
                  version: FirebaseGuildChannelVersionEnum.V2,
                },
              };
            });

            it(`should log about the features being not up-to-date`, (): void => {
              expect.assertions(2);

              service.isEnabled(channel, firebaseGuild);

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService`,
                message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id features not up-to-date`,
              } as ILoggerLog);
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = service.isEnabled(channel, firebaseGuild);

              expect(result).toStrictEqual(false);
            });
          });

          describe(`when the features are up-to-date`, (): void => {
            beforeEach((): void => {
              firebaseGuild.channels = {
                'dummy-channel-id': {
                  features: {
                    version: FirebaseGuildChannelFeatureVersionEnum.V2,
                  },
                  version: FirebaseGuildChannelVersionEnum.V2,
                },
              };
            });

            describe(`when the feature release notes is not set`, (): void => {
              beforeEach((): void => {
                firebaseGuild.channels = {
                  'dummy-channel-id': {
                    features: {
                      releaseNotes: undefined,
                      version: FirebaseGuildChannelFeatureVersionEnum.V2,
                    },
                    version: FirebaseGuildChannelVersionEnum.V2,
                  },
                };
              });

              it(`should log about the release notes feature being not set`, (): void => {
                expect.assertions(2);

                service.isEnabled(channel, firebaseGuild);

                expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService`,
                  message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id release notes feature not set`,
                } as ILoggerLog);
              });

              it(`should return false`, (): void => {
                expect.assertions(1);

                const result = service.isEnabled(channel, firebaseGuild);

                expect(result).toStrictEqual(false);
              });
            });

            describe(`when the feature release notes is set`, (): void => {
              beforeEach((): void => {
                firebaseGuild.channels = {
                  'dummy-channel-id': {
                    features: {
                      releaseNotes: {},
                      version: FirebaseGuildChannelFeatureVersionEnum.V2,
                    },
                    version: FirebaseGuildChannelVersionEnum.V2,
                  },
                };
              });

              describe(`when the feature release notes is not up-to-date`, (): void => {
                beforeEach((): void => {
                  firebaseGuild.channels = {
                    'dummy-channel-id': {
                      features: {
                        releaseNotes: {
                          version: undefined,
                        },
                        version: FirebaseGuildChannelFeatureVersionEnum.V2,
                      },
                      version: FirebaseGuildChannelVersionEnum.V2,
                    },
                  };
                });

                it(`should log about the release notes feature being not up-to-date`, (): void => {
                  expect.assertions(2);

                  service.isEnabled(channel, firebaseGuild);

                  expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                  expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                    context: `FirebaseGuildsChannelsFeaturesReleaseNotesEnabledStateService`,
                    message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id release notes feature not up-to-date`,
                  } as ILoggerLog);
                });

                it(`should return false`, (): void => {
                  expect.assertions(1);

                  const result = service.isEnabled(channel, firebaseGuild);

                  expect(result).toStrictEqual(false);
                });
              });

              describe(`when the feature release notes is up-to-date`, (): void => {
                beforeEach((): void => {
                  firebaseGuild.channels = {
                    'dummy-channel-id': {
                      features: {
                        releaseNotes: {
                          version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
                        },
                        version: FirebaseGuildChannelFeatureVersionEnum.V2,
                      },
                      version: FirebaseGuildChannelVersionEnum.V2,
                    },
                  };
                });

                describe(`when the feature release notes enabled state is undefined`, (): void => {
                  beforeEach((): void => {
                    firebaseGuild.channels = {
                      'dummy-channel-id': {
                        features: {
                          releaseNotes: {
                            isEnabled: undefined,
                            version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
                          },
                          version: FirebaseGuildChannelFeatureVersionEnum.V2,
                        },
                        version: FirebaseGuildChannelVersionEnum.V2,
                      },
                    };
                  });

                  it(`should not log`, (): void => {
                    expect.assertions(1);

                    service.isEnabled(channel, firebaseGuild);

                    expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
                  });

                  it(`should return false`, (): void => {
                    expect.assertions(1);

                    const result = service.isEnabled(channel, firebaseGuild);

                    expect(result).toStrictEqual(false);
                  });
                });

                describe(`when the feature release notes enabled state is false`, (): void => {
                  beforeEach((): void => {
                    firebaseGuild.channels = {
                      'dummy-channel-id': {
                        features: {
                          releaseNotes: {
                            isEnabled: false,
                            version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
                          },
                          version: FirebaseGuildChannelFeatureVersionEnum.V2,
                        },
                        version: FirebaseGuildChannelVersionEnum.V2,
                      },
                    };
                  });

                  it(`should not log`, (): void => {
                    expect.assertions(1);

                    service.isEnabled(channel, firebaseGuild);

                    expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
                  });

                  it(`should return false`, (): void => {
                    expect.assertions(1);

                    const result = service.isEnabled(channel, firebaseGuild);

                    expect(result).toStrictEqual(false);
                  });
                });

                describe(`when the feature release notes enabled state is true`, (): void => {
                  beforeEach((): void => {
                    firebaseGuild.channels = {
                      'dummy-channel-id': {
                        features: {
                          releaseNotes: {
                            isEnabled: true,
                            version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
                          },
                          version: FirebaseGuildChannelFeatureVersionEnum.V2,
                        },
                        version: FirebaseGuildChannelVersionEnum.V2,
                      },
                    };
                  });

                  it(`should not log`, (): void => {
                    expect.assertions(1);

                    service.isEnabled(channel, firebaseGuild);

                    expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
                  });

                  it(`should return true`, (): void => {
                    expect.assertions(1);

                    const result = service.isEnabled(channel, firebaseGuild);

                    expect(result).toStrictEqual(true);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
