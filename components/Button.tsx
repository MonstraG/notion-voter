import { ButtonHTMLAttributes, FC } from "react";
import styled from "components/styling/styled";
import { css } from "@emotion/react";
import Loader from "components/Loader";

const StyledButton = styled("button")<
	ButtonHTMLAttributes<HTMLButtonElement> & { $basic?: boolean; $loading?: boolean }
>`
	${({ $basic, theme }) =>
		$basic
			? css`
					padding: 5px 15px;
					border: 1px solid ${theme.primary};
					color: ${theme.primary};
					background-color: transparent;

					:hover:not(:disabled) {
						background-color: ${theme.primary}20;
					}

					:active:not(:disabled) {
						background-color: ${theme.primary}10;
					}
			  `
			: css`
					padding: 6px 16px;
					border: none;
					color: ${theme.text};
					background-color: ${theme.primary};

					:hover:not(:disabled) {
						background-color: ${theme.light};
					}

					:active:not(:disabled) {
						background-color: ${theme.dark};
					}
			  `}
	:hover:not(:disabled) {
		box-shadow: rgba(0, 0, 0, 0.2) 0 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
			rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
	}

	filter: ${({ disabled }) => disabled && "brightness(0.75)"} !important;

	outline: 0;
	user-select: none;
	position: relative;
	border-radius: 4px;

	:not(:disabled) {
		cursor: pointer;
	}
	transition: ${({ theme }) => theme.transitionInstant} all;
	text-decoration-color: currentcolor;

	span {
		opacity: ${({ $loading }) => $loading && "0"};
	}
`;

type Props = {
	loading?: boolean;
	basic?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ children, loading, basic, disabled, ...props }) => (
	<StyledButton disabled={disabled || loading} $loading={loading} $basic={basic} {...props}>
		{loading && <Loader button />}
		<span>{children}</span>
	</StyledButton>
);

export default Button;
