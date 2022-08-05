import type { GetStaticProps, NextPage } from "next";
import type { ThisUser } from "types/User";
import { useSetUserStore } from "components/hooks/userStore";
import Loader from "components/Loader";
import useTableData from "components/table/useTableData";
import GamesTable from "components/table/GamesTable";
import AdminPanel from "components/AdminPanel/AdminPanel";
import styled from "components/styles/styled";

const TableWrapper = styled("div")`
	display: flex;
	align-items: start;
	flex-direction: column;
`;

type Props = {
	isVercel: boolean;
	fallbackInfo: ThisUser | null;
};

const Home: NextPage<Props> = ({ isVercel, fallbackInfo }) => {
	const user = useSetUserStore(isVercel, fallbackInfo);
	const { data } = useTableData();

	if (!user || !data) {
		return <Loader />;
	}

	return (
		<TableWrapper>
			<GamesTable />
			<AdminPanel />
		</TableWrapper>
	);
};

export const getStaticProps: GetStaticProps = () => {
	const isVercel = Boolean(process.env.VERCEL);
	return {
		props: {
			isVercel,
			fallbackInfo: !isVercel ? JSON.parse(process.env.FALLBACK_USER_INFO) : null
		}
	};
};

export default Home;
