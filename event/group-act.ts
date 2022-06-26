import { getChatId, getMessageId, getText } from "../utils/chat-parser";
import { githubAct } from "../utils/github";
import { sendMessage } from "../utils/sendMessage";
import stringParser from "../utils/string-parser";
import { HookTelegram } from "../utils/type";

const GroupAct = async (hook: HookTelegram) => {
  const { message } = hook;

  const text = getText(message);
  const content = stringParser.getActFormat(message);

  const filepath = stringParser.getFilepath(text);
  console.log(filepath);

  const url = await githubAct.uploadFile(filepath, content);
  await sendMessage(getChatId(message), `Uploaded with link ${url}`, {
    reply_to_message_id: getMessageId(message),
  });
};

export default GroupAct;
