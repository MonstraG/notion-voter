import { FC } from "react";
import { Voter } from "types/User";
import NextImage from "next/image";
import styled from "components/styling/styled";

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
	voter: Voter;
};

const NameColumnHeader: FC<Props> = ({ voter }) => (
	<th key={voter.name}>
		<NameContainer>
			{voter.image && (
				<AvatarImage>
					<NextImage alt="" height="20" width="20" src={voter.image} />
				</AvatarImage>
			)}
			{voter.name}
		</NameContainer>
	</th>
);

export default NameColumnHeader;
