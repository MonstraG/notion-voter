import { User } from "types/User";

export type VoteData = {
	votes: Record<string, Record<string, boolean>>; // { game: { user: boolean } }
	users: User[];
	ready: Record<string, boolean>; // { user: boolean }
	done: boolean;
};

export const emptyVoteData: VoteData = {
	votes: {},
	users: [],
	ready: {},
	done: false
};

export type MyVotes = {
	votes: Record<string, boolean>; // { game: boolean }
	ready: boolean;
};
