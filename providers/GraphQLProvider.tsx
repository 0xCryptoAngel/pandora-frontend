import React from "react";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
} from "@apollo/client";
import { useSession } from "next-auth/react";

export const GraphQLProvider: React.FC<{
  children: React.ReactNode;
}> = React.memo(({ children }) => {
  const { data: session }: any = useSession();
  const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_END_POINT });
  const authLink = setContext((_, { headers }) => {
    const token = session?.user?.accessToken;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
    }

    if (networkError) {
      // handle network error
      console.log(networkError);
    }
  });

  const appLink = from([errorLink, authLink.concat(httpLink)]);
  const client = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
});
