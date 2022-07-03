import { FC } from "react";
import NameColumnHeader from "components/table/NameColumnHeader";
import ReadyFooter from "components/table/ReadyFooter";
import useVotesData from "components/useVotesData";
import styled from "components/styling/styled";
import userStore from "components/userStore";
import TableBody from "components/table/TableBody";

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

const GamesTable: FC = () => {
	const { data: voteData } = useVotesData();
	const { user } = userStore();

	return (
		<StyledTable>
			<thead>
				<tr>
					<th>Name</th>
					<th>Players</th>
					<th>Played</th>
					<th>Completed</th>
					<NameColumnHeader user={user} />
					{voteData.others.map((u) => (
						<NameColumnHeader user={u} key={u.name} />
					))}
					{voteData.done && <th>Total votes</th>}
				</tr>
			</thead>

			<TableBody />
			{!voteData.done && <ReadyFooter />}
		</StyledTable>
	);
};

export default GamesTable;
