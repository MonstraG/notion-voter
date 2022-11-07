import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	providers: [
		process.env.VERCEL
			? DiscordProvider({
					clientId: process.env.DISCORD_CLIENT_ID,
					clientSecret: process.env.DISCORD_CLIENT_SECRET
			  })
			: CredentialsProvider({
					name: "Credentials",
					credentials: {
						username: {
							label: "Username",
							type: "text",
							placeholder: "jsmith"
						},
						password: { label: "Password", type: "password" }
					},
					async authorize() {
						return JSON.parse(process.env.FALLBACK_USER_INFO);
					}
			  })
	]
};

export default NextAuth(authOptions);
