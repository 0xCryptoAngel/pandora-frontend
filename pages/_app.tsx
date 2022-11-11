import '../styles/globals.css'
import React from 'react';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import ThemeConfig from '../theme';
import { SessionProvider } from 'next-auth/react';
import { GraphQLProvider } from '../providers/GraphQLProvider';

type AppPropsWithLayout = AppProps & {
  Component: any;
  pageProps: {
    session: Session;
    pagePros: any;
  }
}

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {

  const Layout = Component.layout ?? (( { children } : any) => <>{children}</>);
  return (
    <SessionProvider session={session}>
      <GraphQLProvider>
        <ThemeConfig>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeConfig>
      </GraphQLProvider>
    </SessionProvider>
  )
}
