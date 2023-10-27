import { GetStaticProps } from "next";
import prisma from "@/backend/prisma";

import Layout from "@/components/layout/Layout";
import AsidePosts from "@/components/home/AsidePosts";
import LatestPosts from "@/components/home/LatestPosts";
import Banner from "@/components/home/Banner";

export default function Home({
  latestPosts,
  trendingPosts,
  collectionPosts,
}: any) {
  return (
    <Layout headerFixed>
      <Banner />
      <div className="flex justify-around my-10 max-lg:my-0 max-lg:flex-col max-lg:items-center">
        <AsidePosts
          asideStyle="max-lg:order-2 bg-red-100"
          headerStyle="text-red-500"
          headerTitle="Principais Críticas"
          cardStyle="bg-purple-500 dark:bg-purple-800"
          headlineStyle="text-purple-200"
          timeCardStyle="text-white"
          list={trendingPosts}
        />
        <LatestPosts postList={latestPosts} />
        <AsidePosts
          asideStyle="max-lg:order-3 bg-purple-100"
          headerStyle="text-purple-500"
          headerTitle="Coleções"
          cardStyle="bg-emerald-300 dark:bg-emerald-600"
          headlineStyle="text-purple-600 dark:text-white"
          list={collectionPosts}
        />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const latestPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
    take: 5,
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  const trendingPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    take: 5,
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  const collectionPosts = await prisma.post.findMany({
    where: { published: true, collection: true },
    orderBy: { date: "desc" },
    take: 5,
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { latestPosts, collectionPosts, trendingPosts },
    revalidate: 10,
  };
};
