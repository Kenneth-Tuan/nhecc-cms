import { ROLES_TYPE, ROLES_NAME } from "@/enums/AppEnum";

export const MAX_HYMNS = 10;
export const MAX_MEMBERS = 10;

export const ROLES_OF_BAND = [
  { roleName: ROLES_NAME.worship_leader, roleType: ROLES_TYPE.VOCALIST },
  {
    roleName: ROLES_NAME.keyboardist_1st,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
  },
  {
    roleName: ROLES_NAME.keyboardist_2st,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
  },
  {
    roleName: ROLES_NAME.acoustic_guitarist,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
  },
  {
    roleName: ROLES_NAME.electric_lead_guitarist,
    roleType: ROLES_TYPE.INSTRUMENTALIST,
  },
  { roleName: ROLES_NAME.bassist, roleType: ROLES_TYPE.INSTRUMENTALIST },
  { roleName: ROLES_NAME.drummer, roleType: ROLES_TYPE.INSTRUMENTALIST },
  { roleName: ROLES_NAME.vocalist, roleType: ROLES_TYPE.VOCALIST },
  { roleName: ROLES_NAME.flutist, roleType: ROLES_TYPE.INSTRUMENTALIST },
  { roleName: ROLES_NAME.violinist, roleType: ROLES_TYPE.INSTRUMENTALIST },
  { roleName: ROLES_NAME.saxophonist, roleType: ROLES_TYPE.INSTRUMENTALIST },
  { roleName: ROLES_NAME.trumpeter, roleType: ROLES_TYPE.INSTRUMENTALIST },
  { roleName: ROLES_NAME.trombonist, roleType: ROLES_TYPE.INSTRUMENTALIST },
  { roleName: ROLES_NAME.cellist, roleType: ROLES_TYPE.INSTRUMENTALIST },
  { roleName: ROLES_NAME.other, roleType: ROLES_TYPE.OTHER },
];
