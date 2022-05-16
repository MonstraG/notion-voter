import { ChangeEvent, FC, useCallback } from "react";
import BigCheckbox from "components/BigCheckbox";
import { ThisUser, User } from "types/User";
import post from "helpers/post";
import useVotesData from "components/useVotesData";
import type { VoteData } from "types/Vote";

type Props = {
	user: ThisUser;
	others: User[];
};

const ReadyFooter: FC<Props> = ({ user, others }) => {
	const { data: voteData, mutate: mutateVoteData } = useVotesData();

	const onCheck = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const checked = e.target.checked;
			void mutateVoteData(
				() => {
					void post("/api/vote/ready", { checked });
					return null;
				},
				{
					revalidate: false,
					populateCache: false,
					optimisticData: (data: VoteData) => ({
						...data,
						ready: { ...data.ready, [user.name]: checked }
					})
				}
			);
		},
		[mutateVoteData, user.name]
	);

	return (
		<tfoot>
			<tr>
				<td colSpan={4}>Ready?</td>
				<td>
					<BigCheckbox checked={Boolean(voteData.ready[user.name])} onChange={onCheck} />
				</td>
				{others.map((u) => (
					<td key={u.name}>
						<BigCheckbox checked={Boolean(voteData.ready[u.name])} disabled />
					</td>
				))}
			</tr>
		</tfoot>
	);
};

export default ReadyFooter;
