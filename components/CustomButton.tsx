import { LoadingButton, type LoadingButtonProps } from "@mui/lab";

const CustomButton = ({
	variant = "contained",
	disabled,
	loading,
	...props
}: LoadingButtonProps) => (
	<LoadingButton {...props} variant={variant} disabled={disabled || loading} loading={loading} />
);

export default CustomButton;
