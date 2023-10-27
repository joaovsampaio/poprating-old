import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/backend/prisma";
import GoogleProvider from "next-auth/providers/google";
import { NextApiHandler } from "next";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

export default authHandler;
