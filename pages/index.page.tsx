import type { NextPage } from "next";
import GamesTable from "components/table/GamesTable";
import AdminSection from "components/AdminPanel/AdminSection";
import { useSession } from "next-auth/react";
import useVotesData from "components/hooks/useVotesData";
import useTableData from "components/table/useTableData";
import type { FC } from "react";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import useIsAdmin from "components/AdminPanel/useIsAdmin";

const VoterApp: FC = () => {
	const { isLoading: isLoadingVotes } = useVotesData();
	const { isLoading: isLoadingTable } = useTableData();
	const isAdmin = useIsAdmin();

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
			{isAdmin && <AdminSection />}
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
