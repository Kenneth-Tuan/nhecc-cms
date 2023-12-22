import { v4 as uuidv4 } from "uuid";

export class OriginalHymnInfo {
  constructor({
    id = uuidv4(),
    name = "",
    key = "",
    sheet = "",
    urlRef = "",
  } = {}) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.sheet = sheet;
    this.urlRef = urlRef;
  }
}

export class OriginalBandMember {
  constructor({ id = uuidv4(), name = "", role = "", remarks = "" } = {}) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.remarks = remarks;
  }
}
