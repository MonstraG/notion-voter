import type { NextPage } from "next";
import GamesTable from "components/table/GamesTable";
import AdminPanel from "components/AdminPanel/AdminPanel";
import styled from "components/styles/styled";
import { useSession } from "next-auth/react";
import useVotesData from "components/hooks/useVotesData/useVotesData";
import useTableData from "components/table/useTableData";
import type { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const TableWrapper = styled("div")`
	display: flex;
	align-items: start;
	flex-direction: column;
`;

const VoterApp: FC = () => {
	const { isLoading: isLoadingVotes } = useVotesData();
	const { isLoading: isLoadingTable } = useTableData();

	if (isLoadingVotes || isLoadingTable) {
		return (
			<Backdrop open>
				<CircularProgress />
			</Backdrop>
		);
	}

	return (
		<TableWrapper>
			<GamesTable />
			<AdminPanel />
		</TableWrapper>
	);
};

const IndexPage: NextPage = () => {
	const { status } = useSession({ required: true });

	if (status !== "authenticated") {
		return (
			<Backdrop open>
				<CircularProgress />
			</Backdrop>
		);
	}

	return <VoterApp />;
};

export default IndexPage;
