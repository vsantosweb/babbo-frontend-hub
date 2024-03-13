import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Theme } from '@/themes/default';
import 'swiper/css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Welcome to apps/client!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </Theme>
  );
}

export default CustomApp;
