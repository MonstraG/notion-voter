import type { PlatformUser } from "types/next-auth";

export type VoteData = {
	votes: Record<string, Record<string, boolean>>; // { game: { user: boolean } }
	users: PlatformUser[];
	ready: Record<string, boolean>; // { user: boolean }
	done: boolean;
};

export type FullVotesData = VoteData & {
	myVotes?: Record<string, boolean>;
	userReady?: boolean;
	others: PlatformUser[];
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
