import { getDate } from "./chat-parser";
import { MessageTelegram } from "./type";

export const dateParser = (message: MessageTelegram) => {
  const date = new Date(getDate(message) * 1000);

  date.setHours(date.getHours() + 8);
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
};
