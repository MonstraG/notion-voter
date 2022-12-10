declare namespace NodeJS {
	export interface ProcessEnv {
		DISCORD_CLIENT_ID: string;
		DISCORD_CLIENT_SECRET: string;
		NEXTAUTH_SECRET: string;
		FALLBACK_USER_INFO: string;
		ADMIN_WHITELIST: string;
		REDIS_URL: string;
		DATABASE_ID: string;
		NOTION_TOKEN: string;
	}
}

export {};
