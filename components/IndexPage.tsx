import { FC } from "react";
import useTableData from "helpers/hooks/useTableData";
import ReadyTimer from "components/ReadyTimer";
import GamesTable from "components/table/GamesTable";
import { ThisUser } from "types/User";
import Loader from "components/Loader";

type Props = {
	voter: ThisUser;
};

const IndexPage: FC<Props> = ({ voter }) => {
	const { data } = useTableData();

	if (!data) {
		return <Loader />;
	}

	return (
		<>
			<ReadyTimer />
			<GamesTable voter={voter} tableData={data} />
		</>
	);
};

export default IndexPage;
