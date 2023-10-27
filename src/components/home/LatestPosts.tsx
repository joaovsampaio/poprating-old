import { Fredoka_One } from "next/font/google";
import Link from "next/link";

import Card from "../ui/Card";
import { Post } from "@prisma/client";

const fredoka_One = Fredoka_One({ subsets: ["latin"], weight: "400" });

function LatestPosts({ postList }: any) {
  return (
    <div className="flex flex-col items-center max-lg:order-1 w-2/4 max-md:w-full">
      <h2 className="text-emerald-500 text-4xl my-5 " style={fredoka_One.style}>
        <Link href="posts/reviews">Últimas Críticas</Link>
      </h2>

      {postList.map((item: Post) => (
        <Card
          key={item.id}
          link={item.id}
          title={item.title}
          cover={item.cover}
          category={item.category}
          date={item.date}
          cardStyle="bg-purple-200 dark:bg-purple-900"
          headlineStyle="text-purple-900 dark:text-purple-500"
        />
      ))}

      <Link
        className="bg-emerald-500 text-white shadow shadow-slate-300 px-10 mb-4 rounded-full text-2xl uppercase font-light"
        href="posts/reviews"
      >
        Mais
      </Link>
    </div>
  );
}

export default LatestPosts;
