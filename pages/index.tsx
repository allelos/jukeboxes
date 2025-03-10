import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Rubik } from "@next/font/google";
import logoStyles from "@styles/logo.module.css";
import { eq } from "drizzle-orm";
import { genre, station } from "@db/schema";
import { db } from "@lib/drizzle";

const rubik = Rubik({ subsets: ["latin"] });

const Player = dynamic(() => import("@components/layout"), { ssr: false });

const Home = ({ sources = [], sourcesById = {} }) => {
  return (
    <>
      <Head>
        <title>jukeboxes.gr</title>
        <meta name="description" content="E-Radio for Greek radio stations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://jukeboxes.gr" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="jukeboxes.gr" />
        <meta
          property="og:description"
          content="E-Radio for Greek radio stations"
        />
        <meta property="og:image" content="/cover.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="jukeboxes.gr" />
        <meta property="twitter:url" content="https://jukeboxes.gr" />
        <meta name="twitter:title" content="jukeboxes.gr" />
        <meta
          name="twitter:description"
          content="E-Radio for Greek radio stations"
        />
        <meta name="twitter:image" content="/cover.png" />
      </Head>
      <Image
        src="/jukeboxes.png"
        alt="Jukeboxes Logo"
        width={128}
        height={32}
        priority
        className={logoStyles.container}
      />
      <main className={rubik.className}>
        <Player sources={sources} sourcesById={sourcesById} />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const stations = await db
      .select()
      .from(station)
      .leftJoin(genre, eq(genre.id, station.genreId));

    const sourcesById = stations.reduce((acc, { station, genre }) => {
      return {
        ...acc,
        [station.id]: { ...station, genre: genre?.name },
      };
    }, {});

    const sources = stations.map(({ station }) => ({
      id: station.id,
      name: station.name,
    }));

    return { props: { sources, sourcesById }, revalidate: 60 };
  } catch (e) {
    return { props: { sources: [], sourcesById: {} }, revalidate: 60 };
  }
};
