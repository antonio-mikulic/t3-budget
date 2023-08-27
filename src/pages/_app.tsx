// src/pages/_app.tsx
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import { api } from '~/utils/api';
import ContentContainer from '../components/theme/ContentContainer';
import '../styles/globals.css';

const MyApp: AppType<{ session: Session | null }>  = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <ContentContainer>
        <Component {...pageProps} />
      </ContentContainer>
    </SessionProvider>
  );
};


export default api.withTRPC(MyApp);