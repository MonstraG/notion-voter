import useSWR from "swr";
import type { FullVotesData, MyVotes, VoteData } from "types/Vote";
import { get, post } from "pages/requests";
import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import create from "zustand";

const useVotesStore = create<FullVotesData>(() => ({
	votes: {},
	users: [],
	ready: {},
	done: false,
	myVotes: {},
	userReady: false,
	others: []
}));

const findMyVotes = (voteData: VoteData, userName: string): Record<string, boolean> => {
	if (!voteData.votes) return {};

	const myVoteEntries = Object.entries(voteData.votes)
		.filter(([, votes]) => votes[userName] != null)
		.map(([game, votes]) => [game, votes[userName]]);
	return Object.fromEntries(myVoteEntries);
};

const sendMyVotes = (myVotes: MyVotes) =>
	post("/api/vote/post", myVotes).catch((e) => {
		console.error("Failed to send votes", e);
	});

const useVotesData = (): {
	data: FullVotesData;
	change: (optimisticData: FullVotesData) => void;
	isLoading: boolean;
} => {
	const { data: session } = useSession();
	const fetcher = useCallback(
		(url: string): Promise<FullVotesData> =>
			get<VoteData>(url).then((data) => {
				const { user } = session;
				return {
					...data,
					myVotes: findMyVotes(data, user.name),
					userReady: Boolean(data.ready[user.name]),
					others: data.users.filter((u) => u.name != user.name)
				};
			}),
		[session]
	);

	const { data, isLoading } = useSWR<FullVotesData>("/api/vote/get", {
		fetcher,
		refreshInterval: 7000
	});
	useEffect(() => {
		if (data) {
			useVotesStore.setState((prev) => ({
				...data,
				myVotes: prev.myVotes,
				prev: prev.userReady
			}));
		}
	}, [data]);

	const change = useCallback(
		(updatedData: FullVotesData) => {
			const { user } = session;
			const fullUpdatedData = {
				...updatedData,
				myVotes: findMyVotes(updatedData, user.name),
				userReady: Boolean(updatedData.ready[user.name])
			};
			void sendMyVotes({
				votes: fullUpdatedData.myVotes,
				ready: fullUpdatedData.userReady
			});
			useVotesStore.setState(fullUpdatedData);
		},
		[session]
	);

	const store = useVotesStore();
	return { data: store, change, isLoading };
};

export default useVotesData;
