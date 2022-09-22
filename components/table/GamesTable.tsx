import { FC } from "react";
import NameColumnHeader from "components/table/NameColumnHeader";
import ReadyFooter from "components/table/ReadyFooter";
import useVotesData from "components/hooks/useVotesData/useVotesData";
import GamesTableBody from "components/table/GamesTableBody";
import { useSession } from "next-auth/react";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";

const GamesTable: FC = () => {
	const { data: voteData } = useVotesData();
	const { data: session } = useSession();

	return (
		<Table size="small">
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>Players</TableCell>
					<TableCell>Played</TableCell>
					<TableCell>Completed</TableCell>
					<NameColumnHeader user={session.user} />
					{voteData.others.map((u) => (
						<NameColumnHeader user={u} key={u.name} />
					))}
					{voteData.done && <TableCell>Total votes</TableCell>}
				</TableRow>
			</TableHead>

			<GamesTableBody />
			{!voteData.done && <ReadyFooter />}
		</Table>
	);
};

export default GamesTable;
