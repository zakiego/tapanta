import { HookTelegram, MessageTelegram } from "./type";

export const getUpdatedId = (body: HookTelegram) => {
  return body.update_id.toString();
};

export const getMessageId = (message: MessageTelegram) => {
  return message.message_id.toString();
};

export const getChatId = (message: MessageTelegram) => {
  return message.chat.id.toString();
};

export const getText = (message: MessageTelegram) => {
  return message.text;
};

export const getDate = (message: MessageTelegram) => {
  return message.date;
};
