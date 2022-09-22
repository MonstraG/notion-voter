export interface PlatformUser {
	image?: string | null;
	name: string;
}

interface ThisUser extends PlatformUser {
	email: string;
}

declare module "next-auth" {
	interface Session {
		user: ThisUser;
	}
}
