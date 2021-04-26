import { FirebaseGuildsChannelsFeaturesNoonEnabledStateService } from './firebase-guilds-channels-features-noon-enabled-state.service';
import { ServiceNameEnum } from '../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../core/services/core-event.service';
import { ILoggerLog } from '../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../logger/services/logger.service';
import { FirebaseGuildChannelFeatureNoonVersionEnum } from '../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { FirebaseGuildChannelVersionEnum } from '../../../../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { IFirebaseGuildChannel } from '../../../../../types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuildVFinal } from '../../../../../types/guilds/firebase-guild-v-final';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsChannelsFeaturesNoonEnabledStateService`, (): void => {
  let service: FirebaseGuildsChannelsFeaturesNoonEnabledStateService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsChannelsFeaturesNoonEnabledState service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsChannelsFeaturesNoonEnabledStateService.getInstance();

      expect(service).toStrictEqual(expect.any(FirebaseGuildsChannelsFeaturesNoonEnabledStateService));
    });

    it(`should return the created FirebaseGuildsChannelsFeaturesNoonEnabledState service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsChannelsFeaturesNoonEnabledStateService.getInstance();

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

    it(`should notify the FirebaseGuildsChannelsFeaturesNoonEnabledState service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsChannelsFeaturesNoonEnabledStateService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_STATE_SERVICE
      );
    });
  });

  describe(`isEnabled()`, (): void => {
    let channel: IFirebaseGuildChannel;
    let firebaseGuild: IFirebaseGuildVFinal;

    let loggerServiceDebugSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesNoonEnabledStateService();
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
          context: `FirebaseGuildsChannelsFeaturesNoonEnabledStateService`,
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
            context: `FirebaseGuildsChannelsFeaturesNoonEnabledStateService`,
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
            context: `FirebaseGuildsChannelsFeaturesNoonEnabledStateService`,
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
              context: `FirebaseGuildsChannelsFeaturesNoonEnabledStateService`,
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
                context: `FirebaseGuildsChannelsFeaturesNoonEnabledStateService`,
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

            describe(`when the feature noon is not set`, (): void => {
              beforeEach((): void => {
                firebaseGuild.channels = {
                  'dummy-channel-id': {
                    features: {
                      noon: undefined,
                      version: FirebaseGuildChannelFeatureVersionEnum.V2,
                    },
                    version: FirebaseGuildChannelVersionEnum.V2,
                  },
                };
              });

              it(`should log about the noon feature being not set`, (): void => {
                expect.assertions(2);

                service.isEnabled(channel, firebaseGuild);

                expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsChannelsFeaturesNoonEnabledStateService`,
                  message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id noon feature not set`,
                } as ILoggerLog);
              });

              it(`should return false`, (): void => {
                expect.assertions(1);

                const result = service.isEnabled(channel, firebaseGuild);

                expect(result).toStrictEqual(false);
              });
            });

            describe(`when the feature noon is set`, (): void => {
              beforeEach((): void => {
                firebaseGuild.channels = {
                  'dummy-channel-id': {
                    features: {
                      noon: {},
                      version: FirebaseGuildChannelFeatureVersionEnum.V2,
                    },
                    version: FirebaseGuildChannelVersionEnum.V2,
                  },
                };
              });

              describe(`when the feature noon is not up-to-date`, (): void => {
                beforeEach((): void => {
                  firebaseGuild.channels = {
                    'dummy-channel-id': {
                      features: {
                        noon: {
                          version: undefined,
                        },
                        version: FirebaseGuildChannelFeatureVersionEnum.V2,
                      },
                      version: FirebaseGuildChannelVersionEnum.V2,
                    },
                  };
                });

                it(`should log about the noon feature being not up-to-date`, (): void => {
                  expect.assertions(2);

                  service.isEnabled(channel, firebaseGuild);

                  expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
                  expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                    context: `FirebaseGuildsChannelsFeaturesNoonEnabledStateService`,
                    message: `text-Firebase guild value-dummy-guild-id channel value-dummy-channel-id noon feature not up-to-date`,
                  } as ILoggerLog);
                });

                it(`should return false`, (): void => {
                  expect.assertions(1);

                  const result = service.isEnabled(channel, firebaseGuild);

                  expect(result).toStrictEqual(false);
                });
              });

              describe(`when the feature noon is up-to-date`, (): void => {
                beforeEach((): void => {
                  firebaseGuild.channels = {
                    'dummy-channel-id': {
                      features: {
                        noon: {
                          version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
                        },
                        version: FirebaseGuildChannelFeatureVersionEnum.V2,
                      },
                      version: FirebaseGuildChannelVersionEnum.V2,
                    },
                  };
                });

                describe(`when the feature noon enabled state is undefined`, (): void => {
                  beforeEach((): void => {
                    firebaseGuild.channels = {
                      'dummy-channel-id': {
                        features: {
                          noon: {
                            isEnabled: undefined,
                            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
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

                describe(`when the feature noon enabled state is false`, (): void => {
                  beforeEach((): void => {
                    firebaseGuild.channels = {
                      'dummy-channel-id': {
                        features: {
                          noon: {
                            isEnabled: false,
                            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
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

                describe(`when the feature noon enabled state is true`, (): void => {
                  beforeEach((): void => {
                    firebaseGuild.channels = {
                      'dummy-channel-id': {
                        features: {
                          noon: {
                            isEnabled: true,
                            version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
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
