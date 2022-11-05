import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../db/prisma";

const deleteAllRecords = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await prisma.shortLink.deleteMany();
  const { count } = data;
  if (count > 0) return res.send({ msg: "deleted all records" });
  else return res.send({ msg: "empty database" });
};
export default deleteAllRecords;
