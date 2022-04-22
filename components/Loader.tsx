import { FC } from "react";
import styled from "components/styling/styled";

const LoaderWrapper = styled("div")`
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
`;

const Loader: FC = () => (
	<LoaderWrapper>
		<div />
	</LoaderWrapper>
);

export default Loader;
