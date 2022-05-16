import { ChangeEvent, FC, useEffect, useState } from "react";
import type { ThisUser } from "types/User";
import type { Vote, VoteData } from "types/Vote";
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

	tr:nth-of-type(2n) {
		background-color: ${({ theme }) => theme.elevation[2]};
	}
`;

const sum = (array: number[]): number => array.reduce((acc, next) => acc + next, 0);

const findMyVotes = (voteData: VoteData, user: ThisUser): Record<string, boolean> => {
	const myVoteEntries = Object.entries(voteData.votes)
		.filter(([_, votes]) => votes[user.name] != null)
		.map(([game, votes]) => [game, votes[user.name]]);
	return Object.fromEntries(myVoteEntries);
};

type Props = {
	user: ThisUser;
	tableData: NotionRow[];
};

const GamesTable: FC<Props> = ({ user, tableData }) => {
	const { data: voteData, mutate: mutateVoteData } = useVotesData();

	const myVotes = findMyVotes(voteData, user);

	const onCheck = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;

		const updateData = (data: VoteData) => {
			if (!data.votes[name]) {
				data.votes[name] = {};
			}
			data.votes[name][user.name] = checked;
			return { ...data };
		};

		mutateVoteData(
			() => {
				const vote: Vote = { name, checked };
				void post("/api/vote/post", vote);
				return null;
			},
			{
				revalidate: false,
				populateCache: false,
				optimisticData: updateData
			}
		);
	};

	const others = voteData.users.filter((u) => u.name != user.name);

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

	const userReady = Boolean(voteData.ready[user.name]);

	return (
		<StyledTable>
			<thead>
				<tr>
					<th>Name</th>
					<th>Players</th>
					<th>Played</th>
					<th>Completed</th>
					<NameColumnHeader user={user} />
					{others.map((u) => (
						<NameColumnHeader user={u} key={u.name} />
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
								disabled={userReady || voteData.done}
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

			{tableData && !voteData.done && <ReadyFooter user={user} others={others} />}
		</StyledTable>
	);
};

export default GamesTable;
