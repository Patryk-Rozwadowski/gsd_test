import React, { useEffect, useState } from "react";
import { axiosInstance } from "./API/axiosInstance";
import {
	Avatar,
	Box,
	Flex,
	PopoverTrigger,
	Popover,
	Text,
	Button,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	Grid,
} from "@chakra-ui/react";

import { css, Global, ThemeProvider } from "@emotion/react";
import { IUser } from "./interfaces/user.interface";
import ClipLoader from "react-spinners/ClipLoader";
import UsersMocked from "./userMocked.json";
import emotionReset from "emotion-reset";
import { ITheme } from "./interfaces/theme.interface";
import { GrContactInfo, GrOrganization } from "react-icons/all";

const theme: ITheme = {
	colors: {
		accent: "#d11f25",
		accentLight: "#ff3f46",
		dark: "#171717",
		border: "#d9d9d9",
		inactive: "#797676",
		separator: "#ebe7e6",
	},
	styles: {
		boxShadow: "0 2px 6px 1px rgba(0, 0, 0, 0.1)",
		borderRadius: "3px",
		transitionTime: "300ms",
	},
};

const cssReset = [
	css`
		*,
		*::after,
		*::before {
			box-sizing: border-box;
			-moz-osx-font-smoothing: grayscale;
			-webkit-font-smoothing: antialiased;
			font-smoothing: antialiased;
		}
	`,
	emotionReset,
];

function App() {
	const [users, setUsers] = useState<IUser[]>();
	// useEffect(() => {
	// 	axiosInstance.get("/users").then(({ data }: AxiosResponse<IUser[]>) => {
	// 		setUsers(data);
	// 	});
	// });

	useEffect(() => {
		setUsers(UsersMocked);
	}, []);
	return (
		<ThemeProvider theme={theme}>
			<Global styles={cssReset} />
			<div className="App">
				<header className="App-header">
					<Box w={"80%"} m={"0 auto"}>
						<Grid templateColumns="repeat(5, 1fr)" gap={6}>
							{!users ? (
								<ClipLoader />
							) : (
								users.map((user: IUser, index: number) => (
									<Box
										boxShadow={"2px 2px 15px 1px #000000"}
										width={"200px"}
										borderWidth="1px"
										borderRadius="lg"
										overflow="hidden"
										m={"20px"}
										key={index}
									>
										<Avatar src={user.avatar_url} alt={`${user.login}`} />
										<Flex alignItems={"center"} justifyContent={"center"}>
											<Text fontFamily={"Roboto"}>{user.login}</Text>
										</Flex>

										<Flex m={"20px 0 0"} flexDirection={"row"}>
											<Popover>
												<PopoverTrigger>
													<Button
														border={0}
														w={"33%%"}
														leftIcon={<GrContactInfo />}
														colorScheme="teal"
														variant="solid"
													>
														Profile
													</Button>
												</PopoverTrigger>
												<PopoverContent>
													<PopoverHeader>User informations</PopoverHeader>
													<PopoverBody>User informations</PopoverBody>
												</PopoverContent>
											</Popover>

											<Popover>
												<PopoverTrigger>
													<Button border={0} leftIcon={<GrOrganization />} w={"66%"}>
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
								))
							)}
						</Grid>
					</Box>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
