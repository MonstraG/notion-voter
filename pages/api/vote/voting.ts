import { emptyVoteData, type MyVotes, type VoteData } from "types/Vote";
import { redisRead, redisWrite } from "pages/api/vote/redis";
import type { PlatformUser } from "types/next-auth";

export const resetVote = (): Promise<unknown> => redisWrite(emptyVoteData);

export const getVoteState = (): Promise<VoteData> =>
	redisRead().then((data) => {
		if (data == null) {
			return emptyVoteData;
		}
		return data as VoteData;
	});

export const changeVote = (user: PlatformUser, vote: MyVotes): Promise<unknown> =>
	changeVoteState((voteData: VoteData) => {
		// ensure user entered
		if (voteData.users.every((u) => u.name != user.name)) {
			voteData.users = [...voteData.users, { name: user.name, image: user.image }]; //destructured to ensure not spoiling email
		}

		Object.entries(vote.votes).forEach(([game, checked]) => {
			if (!voteData.votes[game]) {
				voteData.votes[game] = {};
			}
			voteData.votes[game][user.name] = checked;
		});

		voteData.ready[user.name] = vote.ready;

		return voteData;
	});

export const finishVote = () => changeVoteFinishStatus(true);
export const unfinishVote = () => changeVoteFinishStatus(false);

export const changeVoteFinishStatus = (done: boolean): Promise<unknown> =>
	changeVoteState((voteData) => {
		voteData.done = done;
		return voteData;
	});

export const changeVoteState = (action: (voteData: VoteData) => VoteData) =>
	getVoteState().then((voteData) => {
		const updated = action(voteData);
		void redisWrite(updated);
		return updated;
	});
