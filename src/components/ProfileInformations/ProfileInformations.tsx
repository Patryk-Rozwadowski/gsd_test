import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Box, PopoverBody, PopoverHeader } from "@chakra-ui/react";
import { axiosInstance } from "../../API/axiosInstance";
import { TextHeader, TextPrimary } from "../Typography/Typography.styled";
import { IUserDetailed } from "../../interfaces/user.interface";
import { IRepository } from "../../interfaces/repo.interface";
import { calculateLastDay } from "../../utils/calculateDaysAgo";
import UserRepoList from "../UserRepoList";

const ProfileInformations = ({ login }: Partial<IUserDetailed>): JSX.Element => {
	const [fetched, setFetched] = useState<boolean>(false);
	const [userInformation, setUserInformation] = useState<IUserDetailed>();
	const [repoPullRequestsInformation, setRepoPullRequestsInformation] = useState();
	const [repos, setRepos] = useState<IRepository[]>();

	useEffect(() => {
		const ac = new AbortController();
		Promise.all([
			axiosInstance(`/users/${login}`).then(({ data }: AxiosResponse<IUserDetailed>) => {
				setUserInformation(data);
			}),
			axiosInstance(`/users/${login}/repos`).then(({ data }: AxiosResponse<IRepository[]>) => {
				setRepos(data);
			}),
		])
			.then(() => setFetched(true))
			.catch((err) => console.error(err));
		return () => ac.abort();
	}, [login]);

	return (
		<>
			{!fetched ? (
				<ClipLoader />
			) : (
				<Box>
					<PopoverHeader justifyContent={"center"}>
						<TextHeader>{userInformation.name}'s Profile</TextHeader>
					</PopoverHeader>
					<PopoverBody>
						<TextPrimary>
							Joined: {calculateLastDay(userInformation?.created_at)} days ago.
						</TextPrimary>

						<UserRepoList repos={repos} login={login} />
					</PopoverBody>
				</Box>
			)}
		</>
	);
};

export default ProfileInformations;
