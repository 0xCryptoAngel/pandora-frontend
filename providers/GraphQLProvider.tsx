// import { createHttpLink } from '@apollo/client/link/http'
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Observable, getMainDefinition } from "@apollo/client/utilities";
import {
  ApolloClient,
  ApolloProvider,
  GraphQLRequest,
  FetchResult,
  InMemoryCache,
  ApolloLink,
  split,
  HttpLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { createUploadLink } from "apollo-upload-client";
import { GraphQLError } from "graphql";

import React, { useMemo } from "react";
import { AUTH_REFRESH_TOKEN, AUTH_TOKEN } from "../constants";
import { REFRESH_AUTH_TOKEN } from "../gql/auth";

const cache = new InMemoryCache();

export const GraphQLProvider: React.FC<{
  children: React.ReactNode;
  // eslint-disable-next-line react/display-name
}> = React.memo(({ children }) => {
  const isRefreshRequest = (operation: GraphQLRequest) => {
    return operation.operationName === "refreshAuthToken";
  };

  const returnTokenDependingOnOperation = (operation: GraphQLRequest) => {
    if (isRefreshRequest(operation))
      return localStorage.getItem(AUTH_REFRESH_TOKEN) || "";
    else return localStorage.getItem(AUTH_TOKEN) || "";
  };

  const authLink = setContext((operation, { headers }) => {
    const token = returnTokenDependingOnOperation(operation);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.extensions.code) {
            case "UNAUTHENTICATED":
              // ignore 401 error for a refresh request
              if (
                operation.operationName === "refreshAuthToken" ||
                operation.operationName === "login" ||
                operation.operationName === "artistLogin"
              )
                return;

              const observable = new Observable<
                FetchResult<Record<string, any>>
              >((observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const accessToken = await refreshAuthToken();

                    if (!accessToken) {
                      throw new GraphQLError("Empty AccessToken");
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
              });

              return observable;
          }
        }
      }

      if (networkError) {
        console.log("networkError", networkError);
        console.log(`[Network error]: ${networkError}`);
      }
    }
  );

  const refreshAuthToken = async () => {
    try {
      const refreshResolverResponse = await client.mutate({
        mutation: REFRESH_AUTH_TOKEN,
      });
      const accessToken =
        refreshResolverResponse.data?.refreshAuthToken.authToken.token;
      const refreshToken =
        refreshResolverResponse.data?.refreshAuthToken.refreshToken.token;
      localStorage.setItem(AUTH_TOKEN, accessToken || "");
      localStorage.setItem(AUTH_REFRESH_TOKEN, refreshToken || "");
      return accessToken;
    } catch (err) {
      localStorage.clear();
      throw err;
    }
  };

  // const httpLink = useMemo(
  //   () =>
  //     createHttpLink({
  //       uri: process.env.REACT_APP_GRAPQLENDPOINT,
  //     }),
  //   []
  // );

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_END_POINT,
  });

  const uploadLink = useMemo(
    () =>
      createUploadLink({
        uri: process.env.NEXT_PUBLIC_END_POINT,
      }),
    []
  );

  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            // TODO process.env.NEXT_PUBLIC_END_POINT should be validated
            url: process.env.NEXT_PUBLIC_END_POINT!.replace(
              /^http(s?)/,
              "ws$1"
            ),
          })
        )
      : null;

  const splitLink =
    typeof window !== "undefined" && wsLink !== null
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          wsLink,
          uploadLink
        )
      : httpLink;

  const client = useMemo(() => {
    return new ApolloClient({
      link: ApolloLink.from([errorLink, authLink, splitLink]),
      cache,
    });
  }, [errorLink, authLink, splitLink]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
});
