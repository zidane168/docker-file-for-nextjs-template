import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  let robotsText = `User-agent: *
Disallow /`;
  res.send(robotsText);
};

export default handler;
