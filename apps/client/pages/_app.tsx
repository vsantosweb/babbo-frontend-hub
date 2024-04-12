import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Theme } from '@/themes/default';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-day-picker/src/style.css';

import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import container from '@/container';

import moment from 'moment';
import 'moment/locale/pt-br'; // without this line it didn't work
import { useEffect } from 'react';
import { PublicRepositoryInterface } from '@/interfaces';
import { CookiePolicy } from '@/components';
moment.defineLocale('pt-BR', null);

SwiperCore.use([Navigation, Pagination]);

const publicService = container.get<PublicRepositoryInterface>('public');

function App({ Component, pageProps }: AppProps) {

  
  useEffect(() => {

    const userIdentifier = localStorage.getItem('user_identifier');

    if(!userIdentifier){

      publicService.userIdentifier().then(response => localStorage.setItem('user_identifier', response.user_identifier))

    }

  }, [])

  return (
    <Theme>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-8530046753205274" />
        <title>Babbo</title>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8530046753205274"
          crossOrigin="anonymous"
        ></script>
          <script src="https://www.google.com/recaptcha/enterprise.js?render=6Lea77gpAAAAAFEWb0e-B2iY6X5VYMSBBwZZtQcS"></script>

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA5aHbpVrnwcd0Gr0Z9dq_GK8Mm-3cR1E"></script>
      </Head>
      <main className="app">
        <Component {...pageProps} />
        <CookiePolicy />
      </main>
    </Theme>
  );
}

export default App;
