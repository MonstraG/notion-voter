import { FC } from "react";
import { User } from "types/User";
import NextImage from "next/image";
import styled from "components/styles/styled";

const NameContainer = styled("div")`
	display: flex;
	align-items: center;
	column-gap: 8px;
`;

const AvatarImage = styled("div")`
	border-radius: 50%;
	overflow: hidden;
	height: 20px;
	width: 20px;
`;

type Props = {
	user: User;
};

const NameColumnHeader: FC<Props> = ({ user }) => (
	<th key={user.name}>
		<NameContainer>
			{user.image && (
				<AvatarImage>
					<NextImage alt="" height="20" width="20" src={user.image} />
				</AvatarImage>
			)}
			{user.name}
		</NameContainer>
	</th>
);

export default NameColumnHeader;
