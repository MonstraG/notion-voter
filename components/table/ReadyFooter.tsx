import type { ChangeEvent, FC } from "react";
import useVotesData from "components/hooks/useVotesData/useVotesData";
import { useSession } from "next-auth/react";
import { Checkbox, TableCell, TableFooter, TableRow } from "@mui/material";

const ReadyFooter: FC = () => {
	const { data: voteData, change } = useVotesData();
	const { data: session } = useSession();

	const onCheck = (e: ChangeEvent<HTMLInputElement>) => {
		const updated = {
			...voteData,
			ready: { ...voteData.ready, [session.user.name]: e.target.checked }
		};
		change(updated);
	};

	return (
		<TableFooter>
			<TableRow>
				<TableCell colSpan={4}>Ready?</TableCell>
				<TableCell padding="checkbox">
					<Checkbox
						checked={Boolean(voteData.ready[session.user.name])}
						onChange={onCheck}
					/>
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
