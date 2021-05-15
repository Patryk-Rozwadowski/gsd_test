import React from "react";
import {
	Avatar,
	Box,
	Button,
	Flex,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
} from "@chakra-ui/react";
import { GrContactInfo, GrOrganization } from "react-icons/all";
import ProfileInformations from "../ProfileInformations/ProfileInformations";
import { PopoverContainer } from "../ProfileInformations/ProfileInformations.styled";

interface IUserCard {
	avatar_url: string;
	login: string;
}

const UserCard = ({ avatar_url, login }: IUserCard): JSX.Element => {
	return (
		<Box width={"200px"} borderWidth="1px" borderRadius="lg" overflow="hidden" m={"20px"}>
			<Avatar size={"cover"} src={avatar_url} alt={`${login}`} />
			<Flex m={"20px 0"} alignItems={"center"} justifyContent={"center"}>
				<Text fontFamily={"Roboto, sans-serif"}>{login}</Text>
			</Flex>

			<Flex alignItems={"center"} flexDirection={"row"}>
				<Popover isLazy={true}>
					<PopoverTrigger>
						<Button
							border={0}
							backgroundColor={"#fff"}
							width={"33%%"}
							h={"20px"}
							leftIcon={<GrContactInfo />}
						>
							Profile
						</Button>
					</PopoverTrigger>
					<PopoverContainer>
						<ProfileInformations login={login} />
					</PopoverContainer>
				</Popover>

				<Popover isLazy={true}>
					<PopoverTrigger>
						<Button
							border={0}
							label={"Organizations"}
							leftIcon={<GrOrganization />}
							width={"66%"}
							backgroundColor={"#fff"}
						>
							Organizations
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverHeader>Organization informations</PopoverHeader>
						<PopoverBody>Organization informations</PopoverBody>
					</PopoverContent>
				</Popover>
			</Flex>
		</Box>
	);
};

export default UserCard;
