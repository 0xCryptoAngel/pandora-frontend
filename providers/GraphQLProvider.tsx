// import { createHttpLink } from '@apollo/client/link/http'
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error";
import { Observable } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache, ApolloProvider, from, HttpLink } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { GraphQLError } from 'graphql';

import React, { useMemo } from 'react'
// import { AUTH_REFRESH_TOKEN, AUTH_TOKEN } from '../constants'
// import { REFRESH_AUTH_TOKEN } from '../components/gql/mutations';

const cache = new InMemoryCache()

export const GraphQLProvider: React.FC<{
  children: React.ReactNode
}> = React.memo(
  ({ children }) => {
  const { data: session } :any = useSession();
    const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_END_POINT })
    const authLink = setContext((_, { headers }) => {
      const token = session?.user?.accessToken;
      console.log(token)
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}`: "",
        }
      }
    })
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            console.log(graphQLErrors);
        }
    
        if (networkError) {
            // handle network error
            console.log(networkError);
        }
    });
    
    const appLink = from([
        errorLink, authLink.concat(httpLink)
    ])
    const client = new ApolloClient({
      link: appLink,
      cache: new InMemoryCache(),
    })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
  },
)
