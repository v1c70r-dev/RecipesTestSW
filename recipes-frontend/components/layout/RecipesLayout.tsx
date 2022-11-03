import { FC, useContext } from "react";
import Head from "next/head";
import { Navbar } from '../ui';


interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: React.ReactNode;
}

export const RecipesLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      <main
        // style={{
        //   margin: "70px auto",
        //   marginLeft: isMenuOpen ? "250px" : 0,
        //   transition: "all 0.3s ease-in-out"
        // }}
      >
        {children}
      </main>
    </>
  );
};
