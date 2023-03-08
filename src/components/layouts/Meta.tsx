import Head from "next/head";

type MetaProps = {
  siteName?: string;
  title?: string;
  description?: string;
  image?: string;
};

const Meta = ({
  siteName = "Meta Tags Generator",
  title = "Meta Tags Generator",
  description = "Generate meta tags for your website with AI",
  image = "https://metatagz.vercel.app/api/og?title=Meta%20Tags%20Generator&description=Generate%20meta%20tags%20for%20your%20website%20with%20AI",
}: MetaProps) => {
  return (
    <Head>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
