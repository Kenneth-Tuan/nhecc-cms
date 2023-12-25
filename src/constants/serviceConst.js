import { ROLES_TYPE, ROLES_NAME } from "@/enums/AppEnum";
import acoustic_guitar from "@/assets/icons/acoustic-guitar.svg";
import cello from "@/assets/icons/cello.svg";
import drum_kit from "@/assets/icons/drum-kit.svg";
import electric_guitar from "@/assets/icons/electric-guitar.svg";
import vocal from "@/assets/icons/microphone.svg";
import saxophone from "@/assets/icons/saxophone.svg";
import trombone from "@/assets/icons/trombone.svg";
import violin from "@/assets/icons/violin.svg";
import other from "@/assets/icons/other_people.svg";
import keyboard2 from "@/assets/icons/synthesizer-keyboard.svg";
import keyboard1 from "@/assets/icons/piano.svg";
import trumphet from "@/assets/icons/trumphet.svg";
import bass from "@/assets/icons/bass.svg";

export const MAX_HYMNS = 10;
export const MAX_MEMBERS = 10;

export const ROLES_OF_BAND = [
  {
    roleName: ROLES_NAME.worship_leader,
    roleType: ROLES_TYPE.VOCALIST,
    icon: vocal,
  },
  {
    roleName: ROLES_NAME.keyboardist_1st,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: keyboard1,
  },
  {
    roleName: ROLES_NAME.keyboardist_2st,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: keyboard2,
  },
  {
    roleName: ROLES_NAME.acoustic_guitarist,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: acoustic_guitar,
  },
  {
    roleName: ROLES_NAME.electric_lead_guitarist,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: electric_guitar,
  },
  {
    roleName: ROLES_NAME.bassist,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: bass,
  },
  {
    roleName: ROLES_NAME.drummer,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: drum_kit,
  },
  { roleName: ROLES_NAME.vocalist, roleType: ROLES_TYPE.VOCALIST, icon: vocal },
  // { roleName: ROLES_NAME.flutist, roleType: ROLES_TYPE.INSTRUMENTALIST },
  {
    roleName: ROLES_NAME.violinist,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: violin,
  },
  {
    roleName: ROLES_NAME.saxophonist,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: saxophone,
  },
  {
    roleName: ROLES_NAME.trumpeter,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: trumphet,
  },
  {
    roleName: ROLES_NAME.trombonist,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: trombone,
  },
  {
    roleName: ROLES_NAME.cellist,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
    icon: cello,
  },
  { roleName: ROLES_NAME.other, roleType: ROLES_TYPE.OTHER, icon: other },
];
