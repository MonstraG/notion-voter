import { Voter } from "types/User";

export type Vote = {
	name: string;
	checked: boolean;
};

export type VoteData = {
	votes: Record<string, Record<string, boolean>>; // { game: {user: boolean} }
	users: Voter[];
	ready: Record<string, boolean>; // { user: boolean }
	done: boolean;
};

export const emptyVoteData: VoteData = {
	votes: {},
	users: [],
	ready: {},
	done: false
};
