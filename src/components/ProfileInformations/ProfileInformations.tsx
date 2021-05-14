import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PopoverBody, PopoverHeader } from "@chakra-ui/react";
import { axiosInstance } from "../../API/axiosInstance";
import { AxiosResponse } from "axios";
import { TextHeader, TextPrimary } from "../Typography/Typography.styled";
import { IRepository, IUserDetailedInformations } from "../../interfaces/user.interface";

const ProfileInformations = ({ login }: Partial<IUserDetailedInformations>): JSX.Element => {
	const [fetched, setFetched] = useState<boolean>(false);
	const [userInformations, setUserInformations] = useState<IUserDetailedInformations>();
	const [repoInformations, setRepoInformations] = useState<IRepository[]>();

	useEffect(() => {
		const ac = new AbortController();
		Promise.all([
			axiosInstance(`/users/${login}`).then(
				({ data }: AxiosResponse<IUserDetailedInformations>) => {
					setUserInformations(data);
				}
			),
			axiosInstance(`/users/${login}/repos`).then(({ data }: AxiosResponse<IRepository[]>) => {
				setRepoInformations(data);
			}),
		])
			.then(() => setFetched(true))
			.catch((err) => console.error(err));

		return () => ac.abort();
	}, [login]);

	function calculateWhenUserJoinedInDays(): number {
		const msDiff = new Date().getTime() - new Date(userInformations.created_at).getTime();
		return Math.floor(msDiff / (1000 * 60 * 60 * 24));
	}

	function calculateUserStars(): number {
		return repoInformations?.reduce((acc: number, repo: IRepository): number => {
			return acc + repo.stargazers_count;
		}, 0);
	}
	return (
		<>
			{!fetched ? (
				<ClipLoader />
			) : (
				<>
					<PopoverHeader justifyContent={"center"}>
						<TextHeader>{userInformations.login} Profile</TextHeader>
					</PopoverHeader>
					<PopoverBody>
						<TextPrimary>Public repos:{userInformations.public_repos}</TextPrimary>
						<TextPrimary>Joined: {calculateWhenUserJoinedInDays()} days ago.</TextPrimary>
						<TextPrimary>Stars: {calculateUserStars()}</TextPrimary>
						<TextPrimary>Public repos:{userInformations.public_repos}</TextPrimary>
					</PopoverBody>
				</>
			)}
		</>
	);
};

export default ProfileInformations;
