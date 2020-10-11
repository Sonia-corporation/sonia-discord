import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../../core/services/core-event.service";
import { IAnyDiscordChannel } from "../../../../../../discord/channels/types/any-discord-channel";
import { FirebaseGuildChannelFeatureNoonVersionEnum } from "../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-noon-version.enum";
import { FirebaseGuildChannelFeatureVersionEnum } from "../../../../../enums/guilds/channels/features/firebase-guild-channel-feature-version.enum";
import { FirebaseGuildChannelVersionEnum } from "../../../../../enums/guilds/channels/firebase-guild-channel-version.enum";
import { IFirebaseGuildVFinal } from "../../../../../types/guilds/firebase-guild-v-final";
import { FirebaseGuildsChannelsFeaturesNoonEnabledService } from "./firebase-guilds-channels-features-noon-enabled.service";

jest.mock(`../../../../../../logger/services/chalk/chalk.service`);

describe(`FirebaseGuildsChannelsFeaturesNoonEnabledService`, (): void => {
  let service: FirebaseGuildsChannelsFeaturesNoonEnabledService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a FirebaseGuildsChannelsFeaturesNoonEnabled service`, (): void => {
      expect.assertions(1);

      service = FirebaseGuildsChannelsFeaturesNoonEnabledService.getInstance();

      expect(service).toStrictEqual(
        expect.any(FirebaseGuildsChannelsFeaturesNoonEnabledService)
      );
    });

    it(`should return the created FirebaseGuildsChannelsFeaturesNoonEnabled service`, (): void => {
      expect.assertions(1);

      const result = FirebaseGuildsChannelsFeaturesNoonEnabledService.getInstance();

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

    it(`should notify the FirebaseGuildsChannelsFeaturesNoonEnabled service creation`, (): void => {
      expect.assertions(2);

      service = new FirebaseGuildsChannelsFeaturesNoonEnabledService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.FIREBASE_GUILDS_CHANNELS_FEATURES_NOON_ENABLED_SERVICE
      );
    });
  });

  describe(`getUpdatedGuild()`, (): void => {
    let id: IAnyDiscordChannel["id"];
    let isEnabled: boolean;
    let firebaseGuild: IFirebaseGuildVFinal;

    beforeEach((): void => {
      service = new FirebaseGuildsChannelsFeaturesNoonEnabledService();
      id = `dummy-id`;
      isEnabled = false;
    });

    describe(`when the given Firebase guild is fully up-to-date`, (): void => {
      beforeEach((): void => {
        firebaseGuild = createMock<IFirebaseGuildVFinal>({
          channels: {
            "dummy-id": {
              features: {
                noon: {
                  version: 1,
                },
                version: 1,
              },
              id: `dummy-id`,
              version: 1,
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
            "channels.dummy-id.features.noon.isEnabled": false,
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
            "channels.dummy-id.features.noon.isEnabled": true,
          });
        });
      });
    });

    describe(`when the given Firebase guild is not fully up-to-date`, (): void => {
      beforeEach((): void => {
        firebaseGuild = createMock<IFirebaseGuildVFinal>();
      });

      describe(`when the given Firebase guild does not have the channel with the given id`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createMock<IFirebaseGuildVFinal>({
            channels: {
              "other-id": {
                id: `other-id`,
                version: FirebaseGuildChannelVersionEnum.V1,
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

            const result = service.getUpdatedGuild(
              id,
              isEnabled,
              firebaseGuild
            );

            expect(result).toStrictEqual({
              "channels.dummy-id.features.noon.isEnabled": false,
              "channels.dummy-id.features.noon.version": 1,
              "channels.dummy-id.features.version": 1,
              "channels.dummy-id.id": `dummy-id`,
              "channels.dummy-id.version": 1,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(
              id,
              isEnabled,
              firebaseGuild
            );

            expect(result).toStrictEqual({
              "channels.dummy-id.features.noon.isEnabled": true,
              "channels.dummy-id.features.noon.version": 1,
              "channels.dummy-id.features.version": 1,
              "channels.dummy-id.id": `dummy-id`,
              "channels.dummy-id.version": 1,
            });
          });
        });
      });

      describe(`when the given Firebase guild does have a channel with the given id but without any features`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createMock<IFirebaseGuildVFinal>({
            channels: {
              "dummy-id": {
                id: `dummy-id`,
                version: FirebaseGuildChannelVersionEnum.V1,
              },
              "other-id": {
                id: `other-id`,
                version: FirebaseGuildChannelVersionEnum.V1,
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

            const result = service.getUpdatedGuild(
              id,
              isEnabled,
              firebaseGuild
            );

            expect(result).toStrictEqual({
              "channels.dummy-id.features.noon.isEnabled": false,
              "channels.dummy-id.features.noon.version": 1,
              "channels.dummy-id.features.version": 1,
              "channels.dummy-id.id": `dummy-id`,
              "channels.dummy-id.version": 1,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(
              id,
              isEnabled,
              firebaseGuild
            );

            expect(result).toStrictEqual({
              "channels.dummy-id.features.noon.isEnabled": true,
              "channels.dummy-id.features.noon.version": 1,
              "channels.dummy-id.features.version": 1,
              "channels.dummy-id.id": `dummy-id`,
              "channels.dummy-id.version": 1,
            });
          });
        });
      });

      describe(`when the given Firebase guild does have a channel with the given id with features but without noon`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createMock<IFirebaseGuildVFinal>({
            channels: {
              "dummy-id": {
                features: {
                  version: FirebaseGuildChannelFeatureVersionEnum.V1,
                },
                id: `dummy-id`,
                version: FirebaseGuildChannelVersionEnum.V1,
              },
              "other-id": {
                id: `other-id`,
                version: FirebaseGuildChannelVersionEnum.V1,
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

            const result = service.getUpdatedGuild(
              id,
              isEnabled,
              firebaseGuild
            );

            expect(result).toStrictEqual({
              "channels.dummy-id.features.noon.isEnabled": false,
              "channels.dummy-id.features.noon.version": 1,
              "channels.dummy-id.features.version": 1,
              "channels.dummy-id.id": `dummy-id`,
              "channels.dummy-id.version": 1,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(
              id,
              isEnabled,
              firebaseGuild
            );

            expect(result).toStrictEqual({
              "channels.dummy-id.features.noon.isEnabled": true,
              "channels.dummy-id.features.noon.version": 1,
              "channels.dummy-id.features.version": 1,
              "channels.dummy-id.id": `dummy-id`,
              "channels.dummy-id.version": 1,
            });
          });
        });
      });

      describe(`when the given Firebase guild does have a channel with the given id with noon feature`, (): void => {
        beforeEach((): void => {
          firebaseGuild = createMock<IFirebaseGuildVFinal>({
            channels: {
              "dummy-id": {
                features: {
                  noon: {
                    version: FirebaseGuildChannelFeatureNoonVersionEnum.V1,
                  },
                  version: FirebaseGuildChannelFeatureVersionEnum.V1,
                },
                id: `dummy-id`,
                version: FirebaseGuildChannelVersionEnum.V1,
              },
              "other-id": {
                id: `other-id`,
                version: FirebaseGuildChannelVersionEnum.V1,
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

            const result = service.getUpdatedGuild(
              id,
              isEnabled,
              firebaseGuild
            );

            expect(result).toStrictEqual({
              "channels.dummy-id.features.noon.isEnabled": false,
            });
          });
        });

        describe(`when the given enable state is true`, (): void => {
          beforeEach((): void => {
            isEnabled = true;
          });

          it(`should return an object with a multiple paths updating the enable state to false`, (): void => {
            expect.assertions(1);

            const result = service.getUpdatedGuild(
              id,
              isEnabled,
              firebaseGuild
            );

            expect(result).toStrictEqual({
              "channels.dummy-id.features.noon.isEnabled": true,
            });
          });
        });
      });
    });
  });
});
