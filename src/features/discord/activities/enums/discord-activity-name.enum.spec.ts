import { DiscordActivityNameEnum } from './discord-activity-name.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`DiscordActivityNameEnum`, (): void => {
  it(`should have 159 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordActivityNameEnum)).toBe(159);
  });

  it(`should have a member "SPOTIFY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SPOTIFY).toBe(`Spotify`);
  });

  it(`should have a member "MOM"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MOM).toBe(`mom`);
  });

  it(`should have a member "MOMMY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MOMMY).toBe(`mommy`);
  });

  it(`should have a member "DAD"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.DAD).toBe(`dad`);
  });

  it(`should have a member "DADDY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.DADDY).toBe(`daddy`);
  });

  it(`should have a member "DEEZER"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.DEEZER).toBe(`Deezer`);
  });

  it(`should have a member "APPLE_MUSIC"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.APPLE_MUSIC).toBe(`Apple Music`);
  });

  it(`should have a member "GOD"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.GOD).toBe(`God`);
  });

  it(`should have a member "WEB_STORM"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.WEB_STORM).toBe(`WebStorm`);
  });

  it(`should have a member "GRAND_THEFT_AUTO_V"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.GRAND_THEFT_AUTO_V).toBe(`Grand Theft Auto V`);
  });

  it(`should have a member "COUNTER_STRIKE_GLOBAL_OFFENSIVE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.COUNTER_STRIKE_GLOBAL_OFFENSIVE).toBe(`Counter-Strike: Global Offensive`);
  });

  it(`should have a member "MINECRAFT"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MINECRAFT).toBe(`Minecraft`);
  });

  it(`should have a member "MIRA_HATTER"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MIRA_HATTER).toBe(`Mira Hatter`);
  });

  it(`should have a member "MOBY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MOBY).toBe(`Moby`);
  });

  it(`should have a member "WORLD_OF_WARCRAFT"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.WORLD_OF_WARCRAFT).toBe(`World of Warcraft`);
  });

  it(`should have a member "YOU_TUBE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.YOU_TUBE).toBe(`YouTube`);
  });

  it(`should have a member "AMAZON_PRIME_VIDEO"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.AMAZON_PRIME_VIDEO).toBe(`Amazon Prime Video`);
  });

  it(`should have a member "OCS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.OCS).toBe(`OCS`);
  });

  it(`should have a member "CANAL_PLUS_SERIES"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.CANAL_PLUS_SERIES).toBe(`CANAL+ Series`);
  });

  it(`should have a member "APPLE_TV_PLUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.APPLE_TV_PLUS).toBe(`Apple TV+`);
  });

  it(`should have a member "DISNEY_PLUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.DISNEY_PLUS).toBe(`Disney+`);
  });

  it(`should have a member "DJ_KHALED"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.DJ_KHALED).toBe(`DJ Khaled`);
  });

  it(`should have a member "YOU_TUBE_PREMIUM"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.YOU_TUBE_PREMIUM).toBe(`YouTube Premium`);
  });

  it(`should have a member "ZOLE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ZOLE).toBe(`Zole`);
  });

  it(`should have a member "FACEBOOK_WATCH"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.FACEBOOK_WATCH).toBe(`Facebook Watch`);
  });

  it(`should have a member "SALTO"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SALTO).toBe(`Salto`);
  });

  it(`should have a member "PEACOCK"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.PEACOCK).toBe(`Peacock`);
  });

  it(`should have a member "HBO_MAX"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.HBO_MAX).toBe(`HBO Max`);
  });

  it(`should have a member "TWITCH"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TWITCH).toBe(`Twitch`);
  });

  it(`should have a member "YOU"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.YOU).toBe(`you`);
  });

  it(`should have a member "LIKE_BIG_BROTHER"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.LIKE_BIG_BROTHER).toBe(`like Big Brother`);
  });

  it(`should have a member "SOME_MEMES"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SOME_MEMES).toBe(`some memes`);
  });

  it(`should have a member "THE_FBI"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.THE_FBI).toBe(`the FBI`);
  });

  it(`should have a member "THE_KID_LAROI"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.THE_KID_LAROI).toBe(`The Kid LAROI`);
  });

  it(`should have a member "THE_EXCLAMATION_POINT_HELP_COMMAND"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.THE_EXCLAMATION_POINT_HELP_COMMAND).toBe(`the !help command`);
  });

  it(`should have a member "THE_DOLLAR_HELP_COMMAND"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.THE_DOLLAR_HELP_COMMAND).toBe(`the $help command`);
  });

  it(`should have a member "THE_DASH_HELP_COMMAND"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.THE_DASH_HELP_COMMAND).toBe(`the -help command`);
  });

  it(`should have a member "SQUEEZIE_GAMING"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SQUEEZIE_GAMING).toBe(`SQUEEZIE GAMING`);
  });

  it(`should have a member "TDOT_ILLDUDE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TDOT_ILLDUDE).toBe(`Tdot Illdude`);
  });

  it(`should have a member "TEQKOI"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TEQKOI).toBe(`Teqkoi`);
  });

  it(`should have a member "A_LIVE_OF_RAMMSTEIN"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.A_LIVE_OF_RAMMSTEIN).toBe(`a live of Rammstein`);
  });

  it(`should have a member "TWELVE_AM"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TWELVE_AM).toBe(`12AM`);
  });

  it(`should have a member "TWENTY_FOUR_KGOLDN"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TWENTY_FOUR_KGOLDN).toBe(`24KGoldn`);
  });

  it(`should have a member "TWENTY_SEVEN_CLUB"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TWENTY_SEVEN_CLUB).toBe(`27CLUB`);
  });

  it(`should have a member "VINNIE_PAZ"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.VINNIE_PAZ).toBe(`Vinnie Paz`);
  });

  it(`should have a member "ABSTRACT"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ABSTRACT).toBe(`Abstract`);
  });

  it(`should have a member "ADRIAN_STRESOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ADRIAN_STRESOW).toBe(`Adrian Stresow`);
  });

  it(`should have a member "ALEX_JORDAHL"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ALEX_JORDAHL).toBe(`Alex Jordahl`);
  });

  it(`should have a member "ANTHONY_RUSSO"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ANTHONY_RUSSO).toBe(`Anthony Russo`);
  });

  it(`should have a member "APOLLO"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.APOLLO).toBe(`Apollo`);
  });

  it(`should have a member "APOLLO_BROWN"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.APOLLO_BROWN).toBe(`Apollo Brown`);
  });

  it(`should have a member "ARIZONA_ZERVAS`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ARIZONA_ZERVAS).toBe(`Arizona Zervas`);
  });

  it(`should have a member "ARMY_OF_THE_PHARAOHS`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ARMY_OF_THE_PHARAOHS).toBe(`Army Of The Pharaohs`);
  });

  it(`should have a member "AZAD"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.AZAD).toBe(`Azad`);
  });

  it(`should have a member "BASIC"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.BASIC).toBe(`Basic`);
  });

  it(`should have a member "BAZANJI"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.BAZANJI).toBe(`Bazanji`);
  });

  it(`should have a member "BIGFLO_AND_OLI"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.BIGFLO_AND_OLI).toBe(`Bigflo & Oli`);
  });

  it(`should have a member "BLACKBEAR"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.BLACKBEAR).toBe(`Blackbear`);
  });

  it(`should have a member "BUGUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.BUGUS).toBe(`Bugus`);
  });

  it(`should have a member "C_DOT_CASTRO"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.C_DOT_CASTRO).toBe(`C Dot Castro`);
  });

  it(`should have a member "CALL_ME_KARIZMA"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.CALL_ME_KARIZMA).toBe(`Call Me Karizma`);
  });

  it(`should have a member "CAM_MEEKINS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.CAM_MEEKINS).toBe(`Cam Meekins`);
  });

  it(`should have a member "CARTER"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.CARTER).toBe(`CaRter`);
  });

  it(`should have a member "CHRIS_YONGE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.CHRIS_YONGE).toBe(`Chris Yonge`);
  });

  it(`should have a member "CJ_TRILLO"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.CJ_TRILLO).toBe(`CJ Trillo`);
  });

  it(`should have a member "CROOSH"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.CROOSH).toBe(`Croosh`);
  });

  it(`should have a member "C_TROX"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.C_TROX).toBe(`C-Trox`);
  });

  it(`should have a member "CYRUS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.CYRUS).toBe(`Cyrus`);
  });

  it(`should have a member "DOOBIE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.DOOBIE).toBe(`Doobie`);
  });

  it(`should have a member "DRAKE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.DRAKE).toBe(`Drake`);
  });

  it(`should have a member "D_WHY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.D_WHY).toBe(`D-WHY`);
  });

  it(`should have a member "DA_BABY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.DA_BABY).toBe(`DaBaby`);
  });

  it(`should have a member "DEMPSEY_ROLL_BOY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.DEMPSEY_ROLL_BOY).toBe(`DempseyRollBoy`);
  });

  it(`should have a member "EMINEM"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.EMINEM).toBe(`Eminem`);
  });

  it(`should have a member "EVIDENCE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.EVIDENCE).toBe(`Evidence`);
  });

  it(`should have a member "G_EAZY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.G_EAZY).toBe(`G-Eazy`);
  });

  it(`should have a member "GRITS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.GRITS).toBe(`Grits`);
  });

  it(`should have a member "GUNNA"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.GUNNA).toBe(`Gunna`);
  });

  it(`should have a member "HENDERSIN"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.HENDERSIN).toBe(`Hendersin`);
  });

  it(`should have a member "HIPPIE_SABOTAGE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.HIPPIE_SABOTAGE).toBe(`Hippie Sabotage`);
  });

  it(`should have a member "HI_REZ"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.HI_REZ).toBe(`Hi-Rez`);
  });

  it(`should have a member "HUEY_MACK"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.HUEY_MACK).toBe(`Huey Mack`);
  });

  it(`should have a member "INDII_G"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.INDII_G).toBe(`Indii G.`);
  });

  it(`should have a member "IVAN_B"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.IVAN_B).toBe(`Ivan B`);
  });

  it(`should have a member "JAIDEN"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JAIDEN).toBe(`Jaiden`);
  });

  it(`should have a member "JAY_PORTAL"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JAY_PORTAL).toBe(`Jay Portal`);
  });

  it(`should have a member "JAY_ZOLE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JAY_ZOLE).toBe(`Jay Zole`);
  });

  it(`should have a member "JEROME"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JEROME).toBe(`Jerome`);
  });

  it(`should have a member "JEZ_DIOR"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JEZ_DIOR).toBe(`Jez Dior`);
  });

  it(`should have a member "JOHN_WOLF"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JOHN_WOLF).toBe(`John Wolf`);
  });

  it(`should have a member "JOSH_A"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JOSH_A).toBe(`Josh A`);
  });

  it(`should have a member "JUICE_WRLD"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JUICE_WRLD).toBe(`Juice WRLD`);
  });

  it(`should have a member "JUSTIN_STONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JUSTIN_STONE).toBe(`Justin Stone`);
  });

  it(`should have a member "JUTES"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JUTES).toBe(`Jutes`);
  });

  it(`should have a member "J_WRIGHT"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.J_WRIGHT).toBe(`J-Wright`);
  });

  it(`should have a member "JACK_HARLOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.JACK_HARLOW).toBe(`Jack Harlow`);
  });

  it(`should have a member "K_A_A_N"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.K_A_A_N).toBe(`K.A.A.N`);
  });

  it(`should have a member "KANYE_WEST"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.KANYE_WEST).toBe(`Kanye West`);
  });

  it(`should have a member "KEVIN_GATES"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.KEVIN_GATES).toBe(`Kevin Gates`);
  });

  it(`should have a member "KID_INK"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.KID_INK).toBe(`Kid Ink`);
  });

  it(`should have a member "KID_QUILL"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.KID_QUILL).toBe(`Kid Quill`);
  });

  it(`should have a member "THE_KINGS_DEAD"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.THE_KINGS_DEAD).toBe(`The Kings Dead`);
  });

  it(`should have a member "LIL_BABY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.LIL_BABY).toBe(`Lil Baby`);
  });

  it(`should have a member "LIL_PEEP"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.LIL_PEEP).toBe(`Lil Peep`);
  });

  it(`should have a member "LIL_REVIVE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.LIL_REVIVE).toBe(`Lil Revive`);
  });

  it(`should have a member "LOGIC"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.LOGIC).toBe(`Logic`);
  });

  it(`should have a member "LUKE_CHRISTOPHER"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.LUKE_CHRISTOPHER).toBe(`Luke Christopher`);
  });

  it(`should have a member "MAC_MILLER"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MAC_MILLER).toBe(`Mac Miller`);
  });

  it(`should have a member "MACHINE_GUN_KELLY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MACHINE_GUN_KELLY).toBe(`Machine Gun Kelly`);
  });

  it(`should have a member "MACKLEMORE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MACKLEMORE).toBe(`Macklemore`);
  });

  it(`should have a member "MARC_GOONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MARC_GOONE).toBe(`Marc Goone`);
  });

  it(`should have a member "MATT_EASTON"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MATT_EASTON).toBe(`Matt Easton`);
  });

  it(`should have a member "MIGOS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MIGOS).toBe(`Migos`);
  });

  it(`should have a member "MIKE_JOEY_AND_MIZZY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MIKE_JOEY_AND_MIZZY).toBe(`Mike JOEY & Mizzy`);
  });

  it(`should have a member "MILES_WESLEY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.MILES_WESLEY).toBe(`Miles Wesley`);
  });

  it(`should have a member "NATE_GOOD"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.NATE_GOOD).toBe(`Nate Good`);
  });

  it(`should have a member "NF"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.NF).toBe(`NF`);
  });

  it(`should have a member "NICK_BONIN"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.NICK_BONIN).toBe(`Nick Bonin`);
  });

  it(`should have a member "NOAH_NORTH"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.NOAH_NORTH).toBe(`Noah North`);
  });

  it(`should have a member "NOTHING_NOWHERE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.NOTHING_NOWHERE).toBe(`Nothing,Nowhere`);
  });

  it(`should have a member "NOTIME"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.NOTIME).toBe(`notime`);
  });

  it(`should have a member "OCD_MOOSH_AND_TWIST"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.OCD_MOOSH_AND_TWIST).toBe(`OCD Moosh & Twist`);
  });

  it(`should have a member "OLLIE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.OLLIE).toBe(`Ollie`);
  });

  it(`should have a member "ON_CUE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ON_CUE).toBe(`OnCue`);
  });

  it(`should have a member "ORELSAN"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ORELSAN).toBe(`Orelsan`);
  });

  it(`should have a member "OUSE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.OUSE).toBe(`Ouse`);
  });

  it(`should have a member "P_MO"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.P_MO).toBe(`P.MO`);
  });

  it(`should have a member "PACKY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.PACKY).toBe(`Packy`);
  });

  it(`should have a member "PHORA"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.PHORA).toBe(`Phora`);
  });

  it(`should have a member "POLO_G"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.POLO_G).toBe(`Polo G`);
  });

  it(`should have a member "POST_MALONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.POST_MALONE).toBe(`Post Malone`);
  });

  it(`should have a member "POWFU"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.POWFU).toBe(`Powfu`);
  });

  it(`should have a member "QUINN_XCII"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.QUINN_XCII).toBe(`Quinn XCII`);
  });

  it(`should have a member "RAH_C"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.RAH_C).toBe(`Rah-C`);
  });

  it(`should have a member "RAZ_SIMONE"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.RAZ_SIMONE).toBe(`Raz Simone`);
  });

  it(`should have a member "REMA"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.REMA).toBe(`Rema`);
  });

  it(`should have a member "ROWLAN"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ROWLAN).toBe(`Rowlan`);
  });

  it(`should have a member "ROY_JONES"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.ROY_JONES).toBe(`Roy Jones`);
  });

  it(`should have a member "RUSS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.RUSS).toBe(`Russ`);
  });

  it(`should have a member "RXSEBOY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.RXSEBOY).toBe(`Rxseboy`);
  });

  it(`should have a member "RYAN_CARAVEO"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.RYAN_CARAVEO).toBe(`Ryan Caraveo`);
  });

  it(`should have a member "RYAN_OAKES"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.RYAN_OAKES).toBe(`Ryan Oakes`);
  });

  it(`should have a member "SAD_BOY_PROLIFIC"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SAD_BOY_PROLIFIC).toBe(`SadBoyProlific`);
  });

  it(`should have a member "SAMMY_PHARAOH"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SAMMY_PHARAOH).toBe(`Sammy Pharaoh`);
  });

  it(`should have a member "SHELTON_HARRIS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SHELTON_HARRIS).toBe(`Shelton Harris`);
  });

  it(`should have a member "SIK_WORLD"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SIK_WORLD).toBe(`Sik World`);
  });

  it(`should have a member "SLEEPY_HALLOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SLEEPY_HALLOW).toBe(`Sleepy Hallow`);
  });

  it(`should have a member "SNOW"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SNOW).toBe(`Snøw`);
  });

  it(`should have a member "SOL"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.SOL).toBe(`Sol`);
  });

  it(`should have a member "TOBILLA"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TOBILLA).toBe(`Tobilla`);
  });

  it(`should have a member "TRAVIS_SCOTT"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TRAVIS_SCOTT).toBe(`Travis Scott`);
  });

  it(`should have a member "TRAY_JACK"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TRAY_JACK).toBe(`Tray Jack`);
  });

  it(`should have a member "TREVOR_DANIEL"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TREVOR_DANIEL).toBe(`Trevor Daniel`);
  });

  it(`should have a member "TRIPPZ_MICHAUD"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.TRIPPZ_MICHAUD).toBe(`Trippz Michaud`);
  });

  it(`should have a member "WILLIS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.WILLIS).toBe(`Willis`);
  });

  it(`should have a member "WITT_LOWRY"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.WITT_LOWRY).toBe(`Witt Lowry`);
  });

  it(`should have a member "WIZ_KHALIFA"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.WIZ_KHALIFA).toBe(`Wiz Khalifa`);
  });

  it(`should have a member "XXXTENTACION"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.XXXTENTACION).toBe(`XXXTENTACION`);
  });

  it(`should have a member "YONAS"`, (): void => {
    expect.assertions(1);

    expect(DiscordActivityNameEnum.YONAS).toBe(`YONAS`);
  });
});
