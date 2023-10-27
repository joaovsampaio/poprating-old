import prisma from "@/backend/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const session = await getSession({ req });

  switch (method) {
    case "POST":
      try {
        const posts = await prisma.post.create({
          data: {
            author: { connect: { email: session?.user?.email } },
            ...body,
          },
        });
        res.status(200).json(posts);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error to create a post" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
