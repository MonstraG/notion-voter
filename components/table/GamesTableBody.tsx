import { ChangeEvent, FC, useEffect, useState } from "react";
import { NotionResultRow } from "types/Row";
import useVotesData from "components/hooks/useVotesData";
import useTableData from "components/table/useTableData";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";

const sum = (array: number[]): number => array.reduce((acc, next) => acc + next, 0);

const GamesTableBody: FC = () => {
	const { data: voteData, change } = useVotesData();
	const { data: tableData } = useTableData();

	const onCheck = (gameName: string) => (e: ChangeEvent<HTMLInputElement>) =>
		change({
			...voteData,
			myVotes: {
				...voteData.myVotes,
				[gameName]: e.target.checked
			}
		});

	const [sortedNotionGames, setSortedNotionGames] = useState<NotionResultRow[]>(tableData ?? []);
	useEffect(() => {
		if (tableData == null) {
			return;
		}

		if (voteData.done) {
			const withCounts = tableData.map((r) => ({
				...r,
				votes: sum(Object.values(voteData.votes[r.name] || {}).map((k) => (k ? 1 : 0)))
			}));
			setSortedNotionGames(withCounts.sort((a, b) => b.votes - a.votes));
		} else {
			const copy = [...tableData];
			copy.sort((a, b) => {
				const completedComparison = Number(a.completed) - Number(b.completed);
				if (completedComparison != 0) return completedComparison;
				const playedComparison = Number(a.played) - Number(b.played);
				if (playedComparison != 0) return playedComparison;
				return a.players.localeCompare(b.players);
			});
			setSortedNotionGames(copy);
		}
	}, [tableData, voteData.done, voteData.votes]);

	return (
		<TableBody>
			{sortedNotionGames.map((game) => (
				<TableRow key={game.name} hover>
					<TableCell>{game.name}</TableCell>
					<TableCell>{game.players}</TableCell>
					<TableCell padding="checkbox">
						<Checkbox checked={game.played} disabled />
					</TableCell>
					<TableCell padding="checkbox">
						<Checkbox checked={game.completed} disabled />
					</TableCell>
					<TableCell padding="checkbox">
						<Checkbox
							checked={Boolean(voteData.myVotes[game.name])}
							onChange={onCheck(game.name)}
							disabled={voteData.userReady || voteData.done}
						/>
					</TableCell>
					{voteData.others.map((u) => (
						<TableCell padding="checkbox" key={u.name}>
							<Checkbox
								checked={Boolean(voteData.votes[game.name]?.[u.name])}
								disabled
							/>
						</TableCell>
					))}
					{voteData.done && <TableCell>{game.votes}</TableCell>}
				</TableRow>
			))}
		</TableBody>
	);
};

export default GamesTableBody;
