import { FC, useEffect, useState } from "react";
import styled from "components/styling/styled";
import useVotesData from "helpers/hooks/useVotesData";
import { css } from "@emotion/react";

const FloatingTimer = styled("div")<{ $hidden: boolean }>`
	position: sticky;
	top: 16px;
	margin-left: 16px;
	right: -80px;
	width: 80px;
	text-align: center;

	h1 {
		margin: 0;
	}

	padding: 13px 16px 16px;
	border: 2px solid ${({ theme }) => theme.text};
	border-radius: ${({ theme }) => theme.borderRadius};
	background-color: ${({ theme }) => theme.elevation["2"]};

	transition: opacity 0.2s;
	${({ $hidden }) =>
		$hidden &&
		css`
			opacity: 0;
		`}
`;

const ReadyTimer: FC = () => {
	const { data: voteData } = useVotesData();
	const [state, setState] = useState<{
		time: number | null;
		running: boolean;
	}>({
		time: voteData.allReady,
		running: false
	});

	useEffect(() => {
		if (voteData?.allReady == null) {
			setState({
				time: voteData.allReady,
				running: false
			});
			return;
		}
		setState({
			time: voteData.allReady,
			running: true
		});

		const interval = setInterval(
			() =>
				setState((prev) => {
					if (prev.time == null || prev.time - 1 === 0) {
						clearInterval(interval);
						return {
							time: 0,
							running: false
						};
					}
					return {
						time: prev.time - 1,
						...prev
					};
				}),
			1000
		);
		return () => clearInterval(interval);
	}, [voteData.allReady]);

	return (
		<FloatingTimer $hidden={!state.running}>
			<h1>{state.time || 0}</h1>
		</FloatingTimer>
	);
};

export default ReadyTimer;
