import { FastifyReply, FastifyRequest } from "fastify";
import fetch from "node-fetch-native";

import { config } from "../config";

type Query = {
  url: string;
  password: string;
};

export default async function HookGet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { url, password } = request.query as Query;

  if (url == undefined || password == undefined) {
    const resp = await fetch(config.tg.url + "/getWebhookInfo").then((resp) =>
      resp.json(),
    );

    return { data: resp };
  }

  if (password != process.env.PASSWORD_REVALIDATE_ZAKIEGO) {
    return { errors: "Check ur password" };
  }

  const resp = await fetch(config.tg.url + "/setWebhook?url=" + url).then(
    (resp) => resp.json(),
  );

  return { data: resp };
}
