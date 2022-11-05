import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../db/prisma";

const getSlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  if (typeof slug === "string") {
    const data = await prisma.shortLink.findFirst({
      where: {
        slug: slug,
      },
    });
    if (data) {
      const { url } = data;
      if (url.length !== 0) {
        return res.redirect(url);
      }
    }
  }
  return res.send({ msg: "slug" });
};
export default getSlug;
