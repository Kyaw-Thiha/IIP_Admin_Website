import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";
import { Toaster } from "@/components/ui/toaster";

import "@/styles/globals.css";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>IIP International School</title>
        <link rel="icon" href="./favicon.svg" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
