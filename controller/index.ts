import type { FastifyReply, FastifyRequest } from "fastify";

import ActJSON from "../routes/act-json";
import HookGet from "../routes/hook-get";
import HookPost from "../routes/hook-post";

export default async function routes(fastify, options: any) {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: "https://github.com/zakiego/tapanta" };
  });

  fastify.get("/hook", HookGet);
  fastify.post("/hook", HookPost);
  fastify.get("/act.json", ActJSON);
}
