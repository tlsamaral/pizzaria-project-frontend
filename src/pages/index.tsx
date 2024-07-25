import Head from 'next/head';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js + Tailwind CSS</title>
      </Head>
      <h1>Hello world</h1>
    </>
  );
}
