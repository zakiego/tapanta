// https://www.fastify.io/docs/latest/Guides/Serverless/

import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";

const app = Fastify({
  logger: false,
});

app.register(import("../controller"));

export default async (req: VercelRequest, res: VercelResponse) => {
  await app.ready();
  app.server.emit("request", req, res);
};
