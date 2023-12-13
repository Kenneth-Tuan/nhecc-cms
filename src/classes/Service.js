import { v4 as uuidv4 } from "uuid";

export class OriginalSongInfo {
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
