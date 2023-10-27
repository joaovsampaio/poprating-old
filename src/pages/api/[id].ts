import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/backend/prisma";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const session = await getSession({ req });
  const postId = req.query.id;

  switch (method) {
    case "GET":
      try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching posts" });
      }
      break;
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
    case "PUT":
      try {
        const posts = await prisma.post.update({
          where: { id: String(postId) },
          data: {
            ...body,
          },
        });
        res.status(200).json(posts);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error to update a post" });
      }
      break;
    case "DELETE":
      try {
        const posts = await prisma.post.delete({
          where: { id: String(postId) },
        });
        res.status(200).json(posts);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error to delete a post" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
