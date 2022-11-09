import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from 'next-auth/providers';
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_ID ?? ""
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_SECRET ?? ""

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),
        // Providers.Credentials({
        //     name: 'Credentials',
        //     authorize: async (credentials) => {
        //         const user = 
        //     }
        // })
    ],
    callbacks: {
        async jwt({ token }) {
            token.userRole = 'admin'
            return token
        }
    }
}

export default NextAuth(authOptions);