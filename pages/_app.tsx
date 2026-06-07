import "@portaljs/components/styles.css";
import "@/styles/globals.scss";
import "@/styles/tabs.scss";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";

import Loader from "../components/_shared/Loader";

import ThemeProvider from "../components/theme/theme-provider";
import QuerylessAssistant from "../components/queryless/QuerylessAssistant";

import { Inter, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/router";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const ROOT_FONT_CLASSES = [
  montserrat.variable,
  inter.variable,
  inter.className,
];

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? '';

const handleRouteChange = (url: string) => {
  (window as any).gtag?.("config", GA_TRACKING_ID, {
    page_path: url,
  });
};


function MyApp({ Component, pageProps }: AppProps) {
  const theme = pageProps.theme || "lighter";
  const router = useRouter();

  useEffect(() => {
    if (!GA_TRACKING_ID || GA_TRACKING_ID === '') return;
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(...ROOT_FONT_CLASSES);

    return () => {
      root.classList.remove(...ROOT_FONT_CLASSES);
    };
  }, []);

  return (
    <div
      id="app-shell"
      className={cn(...ROOT_FONT_CLASSES, "font-sans")}
    >
      <ThemeProvider themeName={theme}>
        <DefaultSeo {...SEO} />
        <Loader />
        <Component {...pageProps} />
        <QuerylessAssistant />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
