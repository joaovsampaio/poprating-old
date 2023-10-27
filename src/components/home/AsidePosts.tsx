import { Fredoka_One } from "next/font/google";
import { Post } from "@prisma/client";
import { classNames } from "@/utils/reusingClass";

import Card from "../ui/Card";

const fredoka_One = Fredoka_One({ subsets: ["latin"], weight: "400" });

type Props = {
  asideStyle: string;
  headerTitle: string;
  headerStyle: string;
  cardStyle: string;
  headlineStyle: string;
  timeCardStyle?: string;
  list: Post[];
};

function AsidePosts({
  asideStyle,
  headerTitle,
  headerStyle,
  cardStyle,
  headlineStyle,
  timeCardStyle,
  list,
}: Props) {
  return (
    <aside
      className={classNames(
        "flex flex-col items-center dark:bg-transparent w-1/5 h-fit max-lg:w-full",
        asideStyle
      )}
    >
      <h2
        className={classNames("text-2xl my-5", headerStyle)}
        style={fredoka_One.style}
      >
        {headerTitle}
      </h2>

      {list.map((item) => (
        <Card
          key={item.id}
          link={item.id}
          title={item.title}
          cover={item.cover}
          category={item.category}
          date={item.date}
          smallCard
          cardStyle={cardStyle}
          headlineStyle={headlineStyle}
          timeStyle={timeCardStyle}
        />
      ))}
    </aside>
  );
}

export default AsidePosts;
