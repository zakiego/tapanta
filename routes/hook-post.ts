import { FastifyReply, FastifyRequest } from "fastify";

import { config } from "../config";
import GroupAct from "../event/group-act";
import GroupWhatIReadToday from "../event/group-what-i-read-today";
import { getChatId } from "../utils/chat-parser";
import { HookTelegram } from "../utils/type";

export default async function HookPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const hook = request.body as HookTelegram;

  const { message } = hook;

  if (!message) {
    return { ok: false };
  }

  const { group } = config;

  switch (getChatId(message)) {
    case group.whatIReadToday:
      await GroupWhatIReadToday(hook);
      break;

    case group.act:
      await GroupAct(hook);
      break;

    default:
      console.log("Schema not found");
      console.log(message);
      break;
  }

  return { ok: true };
}
