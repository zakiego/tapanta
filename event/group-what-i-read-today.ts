import getMetaData from "metadata-scraper";

import {
  getChatId,
  getMessageId,
  getText,
  getUpdatedId,
} from "../utils/chat-parser";
import { dateParser } from "../utils/date-parser";
import revalidateReadingList from "../utils/revalidate-read";
import { sendMessage } from "../utils/sendMessage";
import { supabase } from "../utils/supabase";
import { HookTelegram } from "../utils/type";

const GroupWhatIReadToday = async (hook: HookTelegram) => {
  const { message } = hook;
  const text = getText(message);

  const isLink = text.startsWith("http");

  if (!isLink) {
    return { ok: false };
  }

  const meta = await getMetaData(text);
  const { formatDate, dateText } = dateParser(message);

  const fullText = `${meta.title} ${meta.description} ${meta.url} ${dateText}`;

  const { data, error } = await supabase.from("what_i_read_today").insert([
    {
      title: meta.title,
      description: meta.description,
      link: text,
      date: formatDate,
      dateText: dateText,
      chatId: getUpdatedId(hook),
      fullText: fullText,
      from: "telegram",
    },
  ]);

  if (error) {
    return await sendMessage(
      getChatId(message),
      `Error - ${JSON.stringify(error)}`,
      {
        reply_to_message_id: getMessageId(message),
      },
    );
  }

  await sendMessage(
    getChatId(message),
    `Success - Posted link with id ${data[0].id}`,
    { reply_to_message_id: getMessageId(message) },
  );

  const revalidate = await revalidateReadingList();

  await sendMessage(
    getChatId(message),
    `Revalidate after add post: *${revalidate}*`,
    { parseMode: "MarkdownV2", reply_to_message_id: getMessageId(message) },
  );

  return;
};

export default GroupWhatIReadToday;
