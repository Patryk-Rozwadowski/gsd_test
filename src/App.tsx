import React, { useEffect, useState } from "react";
import { Box, Grid, theme } from "@chakra-ui/react";

import { css, Global, ThemeProvider } from "@emotion/react";
import { IUserCommon } from "./interfaces/user.interface";
import ClipLoader from "react-spinners/ClipLoader";
import UsersMocked from "./userMocked.json";
import emotionReset from "emotion-reset";
import UserCard from "./components/UserCard/UserCard";

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
	const [users, setUsers] = useState<IUserCommon[]>();
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
					<Box w={"75%"} m={"0 auto"}>
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
					</Box>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
