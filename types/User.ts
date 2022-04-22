export interface ThisUser extends Voter {
	email: string;
}

export interface Voter {
	image?: string | null;
	name: string;
}
