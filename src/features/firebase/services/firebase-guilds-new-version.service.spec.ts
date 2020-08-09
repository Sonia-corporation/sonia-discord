import * as admin from "firebase-admin";
import { Subject } from "rxjs";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { AppConfigService } from "../../app/services/config/app-config.service";
import { CoreEventService } from "../../core/services/core-event.service";
import { DiscordChannelGuildService } from "../../discord/channels/services/discord-channel-guild.service";
import { DiscordGuildService } from "../../discord/guilds/services/discord-guild.service";
import { ILoggerLog } from "../../logger/interfaces/logger-log";
import { LoggerService } from "../../logger/services/logger.service";
import { FirebaseGuildVersionEnum } from "../enums/firebase-guild-version.enum";
import { IFirebaseGuildVFinal } from "../types/firebase-guild-v-final";
import { IUpdatedFirebaseGuildLastReleaseNotesVersion } from "../types/updated-firebase-guild-last-release-notes-version";
import { FirebaseGuildsBreakingChangeService } from "./firebase-guilds-breaking-change.service";
import { FirebaseGuildsNewVersionService } from "./firebase-guilds-new-version.service";
import { FirebaseGuildsService } from "./firebase-guilds.service";
import { Guild } from "discord.js";
import QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;
import QuerySnapshot = admin.firestore.QuerySnapshot;
import WriteBatch = admin.firestore.WriteBatch;
import WriteResult = admin.firestore.WriteResult;

jest.mock(`../../logger/services/chalk/chalk.service`);
jest.mock(`firebase-admin`);

describe(`FirebaseGuildsNewVersionService`, (): void => {
  let service: FirebaseGuildsNewVersionService;
  let coreEventService: CoreEventService;
  let firebaseGuildsService: FirebaseGuildsService;
  let loggerService: LoggerService;
  let firebaseGuildsBreakingChangeService: FirebaseGuildsBreakingChangeService;
  let appConfigService: AppConfigService;
  let discordGuildService: DiscordGuildService;
  let discordChannelGuildService: DiscordChannelGuildService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
    loggerService = LoggerService.getInstance();
    firebaseGuildsBreakingChangeService = FirebaseGuildsBreakingChangeService.getInstance();
    appConfigService = AppConfigService.getInstance();
    discordChannelGuildService = DiscordChannelGuildService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsNewVersion service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsNewVersionService.getInstance();

      expect(service).toStrictEqual(
        expect.any(FirebaseGuildsNewVersionService)
      );
    });

    it(`should return the created FirebaseGuildsNewVersion service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsNewVersionService.getInstance();

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

    it(`should notify the FirebaseGuildsNewVersion service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsNewVersionService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_NEW_VERSION_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let sendNewReleaseNotesToEachGuild$: Subject<true>;

    let sendNewReleaseNotesToEachGuild$Spy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      sendNewReleaseNotesToEachGuild$ = new Subject<true>();

      sendNewReleaseNotesToEachGuild$Spy = jest
        .spyOn(service, `sendNewReleaseNotesToEachGuild$`)
        .mockReturnValue(sendNewReleaseNotesToEachGuild$);
    });

    it(`should send a new release note to each known guild`, (): void => {
      expect.assertions(2);

      service.init();

      expect(sendNewReleaseNotesToEachGuild$Spy).toHaveBeenCalledTimes(1);
      expect(sendNewReleaseNotesToEachGuild$Spy).toHaveBeenCalledWith();
    });
  });

  describe(`isReady$()`, (): void => {
    let firebaseGuildsBreakingChangeServiceHasFinishedSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      firebaseGuildsBreakingChangeServiceHasFinishedSpy = jest
        .spyOn(firebaseGuildsBreakingChangeService, `hasFinished`)
        .mockResolvedValue(true);
    });

    describe(`when the Firebase guilds breaking changes failed`, (): void => {
      beforeEach((): void => {
        firebaseGuildsBreakingChangeServiceHasFinishedSpy.mockRejectedValue(
          new Error(`error`)
        );
      });

      it(`should consider that the service is not ready`, (done): void => {
        expect.assertions(1);

        service.isReady$().subscribe({
          error: (error): void => {
            expect(error).toStrictEqual(new Error(`error`));
            done();
          },
          next: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
        });
      });
    });

    describe(`when the Firebase guilds breaking changes were successful`, (): void => {
      beforeEach((): void => {
        firebaseGuildsBreakingChangeServiceHasFinishedSpy.mockResolvedValue(
          true
        );
      });

      it(`should consider that the service is ready`, (done): void => {
        expect.assertions(1);

        service.isReady$().subscribe({
          error: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
          next: (result): void => {
            expect(result).toStrictEqual([true]);
            done();
          },
        });
      });
    });
  });

  describe(`sendNewReleaseNotesToEachGuild$()`, (): void => {
    let isReady$: Subject<[true]>;
    let querySnapshot: QuerySnapshot<IFirebaseGuildVFinal>;
    let writeBatch: WriteBatch;
    let queryDocumentSnapshot: QueryDocumentSnapshot<IFirebaseGuildVFinal>;
    let firebaseGuild: IFirebaseGuildVFinal;

    let isReady$Spy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetGuildsSpy: jest.SpyInstance;
    let firebaseGuildsServiceGetBatchSpy: jest.SpyInstance;
    let appConfigServiceGetVersionSpy: jest.SpyInstance;
    let sendNewReleaseNotesFromFirebaseGuildSpy: jest.SpyInstance;
    let forEachMock: jest.Mock;
    let commitMock: jest.Mock;
    let updateMock: jest.Mock;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      isReady$ = new Subject<[true]>();
      firebaseGuild = createMock<IFirebaseGuildVFinal>({
        lastReleaseNotesVersion: `1.0.0`,
        version: FirebaseGuildVersionEnum.V2,
      });
      queryDocumentSnapshot = createMock<
        QueryDocumentSnapshot<IFirebaseGuildVFinal>
      >({
        data: (): IFirebaseGuildVFinal => {
          return firebaseGuild;
        },
      });
      forEachMock = jest
        .fn()
        .mockImplementation(
          (
            callback: (
              result: QueryDocumentSnapshot<IFirebaseGuildVFinal>
            ) => void
          ): void => {
            callback(queryDocumentSnapshot);
          }
        );
      querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
        forEach: forEachMock,
      });
      commitMock = jest.fn().mockImplementation();
      updateMock = jest.fn().mockImplementation();
      writeBatch = createMock<WriteBatch>({
        commit: commitMock,
        update: updateMock,
      });

      isReady$Spy = jest.spyOn(service, `isReady$`).mockReturnValue(isReady$);
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      loggerServiceErrorSpy = jest
        .spyOn(loggerService, `error`)
        .mockImplementation();
      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
      firebaseGuildsServiceGetGuildsSpy = jest
        .spyOn(firebaseGuildsService, `getGuilds`)
        .mockResolvedValue(querySnapshot);
      firebaseGuildsServiceGetBatchSpy = jest
        .spyOn(firebaseGuildsService, `getBatch`)
        .mockImplementation();
      appConfigServiceGetVersionSpy = jest
        .spyOn(appConfigService, `getVersion`)
        .mockImplementation();
      sendNewReleaseNotesFromFirebaseGuildSpy = jest
        .spyOn(service, `sendNewReleaseNotesFromFirebaseGuild`)
        .mockResolvedValue();
    });

    it(`should wait that everything is ready`, (done): void => {
      expect.assertions(2);

      service.sendNewReleaseNotesToEachGuild$().subscribe({
        error: (): void => {
          expect(isReady$Spy).toHaveBeenCalledTimes(1);
          expect(isReady$Spy).toHaveBeenCalledWith();
          done();
        },
        next: (): void => {
          expect(true).toStrictEqual(false);
          done();
        },
      });
      isReady$.next([true]);
    });

    describe(`when an error occur when waiting to be ready`, (): void => {
      beforeEach((): void => {
        isReady$.error(new Error(`error`));
      });

      it(`should not get the guilds`, (done): void => {
        expect.assertions(1);

        service.sendNewReleaseNotesToEachGuild$().subscribe({
          error: (): void => {
            expect(firebaseGuildsServiceGetGuildsSpy).not.toHaveBeenCalled();
            done();
          },
          next: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
        });
        isReady$.next([true]);
      });

      it(`should not get a Firebase guilds batch`, (done): void => {
        expect.assertions(1);

        service.sendNewReleaseNotesToEachGuild$().subscribe({
          error: (): void => {
            expect(firebaseGuildsServiceGetBatchSpy).not.toHaveBeenCalled();
            done();
          },
          next: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
        });
        isReady$.next([true]);
      });

      it(`should not update the Firebase guild batch`, (done): void => {
        expect.assertions(1);

        service.sendNewReleaseNotesToEachGuild$().subscribe({
          error: (): void => {
            expect(updateMock).not.toHaveBeenCalled();
            done();
          },
          next: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
        });
        isReady$.next([true]);
      });

      it(`should not commit the batch`, (done): void => {
        expect.assertions(1);

        service.sendNewReleaseNotesToEachGuild$().subscribe({
          error: (): void => {
            expect(commitMock).not.toHaveBeenCalled();
            done();
          },
          next: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
        });
        isReady$.next([true]);
      });

      it(`should not send the release notes message for the guilds`, (done): void => {
        expect.assertions(1);

        service.sendNewReleaseNotesToEachGuild$().subscribe({
          error: (): void => {
            expect(
              sendNewReleaseNotesFromFirebaseGuildSpy
            ).not.toHaveBeenCalled();
            done();
          },
          next: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
        });
        isReady$.next([true]);
      });
    });

    describe(`once that everything is ready`, (): void => {
      beforeEach((): void => {
        isReady$.next([true]);
      });

      it(`should log about processing the sending of release notes to each guild...`, (done): void => {
        expect.assertions(2);

        service.sendNewReleaseNotesToEachGuild$().subscribe({
          error: (): void => {
            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
              context: `FirebaseGuildsNewVersionService`,
              message: `text-processing the sending of release notes to each guild...`,
            } as ILoggerLog);
            done();
          },
          next: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
        });
        isReady$.next([true]);
      });

      it(`should get the guilds`, (done): void => {
        expect.assertions(2);

        service.sendNewReleaseNotesToEachGuild$().subscribe({
          error: (): void => {
            expect(firebaseGuildsServiceGetGuildsSpy).toHaveBeenCalledTimes(1);
            expect(firebaseGuildsServiceGetGuildsSpy).toHaveBeenCalledWith();
            done();
          },
          next: (): void => {
            expect(true).toStrictEqual(false);
            done();
          },
        });
        isReady$.next([true]);
      });

      describe(`when an error occurred when fetching the guilds`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildsSpy.mockRejectedValue(
            new Error(`error`)
          );
        });

        it(`should not get a Firebase guilds batch`, (done): void => {
          expect.assertions(2);

          service.sendNewReleaseNotesToEachGuild$().subscribe({
            error: (): void => {
              expect(firebaseGuildsServiceGetBatchSpy).not.toHaveBeenCalled();
              done();
            },
            next: (): void => {
              expect(true).toStrictEqual(false);
              done();
            },
          });
          isReady$.next([true]);
        });

        it(`should not update the Firebase guild batch`, (done): void => {
          expect.assertions(1);

          service.sendNewReleaseNotesToEachGuild$().subscribe({
            error: (): void => {
              expect(updateMock).not.toHaveBeenCalled();
              done();
            },
            next: (): void => {
              expect(true).toStrictEqual(false);
              done();
            },
          });
          isReady$.next([true]);
        });

        it(`should not commit the batch`, (done): void => {
          expect.assertions(1);

          service.sendNewReleaseNotesToEachGuild$().subscribe({
            error: (): void => {
              expect(commitMock).not.toHaveBeenCalled();
              done();
            },
            next: (): void => {
              expect(true).toStrictEqual(false);
              done();
            },
          });
          isReady$.next([true]);
        });

        it(`should not send the release notes message for the guilds`, (done): void => {
          expect.assertions(1);

          service.sendNewReleaseNotesToEachGuild$().subscribe({
            error: (): void => {
              expect(
                sendNewReleaseNotesFromFirebaseGuildSpy
              ).not.toHaveBeenCalled();
              done();
            },
            next: (): void => {
              expect(true).toStrictEqual(false);
              done();
            },
          });
          isReady$.next([true]);
        });
      });

      describe(`when the guilds were successfully fetched`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(querySnapshot);
        });

        it(`should log about the guilds fetched success`, (done): void => {
          expect.assertions(2);

          service.sendNewReleaseNotesToEachGuild$().subscribe({
            error: (): void => {
              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                context: `FirebaseGuildsNewVersionService`,
                message: `text-guilds fetched`,
              } as ILoggerLog);
              done();
            },
            next: (): void => {
              expect(true).toStrictEqual(false);
              done();
            },
          });
          isReady$.next([true]);
        });

        it(`should get a Firebase guilds batch`, (done): void => {
          expect.assertions(2);

          service.sendNewReleaseNotesToEachGuild$().subscribe({
            error: (): void => {
              expect(firebaseGuildsServiceGetBatchSpy).toHaveBeenCalledTimes(1);
              expect(firebaseGuildsServiceGetBatchSpy).toHaveBeenCalledWith();
              done();
            },
            next: (): void => {
              expect(true).toStrictEqual(false);
              done();
            },
          });
          isReady$.next([true]);
        });

        describe(`when the Firebase guilds batch was not found`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceGetBatchSpy.mockReturnValue(undefined);
          });

          it(`should log about the Firebase guilds batch not being available`, (done): void => {
            expect.assertions(2);

            service.sendNewReleaseNotesToEachGuild$().subscribe({
              error: (): void => {
                expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
                expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
                  context: `FirebaseGuildsNewVersionService`,
                  message: `text-Firebase guilds batch not available`,
                } as ILoggerLog);
                done();
              },
              next: (): void => {
                expect(true).toStrictEqual(false);
                done();
              },
            });
            isReady$.next([true]);
          });

          it(`should throw an error`, (done): void => {
            expect.assertions(1);

            service.sendNewReleaseNotesToEachGuild$().subscribe({
              error: (error): void => {
                expect(error).toStrictEqual(
                  new Error(`Firebase guilds batch not available`)
                );
                done();
              },
              next: (): void => {
                expect(true).toStrictEqual(false);
                done();
              },
            });
            isReady$.next([true]);
          });

          it(`should not update the Firebase guild batch`, (done): void => {
            expect.assertions(1);

            service.sendNewReleaseNotesToEachGuild$().subscribe({
              error: (): void => {
                expect(updateMock).not.toHaveBeenCalled();
                done();
              },
              next: (): void => {
                expect(true).toStrictEqual(false);
                done();
              },
            });
            isReady$.next([true]);
          });

          it(`should not commit the batch`, (done): void => {
            expect.assertions(1);

            service.sendNewReleaseNotesToEachGuild$().subscribe({
              error: (): void => {
                expect(commitMock).not.toHaveBeenCalled();
                done();
              },
              next: (): void => {
                expect(true).toStrictEqual(false);
                done();
              },
            });
            isReady$.next([true]);
          });

          it(`should not send the release notes message for the guilds`, (done): void => {
            expect.assertions(1);

            service.sendNewReleaseNotesToEachGuild$().subscribe({
              error: (): void => {
                expect(
                  sendNewReleaseNotesFromFirebaseGuildSpy
                ).not.toHaveBeenCalled();
                done();
              },
              next: (): void => {
                expect(true).toStrictEqual(false);
                done();
              },
            });
            isReady$.next([true]);
          });
        });

        describe(`when the Firebase guilds batch was found`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceGetBatchSpy.mockReturnValue(writeBatch);
          });

          describe(`when there is no Firebase guild`, (): void => {
            beforeEach((): void => {
              forEachMock = jest.fn().mockImplementation();
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(
                querySnapshot
              );
            });

            it(`should log that all Firebase guilds release notes were already sent`, (done): void => {
              expect.assertions(2);

              service.sendNewReleaseNotesToEachGuild$().subscribe({
                error: (): void => {
                  expect(true).toStrictEqual(false);
                  done();
                },
                next: (): void => {
                  expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                  expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                    context: `FirebaseGuildsNewVersionService`,
                    message: `text-all Firebase guild hint-(0) release notes already sent`,
                  } as ILoggerLog);
                  done();
                },
              });
              isReady$.next([true]);
            });

            it(`should not update the Firebase guild batch`, (done): void => {
              expect.assertions(1);

              service.sendNewReleaseNotesToEachGuild$().subscribe({
                error: (): void => {
                  expect(true).toStrictEqual(false);
                  done();
                },
                next: (): void => {
                  expect(updateMock).not.toHaveBeenCalled();
                  done();
                },
              });
              isReady$.next([true]);
            });

            it(`should not commit the batch`, (done): void => {
              expect.assertions(1);

              service.sendNewReleaseNotesToEachGuild$().subscribe({
                error: (): void => {
                  expect(true).toStrictEqual(false);
                  done();
                },
                next: (): void => {
                  expect(commitMock).not.toHaveBeenCalled();
                  done();
                },
              });
              isReady$.next([true]);
            });

            it(`should not send the release notes message for the guilds`, (done): void => {
              expect.assertions(1);

              service.sendNewReleaseNotesToEachGuild$().subscribe({
                error: (): void => {
                  expect(true).toStrictEqual(false);
                  done();
                },
                next: (): void => {
                  expect(
                    sendNewReleaseNotesFromFirebaseGuildSpy
                  ).not.toHaveBeenCalled();
                  done();
                },
              });
              isReady$.next([true]);
            });
          });

          describe(`when there is one Firebase guild but it does not exists`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<
                QueryDocumentSnapshot<IFirebaseGuildVFinal>
              >({
                data: (): IFirebaseGuildVFinal => {
                  return firebaseGuild;
                },
                exists: false,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (
                    callback: (
                      result: QueryDocumentSnapshot<IFirebaseGuildVFinal>
                    ) => void
                  ): void => {
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(
                querySnapshot
              );
            });

            it(`should log that all Firebase guilds release notes were already sent`, (done): void => {
              expect.assertions(2);

              service.sendNewReleaseNotesToEachGuild$().subscribe({
                error: (): void => {
                  expect(true).toStrictEqual(false);
                  done();
                },
                next: (): void => {
                  expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                  expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                    context: `FirebaseGuildsNewVersionService`,
                    message: `text-all Firebase guild hint-(0) release notes already sent`,
                  } as ILoggerLog);
                  done();
                },
              });
              isReady$.next([true]);
            });

            it(`should not update the Firebase guild batch`, (done): void => {
              expect.assertions(1);

              service.sendNewReleaseNotesToEachGuild$().subscribe({
                error: (): void => {
                  expect(true).toStrictEqual(false);
                  done();
                },
                next: (): void => {
                  expect(updateMock).not.toHaveBeenCalled();
                  done();
                },
              });
              isReady$.next([true]);
            });

            it(`should not commit the batch`, (done): void => {
              expect.assertions(1);

              service.sendNewReleaseNotesToEachGuild$().subscribe({
                error: (): void => {
                  expect(true).toStrictEqual(false);
                  done();
                },
                next: (): void => {
                  expect(commitMock).not.toHaveBeenCalled();
                  done();
                },
              });
              isReady$.next([true]);
            });

            it(`should not send the release notes message for the guilds`, (done): void => {
              expect.assertions(1);

              service.sendNewReleaseNotesToEachGuild$().subscribe({
                error: (): void => {
                  expect(true).toStrictEqual(false);
                  done();
                },
                next: (): void => {
                  expect(
                    sendNewReleaseNotesFromFirebaseGuildSpy
                  ).not.toHaveBeenCalled();
                  done();
                },
              });
              isReady$.next([true]);
            });
          });

          describe(`when there is one Firebase guild`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<
                QueryDocumentSnapshot<IFirebaseGuildVFinal>
              >({
                data: (): IFirebaseGuildVFinal => {
                  return firebaseGuild;
                },
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (
                    callback: (
                      result: QueryDocumentSnapshot<IFirebaseGuildVFinal>
                    ) => void
                  ): void => {
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(
                querySnapshot
              );
            });

            describe(`when the Firebase guild last release notes version is the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`1.0.0`);
              });

              it(`should log that all Firebase guilds release notes were already sent`, (done): void => {
                expect.assertions(2);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                  next: (): void => {
                    expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                      context: `FirebaseGuildsNewVersionService`,
                      message: `text-all Firebase guild hint-(1) release notes already sent`,
                    } as ILoggerLog);
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should not update the Firebase guild batch`, (done): void => {
                expect.assertions(1);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                  next: (): void => {
                    expect(updateMock).not.toHaveBeenCalled();
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should not commit the batch`, (done): void => {
                expect.assertions(1);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                  next: (): void => {
                    expect(commitMock).not.toHaveBeenCalled();
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should not send the release notes message for the guilds`, (done): void => {
                expect.assertions(1);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                  next: (): void => {
                    expect(
                      sendNewReleaseNotesFromFirebaseGuildSpy
                    ).not.toHaveBeenCalled();
                    done();
                  },
                });
                isReady$.next([true]);
              });
            });

            describe(`when the Firebase guild last release notes version is not the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`2.0.0`);
              });

              it(`should update the Firebase guild last release notes version in the batch`, (done): void => {
                expect.assertions(2);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(updateMock).toHaveBeenCalledTimes(1);
                    expect(updateMock).toHaveBeenCalledWith(
                      queryDocumentSnapshot.ref,
                      {
                        lastReleaseNotesVersion: `2.0.0`,
                      } as IUpdatedFirebaseGuildLastReleaseNotesVersion
                    );
                    done();
                  },
                  next: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should log that one Firebase guild is updating`, (done): void => {
                expect.assertions(2);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                      context: `FirebaseGuildsNewVersionService`,
                      message: `text-updating value-1 Firebase guild...`,
                    } as ILoggerLog);
                    done();
                  },
                  next: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should commit the batch`, (done): void => {
                expect.assertions(2);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(commitMock).toHaveBeenCalledTimes(1);
                    expect(commitMock).toHaveBeenCalledWith();
                    done();
                  },
                  next: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                });
                isReady$.next([true]);
              });

              describe(`when the batch commit failed`, (): void => {
                beforeEach((): void => {
                  commitMock.mockRejectedValue(new Error(`commit error`));
                });

                it(`should not send the release notes message for the guild`, (done): void => {
                  expect.assertions(1);

                  service.sendNewReleaseNotesToEachGuild$().subscribe({
                    error: (): void => {
                      expect(
                        sendNewReleaseNotesFromFirebaseGuildSpy
                      ).not.toHaveBeenCalled();
                      done();
                    },
                    next: (): void => {
                      expect(true).toStrictEqual(false);
                      done();
                    },
                  });
                  isReady$.next([true]);
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<WriteResult[]>());
                });

                it(`should send the release notes message for the guild`, (done): void => {
                  expect.assertions(2);

                  service.sendNewReleaseNotesToEachGuild$().subscribe({
                    error: (): void => {
                      expect(true).toStrictEqual(false);
                      done();
                    },
                    next: (): void => {
                      expect(
                        sendNewReleaseNotesFromFirebaseGuildSpy
                      ).toHaveBeenCalledTimes(1);
                      expect(
                        sendNewReleaseNotesFromFirebaseGuildSpy
                      ).toHaveBeenCalledWith(firebaseGuild);
                      done();
                    },
                  });
                  isReady$.next([true]);
                });
              });
            });
          });

          describe(`when there are two Firebase guilds`, (): void => {
            beforeEach((): void => {
              queryDocumentSnapshot = createMock<
                QueryDocumentSnapshot<IFirebaseGuildVFinal>
              >({
                data: (): IFirebaseGuildVFinal => {
                  return firebaseGuild;
                },
                exists: true,
              });
              forEachMock = jest
                .fn()
                .mockImplementation(
                  (
                    callback: (
                      result: QueryDocumentSnapshot<IFirebaseGuildVFinal>
                    ) => void
                  ): void => {
                    callback(queryDocumentSnapshot);
                    callback(queryDocumentSnapshot);
                  }
                );
              querySnapshot = createMock<QuerySnapshot<IFirebaseGuildVFinal>>({
                forEach: forEachMock,
              });

              firebaseGuildsServiceGetGuildsSpy.mockResolvedValue(
                querySnapshot
              );
            });

            describe(`when the Firebase guild last release notes version is the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`1.0.0`);
              });

              it(`should log that all Firebase guilds release notes were already sent`, (done): void => {
                expect.assertions(2);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                  next: (): void => {
                    expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                      context: `FirebaseGuildsNewVersionService`,
                      message: `text-all Firebase guilds hint-(2) release notes already sent`,
                    } as ILoggerLog);
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should not update the Firebase guild batch`, (done): void => {
                expect.assertions(1);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                  next: (): void => {
                    expect(updateMock).not.toHaveBeenCalled();
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should not commit the batch`, (done): void => {
                expect.assertions(1);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                  next: (): void => {
                    expect(commitMock).not.toHaveBeenCalled();
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should not send the release notes message for the guilds`, (done): void => {
                expect.assertions(1);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                  next: (): void => {
                    expect(
                      sendNewReleaseNotesFromFirebaseGuildSpy
                    ).not.toHaveBeenCalled();
                    done();
                  },
                });
                isReady$.next([true]);
              });
            });

            describe(`when the Firebase guild last release notes version is not the same as the current version`, (): void => {
              beforeEach((): void => {
                appConfigServiceGetVersionSpy.mockReturnValue(`2.0.0`);
              });

              it(`should update the Firebase guilds last release notes version in the batch`, (done): void => {
                expect.assertions(2);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(updateMock).toHaveBeenCalledTimes(2);
                    expect(updateMock).toHaveBeenCalledWith(
                      queryDocumentSnapshot.ref,
                      {
                        lastReleaseNotesVersion: `2.0.0`,
                      } as IUpdatedFirebaseGuildLastReleaseNotesVersion
                    );
                    done();
                  },
                  next: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should log that two Firebase guilds are updating`, (done): void => {
                expect.assertions(2);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
                    expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                      context: `FirebaseGuildsNewVersionService`,
                      message: `text-updating value-2 Firebase guilds...`,
                    } as ILoggerLog);
                    done();
                  },
                  next: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                });
                isReady$.next([true]);
              });

              it(`should commit the batch`, (done): void => {
                expect.assertions(2);

                service.sendNewReleaseNotesToEachGuild$().subscribe({
                  error: (): void => {
                    expect(commitMock).toHaveBeenCalledTimes(1);
                    expect(commitMock).toHaveBeenCalledWith();
                    done();
                  },
                  next: (): void => {
                    expect(true).toStrictEqual(false);
                    done();
                  },
                });
                isReady$.next([true]);
              });

              describe(`when the batch commit failed`, (): void => {
                beforeEach((): void => {
                  commitMock.mockRejectedValue(new Error(`commit error`));
                });

                it(`should not send the release notes message for the guilds`, (done): void => {
                  expect.assertions(1);

                  service.sendNewReleaseNotesToEachGuild$().subscribe({
                    error: (): void => {
                      expect(
                        sendNewReleaseNotesFromFirebaseGuildSpy
                      ).not.toHaveBeenCalled();
                      done();
                    },
                    next: (): void => {
                      expect(true).toStrictEqual(false);
                      done();
                    },
                  });
                  isReady$.next([true]);
                });
              });

              describe(`when the batch commit was successful`, (): void => {
                beforeEach((): void => {
                  commitMock.mockResolvedValue(createMock<WriteResult[]>());
                });

                it(`should send the release notes message for the guilds`, (done): void => {
                  expect.assertions(2);

                  service.sendNewReleaseNotesToEachGuild$().subscribe({
                    error: (): void => {
                      expect(true).toStrictEqual(false);
                      done();
                    },
                    next: (): void => {
                      expect(
                        sendNewReleaseNotesFromFirebaseGuildSpy
                      ).toHaveBeenCalledTimes(2);
                      expect(
                        sendNewReleaseNotesFromFirebaseGuildSpy
                      ).toHaveBeenCalledWith(firebaseGuild);
                      done();
                    },
                  });
                  isReady$.next([true]);
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`sendNewReleaseNotesFromFirebaseGuild()`, (): void => {
    let firebaseGuild: IFirebaseGuildVFinal;
    let guild: Guild;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let discordGuildServiceGetGuildByIdSpy: jest.SpyInstance;
    let discordChannelGuildServiceGetPrimarySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new FirebaseGuildsNewVersionService();
      firebaseGuild = createMock<IFirebaseGuildVFinal>();
      guild = createMock<Guild>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      loggerServiceErrorSpy = jest
        .spyOn(loggerService, `error`)
        .mockImplementation();
      discordGuildServiceGetGuildByIdSpy = jest
        .spyOn(discordGuildService, `getGuildById`)
        .mockImplementation();
      discordChannelGuildServiceGetPrimarySpy = jest
        .spyOn(discordChannelGuildService, `getPrimary`)
        .mockImplementation();
    });

    describe(`when the given Firebase guild id is undefined`, (): void => {
      beforeEach((): void => {
        firebaseGuild.id = undefined;
      });

      it(`should log an error about the wrong id`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(
          service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
        ).rejects.toThrow(new Error(`Firebase guild id nil`));

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-Firebase guild id nil`,
        } as ILoggerLog);
      });

      it(`should not get the Discord guild`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(
          service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
        ).rejects.toThrow(new Error(`Firebase guild id nil`));

        expect(discordGuildServiceGetGuildByIdSpy).not.toHaveBeenCalled();
      });

      it(`should not log an error about the Discord guild not existing`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(
          service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
        ).rejects.toThrow(new Error(`Firebase guild id nil`));

        expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-Discord guild value-dummy-id does not exists`,
        } as ILoggerLog);
      });

      it(`should not get the Discord guild primary channel`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(
          service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
        ).rejects.toThrow(new Error(`Firebase guild id nil`));

        expect(discordChannelGuildServiceGetPrimarySpy).not.toHaveBeenCalled();
      });

      it(`should not log about not having a Discord guild primary found`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(
          service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
        ).rejects.toThrow(new Error(`Firebase guild id nil`));

        expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-guild value-dummy-id does not have a primary channel`,
        } as ILoggerLog);
      });
    });

    describe(`when the given Firebase guild id is valid`, (): void => {
      beforeEach((): void => {
        firebaseGuild.id = `dummy-id`;
      });

      it(`should not log an error about the wrong id`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(
          service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
        ).rejects.toThrow(new Error(`Discord guild not found`));

        expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
          context: `FirebaseGuildsNewVersionService`,
          message: `text-Firebase guild id nil`,
        } as ILoggerLog);
      });

      it(`should get the Discord guild by using the given Firebase guild id`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(
          service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
        ).rejects.toThrow(new Error(`Discord guild not found`));

        expect(discordGuildServiceGetGuildByIdSpy).toHaveBeenCalledTimes(1);
        expect(discordGuildServiceGetGuildByIdSpy).toHaveBeenCalledWith(
          `dummy-id`
        );
      });

      describe(`when the Discord guild was not found`, (): void => {
        beforeEach((): void => {
          discordGuildServiceGetGuildByIdSpy.mockReturnValue(undefined);
        });

        it(`should log an error about the Discord guild not existing`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(
            service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
          ).rejects.toThrow(new Error(`Discord guild not found`));

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
          expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
            context: `FirebaseGuildsNewVersionService`,
            message: `text-Discord guild value-dummy-id does not exists`,
          } as ILoggerLog);
        });

        it(`should not get the Discord guild primary channel`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(
            service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
          ).rejects.toThrow(new Error(`Discord guild not found`));

          expect(
            discordChannelGuildServiceGetPrimarySpy
          ).not.toHaveBeenCalled();
        });

        it(`should not log about not having a Discord guild primary found`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(
            service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
          ).rejects.toThrow(new Error(`Discord guild not found`));

          expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-guild value-dummy-id does not have a primary channel`,
          } as ILoggerLog);
        });
      });

      describe(`when the Discord guild was found`, (): void => {
        beforeEach((): void => {
          discordGuildServiceGetGuildByIdSpy.mockReturnValue(guild);
        });

        it(`should not log an error about the Discord guild not existing`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(
            service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
          ).rejects.toThrow(new Error(`Primary channel not found`));

          expect(loggerServiceErrorSpy).not.toHaveBeenCalledWith({
            context: `FirebaseGuildsNewVersionService`,
            message: `text-Discord guild value-dummy-id does not exists`,
          } as ILoggerLog);
        });

        it(`should get the Discord guild primary channel`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(
            service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
          ).rejects.toThrow(new Error(`Primary channel not found`));

          expect(discordChannelGuildServiceGetPrimarySpy).toHaveBeenCalledTimes(
            1
          );
          expect(discordChannelGuildServiceGetPrimarySpy).toHaveBeenCalledWith(
            guild
          );
        });

        describe(`when the Discord guild primary channel was not found`, (): void => {
          beforeEach((): void => {
            discordChannelGuildServiceGetPrimarySpy.mockReturnValue(null);
          });

          it(`should log about not having a Discord guild primary found`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.sendNewReleaseNotesFromFirebaseGuild(firebaseGuild)
            ).rejects.toThrow(new Error(`Primary channel not found`));

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `FirebaseGuildsNewVersionService`,
              message: `text-guild value-dummy-id does not have a primary channel`,
            } as ILoggerLog);
          });
        });
      });
    });
  });
});
