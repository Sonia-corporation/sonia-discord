import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../core/services/core-event.service";
import { ILoggerLog } from "../../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../../logger/services/logger.service";
import { DiscordMessageCommandEnum } from "../../../enums/commands/discord-message-command.enum";
import { IDiscordMessageResponse } from "../../../interfaces/discord-message-response";
import { IAnyDiscordMessage } from "../../../types/any-discord-message";
import { DiscordMessageConfigService } from "../../config/discord-message-config.service";
import { DiscordMessageCommandFeatureService } from "./discord-message-command-feature.service";
import { DiscordMessageCommandFeatureNoonService } from "./features/noon/services/discord-message-command-feature-noon.service";
import { DiscordMessageCommandFeatureEmptyContentErrorService } from "./services/discord-message-command-feature-empty-content-error.service";
import { DiscordMessageCommandFeatureEmptyFeatureNameErrorService } from "./services/discord-message-command-feature-empty-feature-name-error.service";
import { DiscordMessageCommandFeatureEmptyFlagsErrorService } from "./services/discord-message-command-feature-empty-flags-error.service";
import { DiscordMessageCommandFeatureWrongFeatureNameErrorService } from "./services/discord-message-command-feature-wrong-feature-name-error.service";

jest.mock(`../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureService`, (): void => {
  let service: DiscordMessageCommandFeatureService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let discordMessageCommandFeatureNoonService: DiscordMessageCommandFeatureNoonService;
  let discordMessageCommandFeatureEmptyContentErrorService: DiscordMessageCommandFeatureEmptyContentErrorService;
  let discordMessageCommandFeatureEmptyFeatureNameErrorService: DiscordMessageCommandFeatureEmptyFeatureNameErrorService;
  let discordMessageCommandFeatureWrongFeatureNameErrorService: DiscordMessageCommandFeatureWrongFeatureNameErrorService;
  let discordMessageCommandFeatureEmptyFlagsErrorService: DiscordMessageCommandFeatureEmptyFlagsErrorService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    discordMessageCommandFeatureNoonService = DiscordMessageCommandFeatureNoonService.getInstance();
    discordMessageCommandFeatureEmptyContentErrorService = DiscordMessageCommandFeatureEmptyContentErrorService.getInstance();
    discordMessageCommandFeatureEmptyFeatureNameErrorService = DiscordMessageCommandFeatureEmptyFeatureNameErrorService.getInstance();
    discordMessageCommandFeatureWrongFeatureNameErrorService = DiscordMessageCommandFeatureWrongFeatureNameErrorService.getInstance();
    discordMessageCommandFeatureEmptyFlagsErrorService = DiscordMessageCommandFeatureEmptyFlagsErrorService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeature service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandFeatureService)
      );
    });

    it(`should return the created DiscordMessageCommandFeature service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeature service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_SERVICE
      );
    });
  });

  describe(`handleResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureService();
      // @todo remove casting once https://github.com/Typescript-TDD/ts-auto-mock/issues/464 is fixed
      anyDiscordMessage = createMock<IAnyDiscordMessage>(({
        id: `dummy-id`,
      } as unknown) as IAnyDiscordMessage);

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`);
      getMessageResponseSpy = jest
        .spyOn(service, `getMessageResponse`)
        .mockResolvedValue(discordMessageResponse);
    });

    it(`should log about the command`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureService`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-feature command detected`,
      } as ILoggerLog);
    });

    it(`should get a message response`, async (): Promise<void> => {
      expect.assertions(2);

      await service.handleResponse(anyDiscordMessage);

      expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(getMessageResponseSpy).toHaveBeenCalledWith(anyDiscordMessage);
    });

    it(`should return the message response`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.handleResponse(anyDiscordMessage);

      expect(result).toStrictEqual(discordMessageResponse);
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;
    let getEmptyContentErrorMessageResponse: IDiscordMessageResponse;
    let getEmptyFeatureNameErrorMessageResponse: IDiscordMessageResponse;
    let getWrongFeatureNameErrorMessageResponse: IDiscordMessageResponse;
    let getEmptyFlagsErrorMessageResponse: IDiscordMessageResponse;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonServiceIsNoonFeatureSpy: jest.SpyInstance;
    let discordMessageCommandFeatureNoonServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
      discordMessageResponse = createMock<IDiscordMessageResponse>({
        response: `discordMessageResponse`,
      });
      getEmptyContentErrorMessageResponse = createMock<IDiscordMessageResponse>(
        {
          response: `getEmptyContentErrorMessageResponse`,
        }
      );
      getEmptyFeatureNameErrorMessageResponse = createMock<
        IDiscordMessageResponse
      >({
        response: `getEmptyFeatureNameErrorMessageResponse`,
      });
      getWrongFeatureNameErrorMessageResponse = createMock<
        IDiscordMessageResponse
      >({
        response: `getWrongFeatureNameErrorMessageResponse`,
      });
      getEmptyFlagsErrorMessageResponse = createMock<IDiscordMessageResponse>({
        response: `getEmptyFlagsErrorMessageResponse`,
      });

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      discordMessageCommandFeatureNoonServiceIsNoonFeatureSpy = jest
        .spyOn(discordMessageCommandFeatureNoonService, `isNoonFeature`)
        .mockImplementation();
      discordMessageCommandFeatureNoonServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandFeatureNoonService, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
      discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy = jest
        .spyOn(
          discordMessageCommandFeatureEmptyContentErrorService,
          `getMessageResponse`
        )
        .mockRejectedValue(new Error(`getMessageResponse error`));
      discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy = jest
        .spyOn(
          discordMessageCommandFeatureEmptyFeatureNameErrorService,
          `getMessageResponse`
        )
        .mockRejectedValue(new Error(`getMessageResponse error`));
      discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy = jest
        .spyOn(
          discordMessageCommandFeatureWrongFeatureNameErrorService,
          `getMessageResponse`
        )
        .mockRejectedValue(new Error(`getMessageResponse error`));
      discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy = jest
        .spyOn(
          discordMessageCommandFeatureEmptyFlagsErrorService,
          `getMessageResponse`
        )
        .mockRejectedValue(new Error(`getMessageResponse error`));
    });

    describe(`when the given message content is null`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage.content = null;
      });

      it(`should get the empty content error message response`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(
          service.getMessageResponse(anyDiscordMessage)
        ).rejects.toThrow(new Error(`getMessageResponse error`));

        expect(
          discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy
        ).toHaveBeenCalledTimes(1);
        expect(
          discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy
        ).toHaveBeenCalledWith();
      });

      describe(`when the fetched of the empty content error message response failed`, (): void => {
        beforeEach((): void => {
          discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy.mockRejectedValue(
            new Error(`getMessageResponse error`)
          );
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(
            service.getMessageResponse(anyDiscordMessage)
          ).rejects.toThrow(new Error(`getMessageResponse error`));
        });
      });

      describe(`when the fetched of the empty content error message response succeeded`, (): void => {
        beforeEach((): void => {
          discordMessageCommandFeatureEmptyContentErrorServiceGetMessageResponseSpy.mockResolvedValue(
            getEmptyContentErrorMessageResponse
          );
        });

        it(`should return the empty content error message response`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          const result = await service.getMessageResponse(anyDiscordMessage);

          expect(result).toStrictEqual(getEmptyContentErrorMessageResponse);
        });
      });

      it(`should not log about not having a feature name`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(
          service.getMessageResponse(anyDiscordMessage)
        ).rejects.toThrow(new Error(`getMessageResponse error`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(0);
        expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
          context: `DiscordMessageCommandFeatureService`,
          message: `text-feature name not specified`,
        } as ILoggerLog);
      });

      it(`should not log about the fact that the feature does not exist`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(
          service.getMessageResponse(anyDiscordMessage)
        ).rejects.toThrow(new Error(`getMessageResponse error`));

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(0);
        expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
          context: `DiscordMessageCommandFeatureService`,
          message: `text-feature name value-dummy not matching an existing feature`,
        } as ILoggerLog);
      });

      it(`should not get a message response for the noon feature`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(
          service.getMessageResponse(anyDiscordMessage)
        ).rejects.toThrow(new Error(`getMessageResponse error`));

        expect(
          discordMessageCommandFeatureNoonServiceGetMessageResponseSpy
        ).not.toHaveBeenCalled();
      });
    });

    describe(`when the given message content is valid`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage.content = `message`;
      });

      describe(`when the given message has no feature name`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `message !feature`;
        });

        it(`should get the empty feature name error message response`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(
            service.getMessageResponse(anyDiscordMessage)
          ).rejects.toThrow(new Error(`getMessageResponse error`));

          expect(
            discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy
          ).toHaveBeenCalledTimes(1);
          expect(
            discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy
          ).toHaveBeenCalledWith(anyDiscordMessage, [
            DiscordMessageCommandEnum.FEATURE,
            DiscordMessageCommandEnum.F,
          ]);
        });

        describe(`when the fetched of the empty feature name error message response failed`, (): void => {
          beforeEach((): void => {
            discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy.mockRejectedValue(
              new Error(`getMessageResponse error`)
            );
          });

          it(`should throw an error`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(
              service.getMessageResponse(anyDiscordMessage)
            ).rejects.toThrow(new Error(`getMessageResponse error`));
          });
        });

        describe(`when the fetched of the empty feature name error message response succeeded`, (): void => {
          beforeEach((): void => {
            discordMessageCommandFeatureEmptyFeatureNameErrorServiceGetMessageResponseSpy.mockResolvedValue(
              getEmptyFeatureNameErrorMessageResponse
            );
          });

          it(`should return the empty feature name error message response`, async (): Promise<
            void
          > => {
            expect.assertions(1);

            const result = await service.getMessageResponse(anyDiscordMessage);

            expect(result).toStrictEqual(
              getEmptyFeatureNameErrorMessageResponse
            );
          });
        });

        it(`should log about not having a feature name`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(
            service.getMessageResponse(anyDiscordMessage)
          ).rejects.toThrow(new Error(`getMessageResponse error`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
            context: `DiscordMessageCommandFeatureService`,
            message: `text-feature name not specified`,
          } as ILoggerLog);
        });

        it(`should not log about the fact that the feature does not exist`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(
            service.getMessageResponse(anyDiscordMessage)
          ).rejects.toThrow(new Error(`getMessageResponse error`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
            context: `DiscordMessageCommandFeatureService`,
            message: `text-feature name value-dummy not matching an existing feature`,
          } as ILoggerLog);
        });

        it(`should not get a message response for the noon feature`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(
            service.getMessageResponse(anyDiscordMessage)
          ).rejects.toThrow(new Error(`getMessageResponse error`));

          expect(
            discordMessageCommandFeatureNoonServiceGetMessageResponseSpy
          ).not.toHaveBeenCalled();
        });
      });

      describe(`when the given message has a feature name`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage.content = `message !feature dummy`;
        });

        describe(`when the given message feature is not an existing feature`, (): void => {
          beforeEach((): void => {
            discordMessageCommandFeatureNoonServiceIsNoonFeatureSpy.mockReturnValue(
              false
            );
          });

          it(`should get the wrong feature name error message response`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.getMessageResponse(anyDiscordMessage)
            ).rejects.toThrow(new Error(`getMessageResponse error`));

            expect(
              discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy
            ).toHaveBeenCalledTimes(1);
            expect(
              discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy
            ).toHaveBeenCalledWith(
              anyDiscordMessage,
              [DiscordMessageCommandEnum.FEATURE, DiscordMessageCommandEnum.F],
              `dummy`
            );
          });

          describe(`when the fetched of the wrong feature name error message response failed`, (): void => {
            beforeEach((): void => {
              discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy.mockRejectedValue(
                new Error(`getMessageResponse error`)
              );
            });

            it(`should throw an error`, async (): Promise<void> => {
              expect.assertions(1);

              await expect(
                service.getMessageResponse(anyDiscordMessage)
              ).rejects.toThrow(new Error(`getMessageResponse error`));
            });
          });

          describe(`when the fetched of the wrong feature name error message response succeeded`, (): void => {
            beforeEach((): void => {
              discordMessageCommandFeatureWrongFeatureNameErrorServiceGetMessageResponseSpy.mockResolvedValue(
                getWrongFeatureNameErrorMessageResponse
              );
            });

            it(`should return the wrong feature name error message response`, async (): Promise<
              void
            > => {
              expect.assertions(1);

              const result = await service.getMessageResponse(
                anyDiscordMessage
              );

              expect(result).toStrictEqual(
                getWrongFeatureNameErrorMessageResponse
              );
            });
          });

          it(`should log about the fact that the feature does not exist`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.getMessageResponse(anyDiscordMessage)
            ).rejects.toThrow(new Error(`getMessageResponse error`));

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `DiscordMessageCommandFeatureService`,
              message: `text-feature name value-dummy not matching an existing feature`,
            } as ILoggerLog);
          });

          it(`should not log about not having a feature name`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.getMessageResponse(anyDiscordMessage)
            ).rejects.toThrow(new Error(`getMessageResponse error`));

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
              context: `DiscordMessageCommandFeatureService`,
              message: `text-feature name not specified`,
            } as ILoggerLog);
          });

          it(`should not get a message response for the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(2);

            await expect(
              service.getMessageResponse(anyDiscordMessage)
            ).rejects.toThrow(new Error(`getMessageResponse error`));

            expect(
              discordMessageCommandFeatureNoonServiceGetMessageResponseSpy
            ).not.toHaveBeenCalled();
          });
        });

        describe(`when the given message feature is the noon feature`, (): void => {
          beforeEach((): void => {
            discordMessageCommandFeatureNoonServiceIsNoonFeatureSpy.mockReturnValue(
              true
            );
          });

          describe(`when the given message feature does not contain a flag`, (): void => {
            beforeEach((): void => {
              anyDiscordMessage.content = `message !feature Noon`;
            });

            it(`should get the empty flags error message response`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(
                service.getMessageResponse(anyDiscordMessage)
              ).rejects.toThrow(new Error(`getMessageResponse error`));

              expect(
                discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy
              ).toHaveBeenCalledTimes(1);
              expect(
                discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy
              ).toHaveBeenCalledWith(
                anyDiscordMessage,
                [
                  DiscordMessageCommandEnum.FEATURE,
                  DiscordMessageCommandEnum.F,
                ],
                `noon`
              );
            });

            describe(`when the fetched of the empty flags error message response failed`, (): void => {
              beforeEach((): void => {
                discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy.mockRejectedValue(
                  new Error(`getMessageResponse error`)
                );
              });

              it(`should throw an error`, async (): Promise<void> => {
                expect.assertions(1);

                await expect(
                  service.getMessageResponse(anyDiscordMessage)
                ).rejects.toThrow(new Error(`getMessageResponse error`));
              });
            });

            describe(`when the fetched of the empty flags error message response succeeded`, (): void => {
              beforeEach((): void => {
                discordMessageCommandFeatureEmptyFlagsErrorServiceGetMessageResponseSpy.mockResolvedValue(
                  getEmptyFlagsErrorMessageResponse
                );
              });

              it(`should return the empty flags error message response`, async (): Promise<
                void
              > => {
                expect.assertions(1);

                const result = await service.getMessageResponse(
                  anyDiscordMessage
                );

                expect(result).toStrictEqual(getEmptyFlagsErrorMessageResponse);
              });
            });

            it(`should log about the fact that no flags was specified`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(
                service.getMessageResponse(anyDiscordMessage)
              ).rejects.toThrow(new Error(`getMessageResponse error`));

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
                context: `DiscordMessageCommandFeatureService`,
                message: `text-feature name value-Noon not having any flags`,
              } as ILoggerLog);
            });
          });

          describe(`when the given message feature contains a flag`, (): void => {
            beforeEach((): void => {
              anyDiscordMessage.content = `message !feature Noon --yo`;
            });

            it(`should get a message response for the noon feature`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(
                service.getMessageResponse(anyDiscordMessage)
              ).rejects.toThrow(new Error(`getMessageResponse error`));

              expect(
                discordMessageCommandFeatureNoonServiceGetMessageResponseSpy
              ).toHaveBeenCalledTimes(1);
              expect(
                discordMessageCommandFeatureNoonServiceGetMessageResponseSpy
              ).toHaveBeenCalledWith(anyDiscordMessage);
            });

            describe(`when the message response for the noon feature was successfully fetched`, (): void => {
              beforeEach((): void => {
                discordMessageCommandFeatureNoonServiceGetMessageResponseSpy.mockResolvedValue(
                  discordMessageResponse
                );
              });

              it(`should return a Discord message response for the noon feature`, async (): Promise<
                void
              > => {
                expect.assertions(1);

                const result = await service.getMessageResponse(
                  anyDiscordMessage
                );

                expect(result).toStrictEqual(discordMessageResponse);
              });
            });

            describe(`when the message response for the noon feature failed to be fetched`, (): void => {
              beforeEach((): void => {
                discordMessageCommandFeatureNoonServiceGetMessageResponseSpy.mockRejectedValue(
                  new Error(`getMessageResponse error`)
                );
              });

              it(`should return the message response error for the noon feature`, async (): Promise<
                void
              > => {
                expect.assertions(1);

                await expect(
                  service.getMessageResponse(anyDiscordMessage)
                ).rejects.toThrow(new Error(`getMessageResponse error`));
              });
            });

            it(`should not log about not having a feature name`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(
                service.getMessageResponse(anyDiscordMessage)
              ).rejects.toThrow(new Error(`getMessageResponse error`));

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(0);
              expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
                context: `DiscordMessageCommandFeatureService`,
                message: `text-feature name not specified`,
              } as ILoggerLog);
            });

            it(`should not log about the fact that the feature does not exist`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(
                service.getMessageResponse(anyDiscordMessage)
              ).rejects.toThrow(new Error(`getMessageResponse error`));

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(0);
              expect(loggerServiceDebugSpy).not.toHaveBeenCalledWith({
                context: `DiscordMessageCommandFeatureService`,
                message: `text-feature name value-dummy not matching an existing feature`,
              } as ILoggerLog);
            });
          });
        });
      });
    });
  });

  describe(`hasCommand()`, (): void => {
    let message: string;

    let discordMessageConfigServiceGetMessageCommandPrefixSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureService();
      message = `dummy-message`;

      discordMessageConfigServiceGetMessageCommandPrefixSpy = jest
        .spyOn(discordMessageConfigService, `getMessageCommandPrefix`)
        .mockImplementation();
    });

    describe(`when the message command prefix is "@"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue(
          `@`
        );
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@feature`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-feature`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!feature`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@feature dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-feature dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!feature dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@f`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-f`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!f`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@f dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-f dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!f dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@FEATURE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-FEATURE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!FEATURE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@FEATURE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-FEATURE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!FEATURE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting uppercase with @`, (): void => {
        beforeEach((): void => {
          message = `@F`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-F`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!F`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@F dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-F dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!F dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });
    });

    describe(`when the message command prefix is "-" or "!"`, (): void => {
      beforeEach((): void => {
        discordMessageConfigServiceGetMessageCommandPrefixSpy.mockReturnValue([
          `-`,
          `!`,
        ]);
      });

      describe(`when the given message is an empty string`, (): void => {
        beforeEach((): void => {
          message = ``;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message without a command`, (): void => {
        beforeEach((): void => {
          message = `hello world`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with another command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!version`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!feat`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with an almost feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!feat dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@feature`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-feature`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!feature`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@feature dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-feature dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!feature dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@FEATURE`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-FEATURE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!FEATURE`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@FEATURE dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-FEATURE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the feature command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!FEATURE dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with @`, (): void => {
        beforeEach((): void => {
          message = `@f`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with -`, (): void => {
        beforeEach((): void => {
          message = `-f`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with !`, (): void => {
        beforeEach((): void => {
          message = `!f`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@f dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-f dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!f dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with @`, (): void => {
        beforeEach((): void => {
          message = `@F`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with -`, (): void => {
        beforeEach((): void => {
          message = `-F`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with !`, (): void => {
        beforeEach((): void => {
          message = `!F`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with @ and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `@F dummy`;
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(false);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with - and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `-F dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });

      describe(`when the given message is a message with the shortcut feature command uppercase starting with ! and have more text after that`, (): void => {
        beforeEach((): void => {
          message = `!F dummy`;
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const hasCommandResult = service.hasCommand(message);

          expect(hasCommandResult).toStrictEqual(true);
        });
      });
    });
  });
});
