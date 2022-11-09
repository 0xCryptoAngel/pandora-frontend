import { withAuth } from 'next-auth/middleware';

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            if (req.nextUrl.pathname === "/checkout") {
                return token?.userRole === "admin"
            }

            return !!token
        }
    }
})

export const config = { matcher: ["/admin", "/me"] }