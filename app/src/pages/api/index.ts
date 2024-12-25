import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  res.send("Hello World!");
};

export default handler;
