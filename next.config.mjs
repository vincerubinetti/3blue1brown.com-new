/** @type {import("next").NextConfig} */
import withMDX from "@next/mdx";

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["mdx", "ts", "tsx"],
};

export default withMDX()(nextConfig);
