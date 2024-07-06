import type { AppProps } from "next/app";
import { IBM_Plex_Mono, Lora, Poppins } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { startCase } from "lodash";
import "@/pages/theme.css";
import "@/pages/global.css";

const sans = Poppins({ subsets: ["latin"], weight: ["300", "500"] });
const serif = Lora({ subsets: ["latin"], weight: ["400", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300", "500"] });

const appTitle = "3Blue1Brown";

export default function App({ Component, pageProps }: AppProps) {
  const pageTitle = startCase(useRouter().pathname.split("/").pop());
  const title = [pageTitle, appTitle].filter(Boolean).join(" | ");

  return (
    <>
      <Head>
        <title>{title}</title>
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
