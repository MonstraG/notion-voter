import { withAuth } from "next-auth/middleware";

const adminWhitelist: string[] = JSON.parse(process.env.ADMIN_WHITELIST);

const debugMode = !process.env.VERCEL;

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
	callbacks: {
		authorized({ req, token }): boolean {
			// if there is no token, you can do stuff if it's debug mode
			if (!token) return debugMode;

			// `/api/admin` requires admin role
			if (req.nextUrl.pathname.startsWith("/api/admin")) {
				return adminWhitelist.includes(token.email);
			}

			// everything else is fine, we already checked for token
			return true;
		}
	}
});
