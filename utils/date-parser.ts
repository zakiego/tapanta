import { getDate } from "./chat-parser";
import { MessageTelegram } from "./type";

export default class dateParser {
  static getUTC8(message: MessageTelegram) {
    const date = new Date(getDate(message) * 1000);
    date.setHours(date.getHours() + 8);

    return date;
  }

  static getWitrFormat(message: MessageTelegram) {
    const date = this.getUTC8(message);

    const formatDate = date.toISOString().replace("T", " ").substring(0, 19);

    const dateText = new Date(formatDate).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    return { formatDate, dateText };
  }

  static getActFormat(message: MessageTelegram) {
    const date = this.getUTC8(message);

    const formatDate = date.toISOString().replace("T", " ").substring(0, 19);

    return formatDate;
  }

  static getUnix(message: MessageTelegram) {
    const date = this.getUTC8(message);
    return date.getTime();
  }
}
