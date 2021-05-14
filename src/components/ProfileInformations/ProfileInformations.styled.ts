import styled from "@emotion/styled";
import { PopoverContent } from "@chakra-ui/react";
import { ITheme } from "../../interfaces/theme.interface";
import { PopoverContentProps } from "@chakra-ui/popover/dist/types/popover";

interface ProfileInformationsStyled extends PopoverContentProps {
	theme?: Partial<ITheme>;
}
const PopoverContainer = styled(PopoverContent)<ProfileInformationsStyled>`
	background-color: #fff;
	border: 1px solid ${({ theme }) => theme.colors.border};
`;

export { PopoverContainer };
