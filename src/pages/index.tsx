import DefaultLayout from "@/components/layouts/DefaultLayout";
import Head from "next/head";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Meta Tags Generator</title>
      </Head>
      <main className="container mt-32 mb-16 flex flex-col items-center justify-center gap-10">
        <div className="grid max-w-2xl place-items-center gap-5">
          <h1 className="text-center text-3xl font-bold leading-tight text-gray-50 sm:text-5xl sm:leading-tight">
            Generate Meta Tags for your website with AI
          </h1>
          <p className="text-center text-lg text-gray-400 sm:text-xl">
            Simply describe your website and get the SEO optimized meta tags for
            your website in seconds
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
