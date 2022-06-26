import randomstring from "randomstring";

import dateParser from "./date-parser";
import { MessageTelegram } from "./type";

export default class stringParser {
  static getTitle(text: string) {
    return text.split("\n")[0];
  }

  static getContent(text: string) {
    const split = text.split("\n").splice(1);
    return split.join("\n");
  }

  static getFilepath(text: string) {
    const filename =
      this.getTitle(text) +
      "-" +
      randomstring.generate(5).toLocaleLowerCase() +
      ".md";
    return `data/${filename.toLocaleLowerCase()}`;
  }

  static getActFormat(message: MessageTelegram) {
    const meta = `---
title         : ${this.getTitle(message.text)}
updatedAt     : ${dateParser.getActFormat(message)}
createdAt     : ${dateParser.getActFormat(message)}
updatedAtUnix : ${dateParser.getActFormat(message)}
createdAtUnix : ${dateParser.getUnix(message)} 
---
${this.getContent(message.text)}
`;
    return meta;
  }
}
