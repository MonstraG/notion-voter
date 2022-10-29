import type { NextPage } from "next";
import GamesTable from "components/table/GamesTable";
import AdminPanel from "components/AdminPanel/AdminPanel";
import { useSession } from "next-auth/react";
import useVotesData from "components/hooks/useVotesData";
import useTableData from "components/table/useTableData";
import type { FC } from "react";
import { Backdrop, CircularProgress, Stack } from "@mui/material";

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
		<Stack>
			<GamesTable />
			<AdminPanel />
		</Stack>
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
