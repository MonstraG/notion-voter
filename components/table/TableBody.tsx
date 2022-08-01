import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import BigCheckbox from "components/BigCheckbox";
import { emptyVoteData, VoteData } from "types/Vote";
import { NotionResultRow } from "types/Row";
import useVotesData from "components/useVotesData";
import userStore from "components/userStore";
import useTableData from "components/table/useTableData";

const sum = (array: number[]): number => array.reduce((acc, next) => acc + next, 0);

const TableBody: FC = ({}) => {
	const { user } = userStore();
	const { data: voteData, change } = useVotesData();
	const { data: tableData } = useTableData();

	const onCheck = useCallback(
		(gameName: string) => (e: ChangeEvent<HTMLInputElement>) =>
			// default value is a clutch here
			change((data: VoteData = emptyVoteData) => ({
				...data,
				votes: {
					...data.votes,
					[gameName]: {
						...(data.votes[gameName] || {}),
						[user.name]: e.target.checked
					}
				}
			})),
		[change, user.name]
	);

	const [sortedNotionGames, setSortedNotionGames] = useState<NotionResultRow[]>(tableData);
	useEffect(() => {
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
		<tbody>
			{sortedNotionGames.map((game) => (
				<tr key={game.name}>
					<td>{game.name}</td>
					<td>{game.players}</td>
					<td>
						<BigCheckbox checked={game.played} disabled />
					</td>
					<td>
						<BigCheckbox checked={game.completed} disabled />
					</td>
					<td>
						<BigCheckbox
							checked={Boolean(voteData.myVotes[game.name])}
							onChange={onCheck(game.name)}
							disabled={voteData.userReady || voteData.done}
						/>
					</td>
					{voteData.others.map((u) => (
						<td key={u.name}>
							<BigCheckbox checked={Boolean(voteData.votes[game.name]?.[u.name])} disabled />
						</td>
					))}
					{voteData.done && <td>{game.votes}</td>}
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;
