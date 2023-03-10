import CodeBlock from "@/components/CodeBlock";
import { Icons } from "@/components/Icons";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Button from "@/components/ui/Button";
import RadioInput from "@/components/ui/RadioInput";
import SearchableSelect from "@/components/ui/SearchableSelect";
import SwitchButton from "@/components/ui/SwitchButton";
import { useAppContext } from "@/contexts/AppProvider";
import languagesJson from "@/data/languages.json";
import { tagVariants, tagVariantSchema } from "@/types/globals";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import type { NextPageWithLayout } from "./_app";

const schema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(280, { message: "Description is too long" }),
  language: z.string().default("English"),
  robotsIndex: z.boolean().default(false),
  robotsFollow: z.boolean().default(false),
  tagVariant: tagVariantSchema,
});
type Inputs = z.infer<typeof schema>;

const Home: NextPageWithLayout = () => {
  const languages = languagesJson.map((language) => language.name);

  const [isLoading, setIsLoading] = useState(false);
  const { metaTags, setMetaTags } = useAppContext();

  // react-hook-form
  const { register, handleSubmit, formState, control, reset } = useForm<Inputs>(
    {
      resolver: zodResolver(schema),
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setMetaTags("");
    setIsLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const responseData = response.body;
    if (!responseData) {
      return;
    }

    const reader = responseData.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setMetaTags((prev) => prev + chunkValue);
    }

    setIsLoading(false);
    reset();
  };

  return (
    <>
      <Head>
        <title>Meta Tags Generator</title>
      </Head>
      <main className="container mt-32 mb-16 flex flex-col items-center justify-center gap-14">
        {metaTags ? (
          <div className="grid w-full max-w-3xl place-items-center gap-10">
            <div className="mx-auto grid max-w-2xl place-items-center gap-5">
              <h1 className="text-center text-3xl font-bold leading-tight text-slate-50 sm:text-5xl sm:leading-tight">
                Here are your meta tags
              </h1>
              <p className="text-center text-lg text-slate-400 sm:text-xl">
                Copy and paste the following code into your {`website's`} HTML
                header. Make sure to replace the placeholder values with your
                own content and images.
              </p>
            </div>
            <Button
              aria-label="generate again"
              className="w-fit"
              onClick={() => {
                setMetaTags("");
                window.scrollTo(0, 0);
              }}
            >
              <Icons.refresh className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Generate again</span>
            </Button>
            <CodeBlock
              code={metaTags.replace("```", "").replace("```", "").trim() ?? ""}
              maxHeigth={1024}
            />
          </div>
        ) : (
          <Fragment>
            <div className="grid max-w-2xl place-items-center gap-5">
              <h1 className="text-center text-3xl font-bold leading-tight text-slate-50 sm:text-5xl sm:leading-tight">
                Generate Meta Tags for your website with AI
              </h1>
              <p className="text-center text-lg text-slate-400 sm:text-xl">
                Simply describe your website, and get the SEO optimized meta
                tags in seconds
              </p>
            </div>
            <form
              aria-label="generate shows from"
              className="grid w-full max-w-xl gap-7"
              onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
            >
              <fieldset className="grid gap-5">
                <label
                  htmlFor="description"
                  className="flex gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
                >
                  <span className="grid h-6 w-6  place-items-center rounded-full bg-violet-500 text-xs text-white sm:text-sm">
                    1
                  </span>
                  <span className="flex-1">
                    Describe your website{" "}
                    <span className="text-slate-400">
                      (inclue title and description for best results)
                    </span>
                  </span>
                </label>
                <textarea
                  id="show"
                  className="w-full rounded-md border-slate-400 bg-transparent px-4 pt-2.5 pb-10 text-base text-slate-50 transition-colors placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 sm:pb-6"
                  placeholder="e.g. A website for a restaurant named Amore Ristorante in New York City. The restaurant serves Italian food from 11am to 10pm every day"
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
                  className="flex gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500 text-xs text-white sm:text-sm">
                    2
                  </span>
                  <span className="flex-1">
                    Select your {`website's`} language
                  </span>
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
                  htmlFor="robots"
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500 text-xs text-white sm:text-sm">
                    3
                  </span>
                  <span className="flex-1">Control robots in your website</span>
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
              <fieldset className="grid gap-5">
                <label
                  htmlFor="tagVariant"
                  className="flex gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500 text-xs text-white sm:text-sm">
                    4
                  </span>
                  <span className="flex-1">
                    Select the type of meta tags you want to generate
                  </span>
                </label>
                <RadioInput
                  control={control}
                  name="tagVariant"
                  options={tagVariants}
                />
                {formState.errors.tagVariant ? (
                  <p className="-mt-1.5 text-sm font-medium text-red-500">
                    {formState.errors.tagVariant.message}
                  </p>
                ) : null}
              </fieldset>
              <Button
                aria-label="generate meta tags"
                className="w-full"
                isLoading={isLoading}
                loadingVariant="spinner"
                disabled={isLoading}
              >
                <Icons.logo className="mr-2 h-5 w-5" />
                <span>Generate meta tags</span>
              </Button>
            </form>
          </Fragment>
        )}
      </main>
    </>
  );
};

export default Home;

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
