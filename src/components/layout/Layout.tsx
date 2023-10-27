import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  headerFixed?: boolean;
  children: ReactNode;
};

function Layout({ children, headerFixed }: Props) {
  return (
    <>
      <Head>
        <title>PopRating</title>
        <meta
          name="description"
          content="O PopRating é um blog de críticas sobre filmes, séries, livros e música"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex flex-col h-screen">
        <Header isFixed={headerFixed || false} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
