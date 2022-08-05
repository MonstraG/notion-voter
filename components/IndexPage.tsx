import { FC } from "react";
import useTableData from "components/table/useTableData";
import GamesTable from "components/table/GamesTable";
import Loader from "components/Loader";
import styled from "components/styles/styled";
import AdminPanel from "components/AdminPanel";

const TableWrapper = styled("div")`
	display: flex;
	align-items: start;
	flex-direction: column;
`;

const IndexPage: FC = () => {
	const { data } = useTableData();

	if (!data) {
		return <Loader />;
	}

	return (
		<TableWrapper>
			<GamesTable />
			<AdminPanel />
		</TableWrapper>
	);
};

export default IndexPage;
