import { FC } from "react";
import useTableData from "helpers/hooks/useTableData";
import ReadyTimer from "components/ReadyTimer";
import GamesTable from "components/table/GamesTable";
import { ThisUser } from "types/User";
import Loader from "components/Loader";
import styled from "components/styling/styled";

const TableWrapper = styled("div")`
	display: flex;
	align-items: start;
`;

type Props = {
	voter: ThisUser;
};

const IndexPage: FC<Props> = ({ voter }) => {
	const { data } = useTableData();

	if (!data) {
		return <Loader />;
	}

	return (
		<TableWrapper>
			<GamesTable voter={voter} tableData={data} />
			<ReadyTimer />
		</TableWrapper>
	);
};

export default IndexPage;
