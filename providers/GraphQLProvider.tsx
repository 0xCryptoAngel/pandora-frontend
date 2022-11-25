import React from "react";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Observable } from '@apollo/client/utilities';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  GraphQLRequest,
  FetchResult,
  from,
  HttpLink,
} from "@apollo/client";
import { GraphQLError } from 'graphql';
import { signOut, useSession } from "next-auth/react";
import { REFRESH_AUTH_TOKEN } from "../gql/auth";
import { AUTH_REFRESH_TOKEN, AUTH_TOKEN } from "../constants";

export const GraphQLProvider: React.FC<{
  children: React.ReactNode;
// eslint-disable-next-line react/display-name
}> = React.memo(({ children }) => {
  const { data: session }: any = useSession();
  const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_END_POINT });
  const isRefreshRequest = (operation: GraphQLRequest) => {
    return operation.operationName === 'refreshAuthToken';
  };
  const returnTokenDependingOnOperation = (operation: GraphQLRequest) => {
    if (isRefreshRequest(operation))
      return localStorage.getItem(AUTH_REFRESH_TOKEN) || '';
    else return localStorage.getItem(AUTH_TOKEN) || '';
  }
  const authLink = setContext((operation, { headers }) => {
    const token = returnTokenDependingOnOperation(operation);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            // ignore 401 error for a refresh request
            if (!session) {
              return;
            }
      
            if (operation.operationName === 'refreshAuthToken' || 
              operation.operationName === 'login'
            ) return;

            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const accessToken = await refreshAuthToken();

                    if (!accessToken) {
                      throw new GraphQLError('Empty AccessToken');
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              }
            );

            return observable;
        }
      }
    }

    if (networkError) {
      // handle network error
      console.log(networkError);
    }
  });

  const refreshAuthToken = async () => {
    try {
      const refreshResolverResponse = await client.mutate({
        mutation: REFRESH_AUTH_TOKEN,
      });
      const accessToken = refreshResolverResponse.data?.refreshAuthToken.authToken.token;
      const refreshToken = refreshResolverResponse.data?.refreshAuthToken.refreshToken.token;
      localStorage.setItem(AUTH_TOKEN, accessToken);
      localStorage.setItem(AUTH_REFRESH_TOKEN, refreshToken);
      return accessToken;
    } catch (err) {
      localStorage.clear();
      signOut();
      throw err;
    }
  };

  const appLink = from([errorLink, authLink.concat(httpLink)]);
  const client = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
});
