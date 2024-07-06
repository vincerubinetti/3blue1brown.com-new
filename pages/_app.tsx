import type { AppProps } from "next/app";
import { IBM_Plex_Mono, Lora, Poppins } from "next/font/google";
import Head from "next/head";
import "@/pages/theme.css";
import "@/pages/global.css";

const sans = Poppins({ subsets: ["latin"], weight: ["300", "500"] });
const serif = Lora({ subsets: ["latin"], weight: ["400", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300", "500"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>3Blue1Brown</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>
        {`
          html {
            --sans: ${sans.style.fontFamily};
            --serif: ${serif.style.fontFamily};
            --mono: ${mono.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
