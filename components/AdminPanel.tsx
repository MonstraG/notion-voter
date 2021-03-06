import { FC, useState } from "react";
import useIsAdmin from "components/useIsAdmin";
import styled from "components/styling/styled";
import Button from "components/Button";
import useVotesData from "components/useVotesData";
import { VoteData } from "types/Vote";

const Buttons = styled("div")`
	display: flex;
	column-gap: 16px;
	padding-top: 32px;
`;

type AdminButtonProps = {
	label: string;
	disabled: (voteData: VoteData) => boolean;
};

const actions: Record<string, AdminButtonProps> = {
	finish: {
		label: "Finish",
		disabled: (voteData: VoteData) =>
			voteData.done || !Object.values(voteData.ready).every((r) => r)
	},
	unfinish: {
		label: "Unfinish",
		disabled: (voteData: VoteData) => !voteData.done
	},
	reset: {
		label: "Reset",
		disabled: (voteData: VoteData) => !voteData.done
	}
};

type Props = {
	isFallback: boolean;
};

const AdminPanel: FC<Props> = ({ isFallback }) => {
	const isAdmin = useIsAdmin();

	const { data: voteData } = useVotesData();

	const [fetching, setFetching] = useState<keyof typeof actions | null>(null);

	if (!isAdmin && !isFallback) return null;

	const onClick = (key: string) => () => {
		setFetching(key);
		fetch(`api/vote/admin/${key}`).finally(() => setFetching(null));
	};

	const loading = Boolean(fetching);
	return (
		<Buttons>
			{Object.entries(actions).map(([key, props]) => (
				<Button
					key={key}
					loading={fetching === key}
					disabled={props.disabled(voteData) || loading}
					onClick={onClick(key)}
				>
					{props.label}
				</Button>
			))}
		</Buttons>
	);
};

export default AdminPanel;
