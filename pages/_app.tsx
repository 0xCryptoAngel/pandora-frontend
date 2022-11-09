import '../styles/globals.css'
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ThemeConfig from '../theme';
import { SessionProvider } from 'next-auth/react';

type AppPropsWithLayout = AppProps & {
  Component: any;
}

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout<{ session: Session }>) {
  const client = new ApolloClient({
    uri: process.env.END_POINT ?? "http://localhost:3000/graphql/",
    cache: new InMemoryCache(),
  })
  const Layout = Component.layout ?? (( { children } : any) => <>{children}</>);
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <ThemeConfig>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeConfig>
      </ApolloProvider>
    </SessionProvider>
  )
}
