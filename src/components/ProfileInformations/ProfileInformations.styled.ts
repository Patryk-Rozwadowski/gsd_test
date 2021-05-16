import { PopoverContent } from "@chakra-ui/react";
import styled from "@emotion/styled";

const PopoverContainer = styled(PopoverContent)<any>`
	background-color: #fff;
	border: 1px solid ${({ theme }) => theme.colors.border};
`;

export { PopoverContainer };
