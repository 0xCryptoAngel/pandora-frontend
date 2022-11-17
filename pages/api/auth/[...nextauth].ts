import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { useMutation, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const GOOGLE_CLIENT_ID: string = process.env.NEXT_PUBLIC_GOOGLE_ID ?? ""
const GOOGLE_CLIENT_SECRET: string = process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? ""

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_END_POINT })
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
    errorLink, httpLink
])

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: appLink
})

const loginMutation: any = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            authToken {
                expiresAt
                token
            }
            refreshToken {
                expiresAt
                token
            }
        }
    }
`

const refreshMutation: any = gql`
    mutation {
        refreshAuthToken {
            authToken {
                expiresAt
                token
            }
            refreshToken {
                expiresAt
                token
            }
        }
    }
`

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
        newUser: "/register",
        error: "/login"
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                },
                password: {
                    label: 'password',
                    type: 'password'
                }
            },
            authorize: async (credentials, req) => {
                const payload = {
                    email: credentials?.email ?? "",
                    password: credentials?.password ?? "",
                }
                const {data} = await client.mutate({
                    mutation: loginMutation,
                    variables: payload
                })

                return data?.login ?? null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user?.authToken?.token,
                    refreshToken: user?.refreshToken?.token
                };
                
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user.accessToken = token?.accessToken
            session.user.refreshToken = token?.refreshToken
            return session
            
        }
    }
}

export default NextAuth(authOptions);