import { Icons } from "@/components/Icons";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Button from "@/components/ui/Button";
import SearchableSelect from "@/components/ui/SearchableSelect";
import SwitchButton from "@/components/ui/SwitchButton";
import languagesJson from "@/data/languages.json";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import type { NextPageWithLayout } from "./_app";

const schema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(280, { message: "Description is too long" }),
  language: z.string().default("English"),
  robotsIndex: z.boolean().optional(),
  robotsFollow: z.boolean().optional(),
});
type Inputs = z.infer<typeof schema>;

const Home: NextPageWithLayout = () => {
  const languages = languagesJson.map((language) => language.name);

  // react-hook-form
  const { register, handleSubmit, formState, control, watch } = useForm<Inputs>(
    {
      resolver: zodResolver(schema),
    }
  );
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
          <h1 className="text-center text-3xl font-bold leading-tight text-slate-50 sm:text-5xl sm:leading-tight">
            Generate Meta Tags for your website with AI
          </h1>
          <p className="text-center text-lg text-slate-400 sm:text-xl">
            Simply describe your website, and get the SEO optimized meta tags
            for your website in seconds
          </p>
        </div>
        <form
          aria-label="generate shows from"
          className="grid w-full max-w-xl gap-7"
          onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
          autoComplete="off"
        >
          <fieldset className="grid gap-5">
            <label
              htmlFor="description"
              className="flex items-center gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500 text-xs text-white sm:text-sm">
                1
              </span>
              Describe your website
            </label>
            <textarea
              id="show"
              className="w-full rounded-md border-slate-400 bg-transparent px-4 pt-2.5 pb-10 text-base text-slate-50 transition-colors placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 sm:pb-6"
              placeholder="e.g. A website for a restaurant in New York City. The restaurant serves Italian food from 11am to 10pm every day"
              {...register("description")}
            />
            {formState.errors.description ? (
              <p className="-mt-1.5 text-sm font-medium text-red-500">
                {formState.errors.description.message}
              </p>
            ) : null}
          </fieldset>
          <fieldset className="grid gap-5">
            <label
              htmlFor="language"
              className="flex items-center gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500 text-xs text-white sm:text-sm">
                2
              </span>
              Select your {`website's`} language
            </label>
            <SearchableSelect
              control={control}
              name="language"
              options={languages}
              placeholder="Search language..."
            />
            {formState.errors.language ? (
              <p className="-mt-1.5 text-sm font-medium text-red-500">
                {formState.errors.language.message}
              </p>
            ) : null}
          </fieldset>
          <fieldset className="grid gap-5">
            <label
              htmlFor="extras"
              className="flex items-center gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500 text-xs text-white sm:text-sm">
                3
              </span>
              Select additional parameters
            </label>
            <div className="grid gap-4">
              <fieldset className="grid gap-5">
                <label htmlFor="robotsIndex" className="sr-only">
                  Toggle robots to index your website
                </label>
                <SwitchButton
                  control={control}
                  name="robotsIndex"
                  label="Allow robots to index your website"
                />
                {formState.errors.robotsIndex ? (
                  <p className="-mt-1.5 text-sm font-medium text-red-500">
                    {formState.errors.robotsIndex.message}
                  </p>
                ) : null}
              </fieldset>
              <fieldset className="grid gap-5">
                <label htmlFor="robotsFollow" className="sr-only">
                  Toggle robots to follow all links on your website
                </label>
                <SwitchButton
                  control={control}
                  name="robotsFollow"
                  label="Allow robots to follow all links on your website"
                />
                {formState.errors.robotsFollow ? (
                  <p className="-mt-1.5 text-sm font-medium text-red-500">
                    {formState.errors.robotsFollow.message}
                  </p>
                ) : null}
              </fieldset>
            </div>
          </fieldset>
          <Button aria-label="generate meta tags" className="w-full">
            <Icons.logo className="mr-2 h-5 w-5" />
            Generate meta tags
          </Button>
        </form>
      </main>
    </>
  );
};

export default Home;

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
