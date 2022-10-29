import type { FC } from "react";
import NextImage from "next/image";
import type { PlatformUser } from "types/next-auth";
import { Avatar, Stack, TableCell, Typography } from "@mui/material";

type Props = {
	user: PlatformUser;
};

const NameColumnHeader: FC<Props> = ({ user }) => (
	<TableCell>
		<Stack direction="row" spacing={1} alignItems="center">
			<Avatar sx={{ height: 24, width: 24 }}>
				{user.image && <NextImage alt="" height="24" width="24" src={user.image} />}
			</Avatar>
			<Typography variant="inherit">{user.name}</Typography>
		</Stack>
	</TableCell>
);

export default NameColumnHeader;
