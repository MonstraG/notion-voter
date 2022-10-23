import useSWR from "swr";
import type { FullVotesData, MyVotes, VoteData } from "types/Vote";
import { post } from "pages/requests";
import debounce from "components/hooks/useVotesData/debounce";
import { useCallback } from "react";
import type { PlatformUser } from "types/next-auth";
import { useSession } from "next-auth/react";

const findMyVotes = (voteData: VoteData, userName: string): Record<string, boolean> => {
	if (!voteData.votes) return {};

	const myVoteEntries = Object.entries(voteData.votes)
		.filter(([_, votes]) => votes[userName] != null)
		.map(([game, votes]) => [game, votes[userName]]);
	return Object.fromEntries(myVoteEntries);
};

const sendMyVotes = (myVotes: MyVotes) =>
	post("/api/vote/post", myVotes).catch((e) => {
		console.error("Failed to send votes", e);
	});

const augmentData = (data: VoteData, user: PlatformUser) => ({
	...data,
	myVotes: findMyVotes(data, user.name),
	userReady: Boolean(data.ready[user.name]),
	others: data.users.filter((u) => u.name != user.name)
});

const debouncedSendMyVotes = debounce(sendMyVotes, 7000);

const useVotesData = (): {
	data: FullVotesData;
	change: (optimisticData: FullVotesData) => void;
	isLoading: boolean;
} => {
	const { data: session } = useSession();
	const { data, mutate, isLoading } = useSWR<FullVotesData>("/api/vote/get");

	const change = useCallback(
		(updatedData: FullVotesData) => {
			debouncedSendMyVotes({
				votes: updatedData.myVotes,
				ready: updatedData.userReady
			});

			return mutate(
				() => {
					return updatedData;
				},
				{
					revalidate: false,
					populateCache: true,
					rollbackOnError: true,
					optimisticData: () => updatedData
				}
			);
		},
		[mutate]
	);

	return { data: data ? augmentData(data, session.user) : null, change, isLoading };
};

export default useVotesData;
