// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../db/prisma";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { url } = req.body;
  const data = await prisma.shortLink.create({
    data: {
      url: url,
      slug: "test",
    },
  });
  console.log(data);
  res.status(200).json({ name: "John Doe" });
}