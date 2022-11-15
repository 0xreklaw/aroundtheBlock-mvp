import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css'

import EventState from "../context/event/EventState";

import * as ga from "../lib/ga";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function AroundtheBlock({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url, document.title);
    }
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

  return <>
    <Head>
      <title>Around the Block</title>
      <meta name="description" content="Discover blockchain events near you, meet new people, and enhance your experience." />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="Social Title for Cool Page" />
      <meta
        property="og:description"
        content="Enhance your blockchain experience"
      />
      <meta
        property="og:image"
        content="<%= require('../assets/logo_light.svg)%>"
      />
    </Head>

    <Script
      strategy="afterInteractive"
      async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
    />

    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname
          });`
      }}
    />

      <EventState>
          <Component {...pageProps} />
      </EventState>
  </>
}

export default AroundtheBlock
