import { FC } from "react";
import styled from "components/styles/styled";
import { css } from "@emotion/react";

const LoaderWrapper = styled("div")<{ $button?: boolean }>`
	width: 80px;
	height: 80px;

	position: absolute;

	margin: 0 auto;
	top: calc(50% - 32px);
	left: calc(50% - 32px);

	div {
		width: 64px;
		height: 64px;
		margin: 0 auto;

		border: 8px solid #fff;
		border-left-color: transparent;
		border-radius: 50%;
		animation: lds-ring 1s infinite linear;
	}

	@keyframes lds-ring {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	${({ $button }) =>
		$button &&
		css`
			width: 14px;
			height: 14px;

			top: calc(50% - 7px);
			left: calc(50% - 7px);
			div {
				width: 14px;
				height: 14px;
				border-width: 3px;
			}
		`}
`;

type Props = {
	button?: boolean;
};

const Loader: FC<Props> = ({ button }) => (
	<LoaderWrapper $button={button}>
		<div />
	</LoaderWrapper>
);

export default Loader;
