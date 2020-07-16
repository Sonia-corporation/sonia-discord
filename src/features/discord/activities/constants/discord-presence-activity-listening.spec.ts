import { DiscordActivityNameEnum } from "../enums/discord-activity-name.enum";
import { DiscordActivityTypeEnum } from "../enums/discord-activity-type.enum";
import { IDiscordPresenceActivity } from "../interfaces/discord-presence-activity";
import { DISCORD_PRESENCE_ACTIVITY_LISTENING } from "./discord-presence-activity-listening";

describe(`DISCORD_PRESENCE_ACTIVITY_LISTENING`, (): void => {
  it(`should contains a list of listening activities`, (): void => {
    expect.assertions(1);

    expect(DISCORD_PRESENCE_ACTIVITY_LISTENING).toStrictEqual([
      {
        name: DiscordActivityNameEnum.SPOTIFY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.MOM,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.MOMMY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.DAD,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.DADDY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.DEEZER,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.APPLE_MUSIC,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.TWELVE_AM,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.TWENTY_SEVEN_CLUB,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.ABSTRACT,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.ADRIAN_STRESOW,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.ALEX_JORDAHL,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.ANTHONY_RUSSO,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.APOLLO,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.ARIZONA_ZERVAS,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.AZAD,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.BASIC,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.BAZANJI,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.BUGUS,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.C_DOT_CASTRO,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.CALL_ME_KARIZMA,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.CAM_MEEKINS,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.CARTER,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.CHRIS_YONGE,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.CJ_TRILLO,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.CROOSH,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.C_TROX,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.CYRUS,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.DOOBIE,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.D_WHY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.EMINEM,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.G_EAZY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.HENDERSIN,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.HIPPIE_SABOTAGE,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.HI_REZ,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.HUEY_MACK,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.IVAN_B,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.JAIDEN,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.JEZ_DIOR,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.JOHN_WOLF,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.JUSTIN_STONE,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.JUTES,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.J_WRIGHT,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.K_A_A_N,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.KID_INK,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.KID_QUILL,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.THE_KINGS_DEAD,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.LIL_PEEP,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.LOGIC,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.LUKE_CHRISTOPHER,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.MACHINE_GUN_KELLY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.MACKLEMORE,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.MARC_GOONE,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.MATT_EASTON,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.MIKE_JOEY_AND_MIZZY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.NATE_GOOD,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.NF,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.NOAH_NORTH,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.OCD_MOOSH_AND_TWIST,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.OLLIE,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.ON_CUE,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.P_MO,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.PACKY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.PHORA,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.QUINN_XCII,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.RAH_C,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.RAZ_SIMONE,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.ROWLAN,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.RUSS,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.RYAN_CARAVEO,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.SAMMY_PHARAOH,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.SHELTON_HARRIS,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.SIK_WORLD,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.SOL,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.TOBILLA,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.TRAY_JACK,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.TRIPPZ_MICHAUD,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.WILLIS,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.WITT_LOWRY,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.XXXTENTACION,
        type: DiscordActivityTypeEnum.LISTENING,
      },
      {
        name: DiscordActivityNameEnum.YONAS,
        type: DiscordActivityTypeEnum.LISTENING,
      },
    ] as IDiscordPresenceActivity[]);
  });
});
