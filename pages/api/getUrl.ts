// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.body;
  const data = await prisma.shortLink.create({
    data: {
      url: url,
      slug: nanoid(),
    },
  });

  res.status(200).json(data);
}
