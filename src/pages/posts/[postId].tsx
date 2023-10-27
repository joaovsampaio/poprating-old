import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import DOMPurify from "isomorphic-dompurify";
import prisma from "@/backend/prisma";
import { Post, User } from "@prisma/client";
import { switchCategoryColor } from "@/utils/switchCategoryColor";
import { classNames } from "@/utils/reusingClass";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import Layout from "@/components/layout/Layout";
import { StarPost } from "@/components/ui/StarRating";
import Dialog from "@/components/ui/AlertDialog";

const montserrat_400 = Montserrat({ subsets: ["latin"], weight: "400" });
const montserrat_700 = Montserrat({ subsets: ["latin"], weight: "700" });

type Props = Post & {
  author: User;
};

function Post(post: Props) {
  const route = useRouter();
  const { data: session } = useSession();
  const postBelongsToUser = session?.user?.email === post.author?.email;

  const [categoryColor, setCategoryColor] = useState("");
  useEffect(() => {
    const categoryBgColor = switchCategoryColor(post.category);

    setCategoryColor(categoryBgColor);
  }, [post.category]);

  const deletePost = async (id: string): Promise<void> => {
    await fetch(`/api/${id}`, {
      method: "DELETE",
    });
    route.push("/");
  };

  const editPost = async (): Promise<void> => {
    route.push(`/form/${post.id}`);
  };

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(post.content),
  });

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="flex flex-col items-center my-10">
        <div className="flex flex-col gap-5 w-6/12 max-lg:w-[90%] dark:text-slate-300">
          <h1 className="text-3xl uppercase" style={montserrat_700.style}>
            {post.title}
          </h1>
          <span
            className={classNames(
              "text-white font-bold py-1 px-3 w-fit border rounded-md",
              categoryColor
            )}
          >
            {post.category}
          </span>
          <div className="flex justify-between">
            <span className="text-slate-400 dark:text-slate-700 ">
              Escrito por:
              <span className="text-emerald-600 dark:text-emerald-500 ml-2">
                {post.author.name}
              </span>
            </span>
            {!postBelongsToUser && (
              <div className="flex gap-2">
                <Dialog action={() => deletePost(post.id)}>
                  <button title="Exluir">
                    <TrashIcon
                      aria-hidden={true}
                      className="text-red-600 hover:bg-red-300 w-6 h-6 rounded-full"
                    />
                  </button>
                </Dialog>
                <button title="Editar" onClick={() => editPost()}>
                  <PencilIcon
                    aria-hidden={true}
                    className="text-purple-600 hover:bg-purple-300 w-6 h-6 rounded-full"
                  />
                </button>
              </div>
            )}
          </div>
          <time className="opacity-40 dark:text-white">{post.date}</time>
          <Image
            className="rounded-lg self-center"
            alt="Imagem de capa"
            width={750}
            height={0}
            src={post.cover}
            priority
            sizes="(max-width: 768px) 100vw,
              (min-width: 1200px) 50vw,
              33vw"
          />
          <span className="text-slate-400">
            Fonte:
            <a className="text-blue-500 ml-2" href={post.cover}>
              Imagem
            </a>
          </span>
          <div
            className="flex flex-col items-center gap-5 mt-5 text-lg"
            style={montserrat_400.style}
            dangerouslySetInnerHTML={sanitizedData()}
          ></div>
          <div className="flex justify-between items-center">
            <span
              className="flex gap-2 text-emerald-500 text-lg font-bold"
              style={{
                display: post.collection === true ? "none" : "inline",
              }}
            >
              Avalição:
              <StarPost getRating={post.rating} />
            </span>
            <span className="text-white bg-emerald-600 font-bold py-1 px-3 w-fit border rounded-md">
              views: {Intl.NumberFormat("pt-BR").format(post.views)}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post: any = await prisma.post.findUnique({
    where: {
      id: String(params?.postId),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  await prisma.post.update({
    where: {
      id: String(params?.postId),
    },
    data: {
      views: { increment: 1 },
    },
  });

  return {
    props: post,
  };
};

export default Post;
