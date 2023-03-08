import DefaultLayout from "@/components/layouts/DefaultLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import type { NextPageWithLayout } from "./_app";

const schema = z.object({
  description: z.string().min(10).max(160),
});
type Inputs = z.infer<typeof schema>;

const Home: NextPageWithLayout = () => {
  // react-hook-form
  const { register, handleSubmit, formState } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Meta Tags Generator</title>
      </Head>
      <main className="container mt-32 mb-16 flex flex-col items-center justify-center gap-14">
        <div className="grid max-w-2xl place-items-center gap-5">
          <h1 className="text-center text-3xl font-bold leading-tight text-gray-50 sm:text-5xl sm:leading-tight">
            Generate Meta Tags for your website with AI
          </h1>
          <p className="text-center text-lg text-gray-400 sm:text-xl">
            Simply describe your website and get the SEO optimized meta tags for
            your website in seconds
          </p>
        </div>
        <form
          aria-label="generate shows from"
          className="grid w-full max-w-xl gap-7"
          onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
          autoComplete="off"
        >
          <fieldset className="grid gap-3">
            <label
              htmlFor="description"
              className="text-sm font-medium text-white sm:text-base"
            >
              Describe your website
            </label>
            <textarea
              id="show"
              className="w-full rounded-md border-gray-400 bg-transparent px-4 pt-2.5 pb-10 text-base text-gray-50 transition-colors placeholder:text-gray-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 sm:pb-6"
              placeholder="e.g. A website for a restaurant in New York City. The restaurant serves Italian food from 11am to 10pm every day"
              {...register("description")}
            />
            {formState.errors.description ? (
              <p className="text-sm font-medium text-red-500">
                {formState.errors.description.message}
              </p>
            ) : null}
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default Home;

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
