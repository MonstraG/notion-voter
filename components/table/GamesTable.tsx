import { ChangeEvent, FC, useEffect, useState } from "react";
import { ThisUser } from "types/User";
import { Vote } from "types/Vote";
import NameColumnHeader from "components/table/NameColumnHeader";
import BigCheckbox from "components/BigCheckbox";
import ReadyFooter from "components/table/ReadyFooter";
import post from "helpers/post";
import { NotionResultRow, NotionRow } from "types/Row";
import useVotesData from "helpers/hooks/useVotesData";
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
			///todo:  voteData.votes[r.name] can be undefined !!!
			const withCounts = tableData.map((r) => ({
				...r,
				votes: sum(Object.values(voteData.votes[r.name]).map((k) => (k ? 1 : 0)))
			}));
			setSortedRows(withCounts.sort((a, b) => b.votes - a.votes));
		} else {
			// todo: smarter sort
			setSortedRows([...tableData].sort((a, b) => a.players.localeCompare(b.players)));
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
								disabled={ready}
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
			{tableData && (
				<ReadyFooter voteData={voteData} others={others} ready={ready} setReady={setReady} />
			)}
		</StyledTable>
	);
};

export default GamesTable;
