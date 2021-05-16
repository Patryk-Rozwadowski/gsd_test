import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { Box, Grid, Popover, PopoverTrigger, theme } from "@chakra-ui/react";
import { Global, ThemeProvider } from "@emotion/react";
import { IUserCommon } from "./interfaces/user.interface";
import UserCard from "./components/UserCard/UserCard";
import { cssReset } from "./cssReset";
import { axiosInstance } from "./API/axiosInstance";
import { AxiosResponse } from "axios";
import { IOrganizationCommon } from "./interfaces/organizations.interface";
import {TextHeader, TextPrimary } from "./components/Typography/Typography.styled";
import OrganizationDetails from "./components/OrganizationDetails/OrganizationDetails";
import {
	PopoverContainer,
	RepoInfoButton,
	RepoInfoContainer,
} from "./components/ProfileInformations/ProfileInformations.styled";

function App() {
	const [users, setUsers] = useState<IUserCommon[]>();
	const [organizations, setOrganizations] = useState<IOrganizationCommon[]>();

	useEffect(() => {
		axiosInstance.get("/users").then(({ data }: AxiosResponse<IUserCommon[]>) => {
			setUsers(data);
		});

		axiosInstance.get("/organizations").then(({ data }: AxiosResponse<IOrganizationCommon[]>) => {
			setOrganizations(data);
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Global styles={cssReset} />
			<div className="App">
				<header className="App-header">
					<Box w={"75%"} m={"0 auto"}>
						<TextHeader textAlign={"center"} m={"50px 0"}>Users & Repos</TextHeader>

						<Grid templateColumns="repeat(5, 1fr)" gap={6}>
							{!users ? (
								<ClipLoader />
							) : (
								users.map((user: IUserCommon, index: number) => {
									const { avatar_url, login } = user;
									return <UserCard login={login} avatar_url={avatar_url} key={index} />;
								})
							)}
						</Grid>

							<TextHeader textAlign={"center"} m={"50px 0"}>Organizations</TextHeader>
						<Grid templateColumns="repeat(3, 1fr)" gap={6}>
							{!organizations ? (
								<ClipLoader />
							) : (
								organizations.map((organization: IOrganizationCommon, index: number) => {
									return (
										<Popover key={index} isLazy={true}>
											<RepoInfoContainer>
												<TextPrimary>{organization.login}</TextPrimary>
												<PopoverTrigger>
													<RepoInfoButton
														border={0}
														ml={"15px"}
														backgroundColor={"#fff"}
														width={"33%%"}
														h={"20px"}
													>
														Info
													</RepoInfoButton>
												</PopoverTrigger>
											</RepoInfoContainer>

											<PopoverContainer>
												<OrganizationDetails key={index} organization={organization} />
											</PopoverContainer>
										</Popover>
									);
								})
							)}
						</Grid>
					</Box>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
