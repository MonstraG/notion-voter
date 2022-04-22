import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import BigCheckbox from "components/BigCheckbox";
import { VoteData } from "types/Vote";
import { Voter } from "types/User";
import post from "helpers/post";

type Props = {
	voteData: VoteData;
	others: Voter[];
	ready: boolean;
	setReady: Dispatch<SetStateAction<boolean>>;
};

const ReadyFooter: FC<Props> = ({ voteData, others, ready, setReady }) => {
	const onCheck = (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		setReady(checked);
		post("/api/vote/ready", { checked });
	};

	return (
		<tfoot>
			<tr>
				<td colSpan={4}>Ready?</td>
				<td>
					<BigCheckbox checked={ready} onChange={onCheck} />
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
