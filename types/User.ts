export interface ThisUser extends User {
	email: string;
}

export interface User {
	image?: string | null;
	name: string;
}
