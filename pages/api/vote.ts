import { emptyVoteData, Vote, VoteData } from "types/Vote";
import { User } from "types/User";
import { redisRead, redisWrite } from "pages/api/redis";

export const resetVote = (): Promise<unknown> => {
	return setVoteState(emptyVoteData);
};

export const getVoteState = (): Promise<VoteData> =>
	redisRead().then((data) => {
		if (data == null) {
			return emptyVoteData;
		}
		return data as VoteData;
	});

export const setVoteState = (data: VoteData): Promise<unknown> => redisWrite(data);

export const changeReady = (user: User, ready: { checked: boolean }): Promise<unknown> =>
	getVoteState().then((voteData) => {
		ensureUserEntered(user, voteData);
		voteData.ready[user.name] = ready.checked;
		return setVoteState(voteData);
	});

export const changeVote = (user: User, vote: Vote): Promise<unknown> =>
	getVoteState().then((voteData) => {
		ensureUserEntered(user, voteData);
		if (!voteData.votes[vote.name]) {
			voteData.votes[vote.name] = {};
		}

		voteData.votes[vote.name][user.name] = vote.checked;
		return setVoteState(voteData);
	});

export const finishVote = (): Promise<unknown> =>
	getVoteState().then((voteData) => {
		voteData.done = true;
		return setVoteState(voteData);
	});

export const unfinishVote = (): Promise<unknown> =>
	getVoteState().then((voteData) => {
		voteData.done = false;
		return setVoteState(voteData);
	});

const ensureUserEntered = (user: User, voteData: VoteData) => {
	if (voteData.users.every((u) => u.name != user.name)) {
		voteData.users = [...voteData.users, { name: user.name, image: user.image }]; //destructured to ensure not spoiling email
	}
};
