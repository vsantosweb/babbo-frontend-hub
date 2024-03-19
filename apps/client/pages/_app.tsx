import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Theme } from '@/themes/default';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import moment from 'moment'
import 'moment/locale/pt-BR'  // without this line it didn't work
moment.locale('pt-BR')

SwiperCore.use([Navigation, Pagination]);


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Welcome to apps/client!</title>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8530046753205274"
     crossOrigin="anonymous"></script>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </Theme>
  );
}

export default CustomApp;
