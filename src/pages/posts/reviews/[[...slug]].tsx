import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ArrowDownCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import prisma from "@/backend/prisma";
import { Post } from "@prisma/client";

import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";

function Reviews({ posts }: any) {
  const route = useRouter();
  const [take, setTake] = useState(5);
  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    route.push({
      query: {
        slug: [take, title] as string[],
      },
    });
  }, [take, title]);

  return (
    <Layout>
      <Head>
        <title>Críticas</title>
      </Head>
      <div className="flex flex-col items-center">
        <div className="flex gap-10 my-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-6 w-6 text-emerald-500" />
            </div>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-slate-700 dark:placeholder-slate-400 dark:text-white"
              placeholder="título"
            />
          </div>
        </div>
        {posts.map((post: Post) => (
          <Card
            key={post.id}
            link={post.id}
            title={post.title}
            cover={post.cover}
            category={post.category}
            date={post.date}
            cardStyle="bg-purple-200 dark:bg-purple-900"
            headlineStyle="text-purple-900 dark:text-purple-500"
          />
        ))}
        <button onClick={() => setTake(take + 5)}>
          <ArrowDownCircleIcon className="text-emerald-500 hover:opacity-80 w-14" />
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      title: {
        contains: params?.slug?.[1],
      },
    },
    orderBy: { date: "desc" },
    take: Number(params?.slug?.[0] || 5),
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { posts },
  };
};

export default Reviews;
