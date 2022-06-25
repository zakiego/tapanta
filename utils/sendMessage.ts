import fetch from "node-fetch-native";
import queryString from "query-string";

import { config } from "../config";

export const sendMessage = async (
  chatId: string,
  message: string,
  options?: {
    reply_to_message_id?: string;
    parseMode?: "MarkdownV2" | "HTML";
  },
) => {
  const query = queryString.stringify({
    chat_id: chatId,
    text: message,
    parse_mode: options.parseMode,
    reply_to_message_id: options.reply_to_message_id,
  });

  const resp = await fetch(config.tg.url + "/sendMessage?" + query).then(
    (resp) => resp.json(),
  );

  return resp;
};
