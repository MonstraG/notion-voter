import { ChangeEvent, FC, useCallback } from "react";
import BigCheckbox from "components/BigCheckbox";
import useVotesData from "components/useVotesData";
import type { VoteData } from "types/Vote";
import userStore from "components/userStore";

const ReadyFooter: FC = ({}) => {
	const { data: voteData, change } = useVotesData();
	const { user } = userStore();

	const onCheck = useCallback(
		(e: ChangeEvent<HTMLInputElement>) =>
			change((data: VoteData) => ({
				...data,
				ready: { ...data.ready, [user.name]: e.target.checked }
			})),
		[change, user.name]
	);

	return (
		<tfoot>
			<tr>
				<td colSpan={4}>Ready?</td>
				<td>
					<BigCheckbox checked={Boolean(voteData.ready[user.name])} onChange={onCheck} />
				</td>
				{voteData.others.map((u) => (
					<td key={u.name}>
						<BigCheckbox checked={Boolean(voteData.ready[u.name])} disabled />
					</td>
				))}
			</tr>
		</tfoot>
	);
};

export default ReadyFooter;
