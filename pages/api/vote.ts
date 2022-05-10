import { emptyVoteData, Vote, VoteData } from "types/Vote";
import { Voter } from "types/User";
import { redisRead, redisWrite } from "pages/api/redis";

export const resetVote = (): Promise<unknown> => {
	return setVoteState(emptyVoteData);
};

export const getVoteState = (): Promise<VoteData> => {
	return redisRead().then((data) => {
		if (data == null) {
			return emptyVoteData;
		}
		return data as VoteData;
	});
};

export const setVoteState = (data: VoteData): Promise<unknown> => {
	return redisWrite(data);
};

export const changeReady = (voter: Voter, ready: { checked: boolean }): Promise<unknown> => {
	return getVoteState().then((voteData) => {
		ensureVoterEntered(voter, voteData);
		voteData.ready[voter.name] = ready.checked;
		return setVoteState(voteData);
	});
};

export const changeVote = (voter: Voter, vote: Vote): Promise<unknown> => {
	return getVoteState().then((voteData) => {
		ensureVoterEntered(voter, voteData);
		if (!voteData.votes[vote.name]) {
			voteData.votes[vote.name] = {};
		}

		voteData.votes[vote.name][voter.name] = vote.checked;
		return setVoteState(voteData);
	});
};

export const finishVote = (): Promise<unknown> => {
	return getVoteState().then((voteData) => {
		voteData.done = true;
		return setVoteState(voteData);
	});
};

const ensureVoterEntered = (voter: Voter, voteData: VoteData) => {
	if (voteData.users.every((u) => u.name != voter.name)) {
		voteData.users = [...voteData.users, { name: voter.name, image: voter.image }]; //destructured to ensure not spoiling email
	}
};
