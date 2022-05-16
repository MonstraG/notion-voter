import { ChangeEvent, FC, useEffect, useState } from "react";
import type { ThisUser } from "types/User";
import type { Vote } from "types/Vote";
import NameColumnHeader from "components/table/NameColumnHeader";
import BigCheckbox from "components/BigCheckbox";
import ReadyFooter from "components/table/ReadyFooter";
import post from "helpers/post";
import type { NotionResultRow, NotionRow } from "types/Row";
import useVotesData from "components/useVotesData";
import styled from "components/styling/styled";

const StyledTable = styled("table")`
	border-collapse: collapse;
	th,
	td {
		border: 1px solid #333;
	}

	th:first-of-type,
	td:first-of-type {
		border-left: none;
	}
	th:last-of-type,
	td:last-of-type {
		border-right: none;
	}

	td,
	th {
		padding: 4px 8px;
	}

	th {
		font-weight: normal;
		color: #aaa;
		text-align: left;
	}

	tr:nth-child(2n) {
		background-color: ${({ theme }) => theme.elevation[2]};
	}
`;

const sum = (array: number[]): number => array.reduce((acc, next) => acc + next, 0);

type Props = {
	voter: ThisUser;
	tableData: NotionRow[];
};

const GamesTable: FC<Props> = ({ voter, tableData }) => {
	const { data: voteData } = useVotesData();
	const [myVotes, setMyVotes] = useState<Record<string, boolean>>({});
	const [ready, setReady] = useState<boolean>(false);

	useEffect(() => {
		const myVoteEntries = Object.entries(voteData.votes)
			.filter(([_, votes]) => votes[voter.name] != null)
			.map(([game, votes]) => {
				return [game, votes[voter.name]];
			});

		setMyVotes(Object.fromEntries(myVoteEntries));
	}, [voter, voteData]);

	const onCheck = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		setMyVotes((prev) => ({ ...prev, [name]: checked }));
		const vote: Vote = { name, checked };
		post("/api/vote/post", vote);
	};

	const others = voteData.users.filter((u) => u.name != voter.name);

	const [sortedRows, setSortedRows] = useState<NotionResultRow[]>(tableData);
	useEffect(() => {
		if (voteData.done) {
			const withCounts = tableData.map((r) => ({
				...r,
				votes: sum(Object.values(voteData.votes[r.name] || {}).map((k) => (k ? 1 : 0)))
			}));
			setSortedRows(withCounts.sort((a, b) => b.votes - a.votes));
		} else {
			const copy = [...tableData];
			copy.sort((a, b) => {
				const completedComparison = Number(a.completed) - Number(b.completed);
				if (completedComparison != 0) return completedComparison;
				const playedComparison = Number(a.played) - Number(b.played);
				if (playedComparison != 0) return playedComparison;
				return a.players.localeCompare(b.players);
			});
			setSortedRows(copy);
		}
	}, [tableData, voteData.done, voteData.votes]);

	return (
		<StyledTable>
			<thead>
				<tr>
					<th>Name</th>
					<th>Players</th>
					<th>Played</th>
					<th>Completed</th>
					<NameColumnHeader voter={voter} />
					{others.map((u) => (
						<NameColumnHeader voter={u} key={u.name} />
					))}
					{voteData.done && <th>Total votes</th>}
				</tr>
			</thead>

			<tbody>
				{sortedRows.map((row) => (
					<tr key={row.name}>
						<td>{row.name}</td>
						<td>{row.players}</td>
						<td>
							<BigCheckbox checked={row.played} disabled />
						</td>
						<td>
							<BigCheckbox checked={row.completed} disabled />
						</td>
						<td>
							<BigCheckbox
								checked={Boolean(myVotes[row.name])}
								onChange={onCheck(row.name)}
								disabled={ready || voteData.done}
							/>
						</td>
						{others.map((u) => (
							<td key={u.name}>
								<BigCheckbox checked={Boolean(voteData.votes[row.name]?.[u.name])} disabled />
							</td>
						))}
						{voteData.done && <td>{row.votes}</td>}
					</tr>
				))}
			</tbody>

			{tableData && !voteData.done && (
				<ReadyFooter voteData={voteData} others={others} ready={ready} setReady={setReady} />
			)}
		</StyledTable>
	);
};

export default GamesTable;
