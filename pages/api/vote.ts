import { emptyVoteData, Vote, VoteData } from "types/Vote";
import { Voter } from "types/User";

let voteData: VoteData = { ...emptyVoteData };
let readyInterval: ReturnType<typeof setInterval> | null = null;

export const resetVote = () => {
	voteData = { ...emptyVoteData };
};

export const getVoteState = (): VoteData => {
	return voteData;
};

export const changeReady = (voter: Voter, ready: { checked: boolean }) => {
	ensureVoterEntered(voter);
	voteData.ready[voter.name] = ready.checked;

	resetAllReadyTimer();
};

export const changeVote = (voter: Voter, vote: Vote) => {
	ensureVoterEntered(voter);

	if (!voteData.votes[vote.name]) {
		voteData.votes[vote.name] = {};
	}
	voteData.votes[vote.name][voter.name] = vote.checked;
};

const ensureVoterEntered = (voter: Voter) => {
	if (voteData.users.every((u) => u.name != voter.name)) {
		voteData.users = [...voteData.users, { name: voter.name, image: voter.image }]; //destructured to ensure not spoiling email
		resetAllReadyTimer();
	}
};

const resetAllReadyTimer = () => {
	const allReady = voteData.users.length > 0 && voteData.users.every((u) => voteData.ready[u.name]);
	voteData.allReady = allReady ? 10 : null;

	if (allReady) {
		if (readyInterval) {
			clearInterval(readyInterval);
		}

		readyInterval = setInterval(() => {
			if (voteData.allReady == null) {
				if (readyInterval) {
					clearInterval(readyInterval);
				}
				return;
			}

			if (voteData.allReady - 1 === 0) {
				voteData.done = true;
				voteData.allReady = null;
				return;
			}

			voteData.allReady--;
		}, 1000);
	}
};
