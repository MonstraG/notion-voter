import { FC, useEffect, useState } from "react";
import styled from "components/styling/styled";
import useVotesData from "helpers/hooks/useVotesData";

const FloatingTimer = styled("div")`
	position: fixed;
	top: 48px;
	right: 0;
	width: 64px;
	text-align: center;

	h1 {
		margin: 0;
	}

	padding: 13px 16px 16px;
	border: 1px solid ${({ theme }) => theme.text};
	border-radius: ${({ theme }) => theme.borderRadius};
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border-right: 0;
	background-color: ${({ theme }) => theme.elevation["2"]};
`;

const ReadyTimer: FC = () => {
	const { data: voteData } = useVotesData();
	const [state, setState] = useState<number | null>(voteData?.allReady);

	useEffect(() => {
		setState(voteData?.allReady);

		const interval = setInterval(
			() =>
				setState((prev) => {
					if (prev == null || prev - 1 === 0) {
						clearInterval(interval);
						return null;
					}
					return prev - 1;
				}),
			1000
		);
		return () => clearInterval(interval);
	}, [voteData.allReady]);

	if (state == null) {
		return null;
	}

	return (
		<FloatingTimer>
			<h1>{state}</h1>
		</FloatingTimer>
	);
};

export default ReadyTimer;
