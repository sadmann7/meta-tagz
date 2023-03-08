import { Icons } from "@/components/Icons";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Button from "@/components/ui/Button";
import SwitchButton from "@/components/ui/SwitchButton";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import type { NextPageWithLayout } from "./_app";

const schema = z.object({
  description: z.string().min(1).max(280),
  additional: z.object({
    robotIndex: z.boolean().optional(),
    robotFollow: z.boolean().optional(),
  }),
});
type Inputs = z.infer<typeof schema>;

const Home: NextPageWithLayout = () => {
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
          <fieldset className="grid gap-4">
            <label
              htmlFor="description"
              className="flex items-center gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
            >
              <span
                className={twMerge(
                  "grid h-6 w-6 place-items-center rounded-full text-xs text-white ring-1 sm:text-sm",
                  "transition-colors duration-200 ease-in-out",
                  watch("description")
                    ? "bg-violet-500 ring-violet-500"
                    : "bg-transparent ring-slate-200"
                )}
              >
                {watch("description") ? (
                  <Icons.check aria-hidden="true" className="h-5 w-5" />
                ) : (
                  1
                )}
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
              <p className="text-sm font-medium text-red-500">
                {formState.errors.description.message}
              </p>
            ) : null}
          </fieldset>
          <fieldset className="grid gap-5">
            <label
              htmlFor="robots"
              className="flex items-center gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
            >
              <span
                className={twMerge(
                  "grid h-6 w-6 place-items-center rounded-full text-xs text-white ring-1 sm:text-sm",
                  "transition-colors duration-200 ease-in-out",
                  watch("additional.robotIndex")
                    ? "bg-violet-500 ring-violet-500"
                    : "bg-transparent ring-slate-200"
                )}
              >
                {watch("additional.robotIndex") === true &&
                watch("additional.robotFollow") === true ? (
                  <Icons.check aria-hidden="true" className="h-5 w-5" />
                ) : (
                  2
                )}
              </span>
              Add additional parameters
            </label>
            <div className="grid gap-4">
              <SwitchButton
                control={control}
                name="additional.robotIndex"
                label="Allow robots to index your website"
              />
              <SwitchButton
                control={control}
                name="additional.robotFollow"
                label="Allow robots to follow all links on your website"
              />
            </div>
            {formState.errors.additional ? (
              <p className="text-sm font-medium text-red-500">
                {formState.errors.additional.message}
              </p>
            ) : null}
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
