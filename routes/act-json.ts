import { FastifyReply, FastifyRequest } from "fastify";
import matter, { GrayMatterFile } from "gray-matter";

import fetchGraphQL from "../utils/fetchGraphQL";

export default async function ActJSON(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const resp = await fetchGraphQL(`
    query {
      repository(name: "act-elgharantaly-quotes", owner: "zakiego") {
        object(expression: "main:data/") {
          ... on Tree {
            entries {
              name
              extension
              path
              type
              details: object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }`);

  const toJson = resp.data.repository.object.entries.map((item) => {
    const convert: GrayWithMeta = matter(item.details.text);
    const meta = {
      name: item.name,
      path: item.path,
    };
    convert.meta = meta;
    return convert;
  });

  return { data: toJson };
}

interface GrayWithMeta extends GrayMatterFile<string> {
  meta?: {
    name: string;
    path: string;
  };
}
