import { Button, Flex, PopoverContent } from "@chakra-ui/react";
import styled from "@emotion/styled";

const PopoverContainer = styled(PopoverContent)<any>`
	background-color: #fff;
	border: 1px solid ${({ theme }) => theme.colors.border};
`;

const RepoInfoContainer = styled(Flex)`
	justify-content: center;
	flex-direction: row;
	margin: 10px 0;
	padding: 10px 0;
	border: 1px solid #222;
	transition: all 300ms;

	&:hover {
		background-color: #222;
		color: #fff;
		cursor: pointer;
	}
`;

const RepoInfoButton = styled(Button)`
	background-color: #222;
	color: #fff;

	&:hover {
		background-color: #fff;
		color: #222;
		cursor: pointer;
	}
`;

export { PopoverContainer, RepoInfoContainer, RepoInfoButton };
