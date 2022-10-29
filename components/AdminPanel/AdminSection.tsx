import { type FC, useState } from "react";
import useIsAdmin from "components/AdminPanel/useIsAdmin";
import Button from "components/CustomButton";
import useVotesData from "components/hooks/useVotesData";
import type { VoteData } from "types/Vote";
import { Stack } from "@mui/material";

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

const AdminSection: FC = () => {
	const { data: voteData } = useVotesData();
	const [fetching, setFetching] = useState<keyof typeof actions | null>(null);

	const onClick = (key: string) => () => {
		setFetching(key);
		fetch(`api/admin/${key}`).finally(() => setFetching(null));
	};

	const loading = Boolean(fetching) || !voteData;
	return (
		<Stack spacing={2} pt={4} direction="row">
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
		</Stack>
	);
};

export default AdminSection;
