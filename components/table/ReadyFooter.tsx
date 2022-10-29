import type { ChangeEvent, FC } from "react";
import useVotesData from "components/hooks/useVotesData";
import { Checkbox, TableCell, TableFooter, TableRow } from "@mui/material";

const ReadyFooter: FC = () => {
	const { data: voteData, change } = useVotesData();

	const onCheck = (e: ChangeEvent<HTMLInputElement>) =>
		change({
			...voteData,
			userReady: e.target.checked
		});

	return (
		<TableFooter>
			<TableRow>
				<TableCell colSpan={4}>Ready?</TableCell>
				<TableCell padding="checkbox">
					<Checkbox checked={voteData.userReady} onChange={onCheck} />
				</TableCell>
				{voteData.others.map((u) => (
					<TableCell padding="checkbox" key={u.name}>
						<Checkbox checked={Boolean(voteData.ready[u.name])} disabled />
					</TableCell>
				))}
			</TableRow>
		</TableFooter>
	);
};

export default ReadyFooter;
