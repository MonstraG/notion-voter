import { FC, InputHTMLAttributes } from "react";
import styled from "components/styling/styled";

const StyledCheckbox = styled("input")`
	width: 16px;
	height: 16px;
`;

const BigCheckbox: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
	<StyledCheckbox type="checkbox" {...props} />
);

export default BigCheckbox;
