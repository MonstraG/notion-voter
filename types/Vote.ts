import { User } from "types/User";

export type VoteData = {
	votes: Record<string, Record<string, boolean>>; // { game: { user: boolean } }
	users: User[];
	ready: Record<string, boolean>; // { user: boolean }
	done: boolean;
};

export type FullVotesData = VoteData & {
	myVotes?: Record<string, boolean>;
	userReady?: boolean;
	others: User[];
};

export const emptyVoteData: VoteData = {
	votes: {},
	users: [],
	ready: {},
	done: false
};

export const emptyFullVoteData: FullVotesData = {
	...emptyVoteData,
	myVotes: {},
	others: [],
	userReady: false
};

export type MyVotes = {
	votes: Record<string, boolean>; // { game: boolean }
	ready: boolean;
};
