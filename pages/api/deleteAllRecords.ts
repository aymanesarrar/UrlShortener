import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../db/prisma";

const deleteAllRecords = async (req: NextApiRequest, res: NextApiResponse) => {
  const { secretkey } = req.headers;

  if (secretkey === "donottrythis") {
    const data = await prisma.shortLink.deleteMany();
    const { count } = data;
    if (count > 0) return res.send({ msg: "deleted all records" });
    else return res.send({ msg: "empty database" });
  }
  res.statusCode = 401;
  return res.send({ msg: "invalid secret key" });
};
export default deleteAllRecords;
