import styled from "@emotion/styled";
import { Text } from "@chakra-ui/react";

const TextPrimary = styled(Text)`
	font-size: 18px;
	font-family: Roboto, sans-serif;
`;

const TextHeader = styled(TextPrimary)`
	font-size: 24px;
	font-weight: bold;
`;

export { TextPrimary, TextHeader };
