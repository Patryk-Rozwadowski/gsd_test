import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ITheme } from "../../interfaces/theme.interface";

interface IUserCardStyled {
	theme: {
		styles: {
			boxShadow: string;
		};
	};
}
const UserCardContainer = styled(Box)<Partial<IUserCardStyled>>`
	box-shadow: ${({ theme }) => theme.styles.boxShadow};
`;

export { UserCardContainer };
