import useSWR from "swr";
import { emptyVoteData, FullVotesData, MyVotes, VoteData } from "types/Vote";
import userStore from "components/hooks/userStore";
import post from "pages/post";
import debounce from "components/hooks/useVotesData/debounce";
import { useCallback } from "react";

const findMyVotes = (voteData: VoteData, userName: string): Record<string, boolean> => {
	if (!voteData.votes) return {};

	const myVoteEntries = Object.entries(voteData.votes)
		.filter(([_, votes]) => votes[userName] != null)
		.map(([game, votes]) => [game, votes[userName]]);
	return Object.fromEntries(myVoteEntries);
};

const sendMyVotes = (myVotes: MyVotes) =>
	post("/api/vote/post", myVotes).catch((e) => {
		console.error("Failed to send votes");
		console.error(e);
	});

const debouncedSendMyVotes = debounce(sendMyVotes, 7000);

// TODO: REWRITE THIS TO NOT USE SWR, EMULATE IT TRU ZUSTAND (maybe not, knowing about swr 2.0)
// POST RETURNS NEW STATE, THAT CAN DELAY NEXT REFRESH

const useVotesData = (): {
	data: FullVotesData;
	change: (optimisticData: (currentData?: VoteData) => VoteData) => void;
} => {
	const { user } = userStore();

	const fetcher = useCallback(
		(url: string): Promise<FullVotesData> =>
			fetch(url)
				.then((res: Response) => res.json())
				.then((data: VoteData) => ({
					...data,
					myVotes: findMyVotes(data, user.name),
					userReady: Boolean(data.ready[user.name]),
					others: data.users.filter((u) => u.name != user.name)
				})),
		[user.name]
	);

	const { data, mutate } = useSWR<FullVotesData>("/api/vote/get", {
		refreshInterval: 15000,
		fallbackData: { ...emptyVoteData, myVotes: {}, others: [], userReady: false },
		revalidateOnMount: false,
		fetcher
	});

	const change = useCallback(
		(optimisticData: (currentData?: FullVotesData) => FullVotesData) =>
			mutate(
				() => {
					debouncedSendMyVotes({
						votes: data.myVotes,
						ready: data.userReady
					});
					return null;
				},
				{
					revalidate: false,
					populateCache: false,
					optimisticData
				}
			),
		[data, mutate]
	);

	return { data, change };
};

export default useVotesData;
