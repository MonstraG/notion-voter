import { FC, InputHTMLAttributes } from "react";
import styled from "components/styles/styled";

const StyledCheckbox = styled("input")`
	width: 16px;
	height: 16px;
	:not(:disabled) {
		cursor: pointer;
	}
`;

const BigCheckbox: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
	<StyledCheckbox type="checkbox" {...props} />
);

export default BigCheckbox;
