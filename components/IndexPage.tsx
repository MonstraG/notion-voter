import { FC } from "react";
import useTableData from "components/table/useTableData";
import GamesTable from "components/table/GamesTable";
import { ThisUser } from "types/User";
import Loader from "components/Loader";
import styled from "components/styling/styled";
import AdminPanel from "components/AdminPanel";

const TableWrapper = styled("div")`
	display: flex;
	align-items: start;
	flex-direction: column;
`;

type Props = {
	user: ThisUser;
	isFallback?: boolean;
};

const IndexPage: FC<Props> = ({ user, isFallback }) => {
	const { data } = useTableData();

	if (!data) {
		return <Loader />;
	}

	return (
		<TableWrapper>
			<GamesTable user={user} tableData={data} />
			<AdminPanel isFallback={isFallback} />
		</TableWrapper>
	);
};

export default IndexPage;
