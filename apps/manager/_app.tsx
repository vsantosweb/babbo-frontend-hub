import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Theme } from '@/themes/default';
import { AuthProvider } from '@/hooks';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-day-picker/src/style.css';

import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import moment from 'moment';
import 'moment/locale/pt-br'; // without this line it didn't work
moment.locale('pt-BR');
SwiperCore.use([Navigation, Pagination]);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Head>
        <title>Welcome to manager!</title>
      </Head>
      <AuthProvider>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </Theme>
  );
}

