import useSWR from "swr";
import { emptyVoteData, VoteData } from "types/Vote";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useVotesData = () =>
	useSWR<VoteData>("/api/vote/get", fetcher, {
		refreshInterval: 1000,
		fallbackData: emptyVoteData,
		revalidateOnMount: false
	});

export default useVotesData;
