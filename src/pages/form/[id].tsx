import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import prisma from "@/backend/prisma";

import Layout from "@/components/layout/Layout";
import { StarRating } from "@/components/ui/StarRating";
import SelectCategory from "@/components/ui/Select";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Login from "@/components/ui/Login";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Post } from "@prisma/client";
import CustomToast from "@/components/ui/Toast";
import { useRouter } from "next/router";

const Editor = dynamic(() => import("@/components/ui/Editor"), {
  ssr: false,
});

const schema = z.object({
  title: z.string().min(1, { message: "Esse Campo Deve Ser Preenchido" }),
  cover: z
    .string()
    .url({ message: "URL Inválida" })
    .min(1, { message: "Esse Campo Deve Ser Preenchido" }),
  category: z.string({ required_error: "É Necessário Escolher Uma Categoria" }),
  collection: z.boolean().default(false),
  content: z.string().min(1, { message: "Esse Campo Deve Ser Preenchido" }),
  rating: z.number(),
  published: z.boolean().default(false),
  date: z.string().default(
    Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date())
  ),
});
type FormData = z.infer<typeof schema>;

function PostArticle(post: Post) {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { data: session } = useSession();

  const [openToast, setOpenToast] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const editorRef = useRef(null);

  useEffect(() => clearErrors("category"), [watch("category")]);
  const route = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      await fetch(`/api/${post.id}`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      setIsLoading(false);
      setOpenToast(true);
      setError(false);
      route.push(`/posts/${post.id}`);
    } catch (e) {
      setIsLoading(false);
      setOpenToast(true);
      setError(true);
    }
  };

  useEffect(() => {
    setValue("title", post.title);
    setValue("cover", post.cover);
    setValue("category", post.category);
    setValue("content", post.content);
    setValue("collection", post.collection);
    setValue("rating", post.rating);
    setValue("published", post.published);
  }, []);

  if (!session) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center gap-10 h-screen">
          <p className="text-slate-100 text-lg text-center font-medium">
            É necessário uma conta para postar uma crítica
          </p>
          <div className="bg-purple-500 text-slate-100 text-2xl font-light py-1 px-2 rounded-md">
            <Login />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="text-emerald-500 text-3xl my-10 uppercase">
          Editar Artigo
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full"
        >
          <div className="flex flex-col w-2/4 max-lg:w-11/12">
            <label className="text-emerald-500 mb-1 text-2xl" htmlFor="title">
              Insira um título
            </label>
            <input
              {...register("title")}
              id="title"
              placeholder="título"
              className="border-emerald-200 rounded-sm border p-1 mt-2 text-2xl"
            />
            {errors.title?.message && (
              <span className="text-red-500">{errors.title?.message}</span>
            )}

            <label
              className="text-emerald-500 mt-5 mb-1 text-2xl"
              htmlFor="cover"
            >
              Capa da matéria
            </label>
            <input
              {...register("cover")}
              id="cover"
              placeholder="url"
              className="border-emerald-200 rounded-sm border p-1 mt-2 text-2xl"
            />
            {errors.cover?.message && (
              <span className="text-red-500">{errors.cover?.message}</span>
            )}

            <div className="flex flex-col w-fit">
              <label className="text-emerald-500 mt-5 mb-1 text-2xl">
                Selecione Uma Categoria
              </label>

              <SelectCategory
                setSelectCategory={(category: string) =>
                  setValue("category", category)
                }
              />

              {errors.category?.message && (
                <span className="text-red-500">{errors.category?.message}</span>
              )}
            </div>

            <label
              htmlFor="content"
              className="text-emerald-500 mt-5 mb-1 text-2xl"
            >
              {watch("collection") === true ? "Matéria" : "Crítica"}
            </label>
            <Editor
              onChange={(_, editor) => setValue("content", editor.getContent())}
              initialValue={post.content}
              editorRef={editorRef}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "checklist",
                  "lists",
                  "link",
                  "image",
                  "preview",
                  "searchreplace",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "help",
                  "code",
                ],
                toolbar:
                  "undo redo | casechange blocks | bold italic backcolor | fullscreen preview|" +
                  "alignleft aligncenter alignright alignjustify| " +
                  "link media image | " +
                  "bullist numlist checklist outdent indent | removeformat | searchreplace code help",
              }}
            />
            {errors.content?.message && (
              <span className="text-red-500">{errors.content?.message}</span>
            )}

            <fieldset className="flex flex-col mt-5 gap-1">
              <legend className="text-emerald-500 text-2xl mb-2">
                Coleção
              </legend>

              <div>
                <input
                  onClick={() => setValue("collection", false)}
                  value="no"
                  id="no"
                  type="radio"
                  name="collection"
                  className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  defaultChecked={!post.collection && true}
                />
                <label
                  htmlFor="no"
                  className="dark:text-white text-base font-medium ml-2"
                >
                  Não
                </label>
              </div>
              <div>
                <input
                  onClick={() => setValue("collection", true)}
                  value="yes"
                  id="yes"
                  type="radio"
                  name="collection"
                  className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  defaultChecked={post.collection && true}
                />
                <label
                  htmlFor="yes"
                  className="dark:text-white text-base font-medium ml-2"
                >
                  Sim
                </label>
              </div>
            </fieldset>

            <div
              className="flex flex-col gap-2 my-3"
              style={{
                display: watch("collection") === true ? "none" : "block",
              }}
            >
              <label className="text-emerald-500 text-2xl">
                Escolha uma nota
              </label>
              <StarRating
                postRating={post.rating}
                setStarRating={(rating: number) => setValue("rating", rating)}
              />
            </div>

            <fieldset className="flex flex-col mt-5 gap-1">
              <legend className="text-emerald-500 text-2xl mb-2">
                Publicar agora?
              </legend>

              <div>
                <input
                  onClick={() => setValue("published", false)}
                  value="no"
                  id="no"
                  type="radio"
                  name="published"
                  className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  defaultChecked={!post.published && true}
                />
                <label
                  htmlFor="no"
                  className="dark:text-white text-base font-medium ml-2"
                >
                  Não
                </label>
              </div>
              <div>
                <input
                  onClick={() => setValue("published", true)}
                  value="yes"
                  id="yes"
                  type="radio"
                  name="published"
                  className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  defaultChecked={post.published && true}
                />
                <label
                  htmlFor="yes"
                  className="dark:text-white text-base font-medium ml-2"
                >
                  Sim
                </label>
              </div>
            </fieldset>

            <button
              className="bg-emerald-400 hover:bg-emerald-500 text-white text-lg flex justify-center self-center w-1/3 py-1 rounded-lg"
              type="submit"
            >
              {isloading ? <LoadingSpinner /> : "Publicar"}
            </button>

            <CustomToast
              title={getValues().title}
              description="Atualizado"
              open={openToast}
              setOpen={setOpenToast}
              error={error}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post: any = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
  });

  return {
    props: post,
  };
};

export default PostArticle;
