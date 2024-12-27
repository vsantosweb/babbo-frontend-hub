import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Theme } from '@/themes/default';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import moment from 'moment';
import 'moment/locale/pt-br'; // without this line it didn't work
import { AlertProvider, AuthProvider, EventProvider, OrganizerProvider } from '@/hooks';
import AppProvider from '@/hooks/useApp';
moment.defineLocale('pt-BR', null);

SwiperCore.use([Navigation, Pagination]);

function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <AppProvider appName='organizer'>
        <AuthProvider middleware='auth:manager' config={{ loginRoute: '/account/login', startPage: '/' }}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Babbo</title>
          </Head>
          <AlertProvider>
            <OrganizerProvider>
              <EventProvider>
                <main className="app">
                  <Component {...pageProps} />
                </main>
              </EventProvider>
            </OrganizerProvider>
          </AlertProvider>
        </AuthProvider>
      </AppProvider>
    </Theme>
  );
}

export default App;
