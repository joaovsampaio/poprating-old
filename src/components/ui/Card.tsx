import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fredoka_One } from "next/font/google";
import { switchCategoryColor } from "@/utils/switchCategoryColor";
import { classNames } from "@/utils/reusingClass";

const fredoka_One = Fredoka_One({ subsets: ["latin"], weight: "400" });

type Props = {
  smallCard?: boolean;
  cardStyle?: string;
  headlineStyle?: string;
  timeStyle?: string;

  link: string;
  title: string;
  cover: string;
  category: string;
  date: string;
};

function Card({ ...props }: Props) {
  const [categoryColor, setCategoryColor] = useState("");

  useEffect(() => {
    const categoryBgColor = switchCategoryColor(props.category);

    setCategoryColor(categoryBgColor);
  }, [props.category]);

  return (
    <article
      className={classNames(
        "flex w-full max-w-xl max-lg:max-w-[95%] shadow-md rounded-md mb-8 hover:opacity-80",
        props.cardStyle
      )}
    >
      <Link
        className="flex max-lg:flex-col w-full"
        href={`/posts/${props.link}`}
      >
        <div
          className={classNames(
            "relative w-[50%] max-lg:h-[250px] max-lg:w-full",
            props.smallCard && "hidden"
          )}
        >
          <Image
            className="rounded-tl-md rounded-bl-md max-lg:rounded-tr-md max-lg:rounded-bl-none"
            alt="Imagem de capa"
            aria-hidden={true}
            src={props.cover}
            fill
            priority
            sizes="(max-width: 768px) 100vw,
              (min-width: 1200px) 50vw,
              33vw"
          />
        </div>

        <div className="flex flex-col justify-around truncate w-full gap-2 p-2">
          <p
            className={classNames(
              "text-white text-sm font-bold py-1 px-3 w-fit border rounded-md",
              props.smallCard && "text-[0.800rem]",
              categoryColor
            )}
          >
            {props.category}
          </p>
          <h3
            className={classNames(
              "text-3xl truncate",
              props.smallCard && "text-lg",
              props.headlineStyle
            )}
            style={fredoka_One.style}
          >
            {props.title}
          </h3>

          <time
            className={classNames(
              "opacity-40 dark:text-white",
              props.timeStyle
            )}
          >
            {props.date}
          </time>
        </div>
      </Link>
    </article>
  );
}

export default Card;
