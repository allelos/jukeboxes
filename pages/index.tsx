import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Inter } from "@next/font/google";
import logoStyles from "@styles/logo.module.css"

const inter = Inter({ subsets: ["latin"] });

const Player = dynamic(() => import("@components/layout"), { ssr: false });

const Home = () => {
  return (
    <>
      <Head>
        <title>jukeboxes.gr</title>
        <meta name="description" content="E-Radio for Greek radio stations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="/jukeboxes.png"
        alt="Jukeboxes Logo"
        width={128}
        height={32}
        priority
        className={logoStyles.container}
      />
      <main className={inter.className}>
        <Player />
      </main>
    </>
  );
}

export default Home
