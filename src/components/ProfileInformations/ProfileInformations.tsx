import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import {
	Box,
	Button,
	Flex,
	Popover,
	PopoverBody,
	PopoverHeader,
	PopoverTrigger,
} from "@chakra-ui/react";
import { axiosInstance } from "../../API/axiosInstance";
import { TextHeader, TextPrimary } from "../Typography/Typography.styled";
import { IUserDetailed } from "../../interfaces/user.interface";
import { IRepository } from "../../interfaces/repo.interface";
import { PopoverContainer, RepoInfoButton, RepoInfoContainer } from "./ProfileInformations.styled";
import RepoDetails from "../RepoDetails/RepoDetails";
import { calculateLastDay } from "../../utils/calculateDaysAgo";
import { sort } from "../../utils/sort";

const ProfileInformations = ({ login }: Partial<IUserDetailed>): JSX.Element => {
	const [fetched, setFetched] = useState<boolean>(false);
	const [userInformation, setUserInformation] = useState<IUserDetailed>();
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

	function calculateIssueRatio() {
		return repos?.reduce((acc: number, repo: IRepository): number => {
			return acc + repo.open_issues_count;
		}, 0);
	}

	function calculateUserStars(): number {
		return repos?.reduce((acc: number, repo: IRepository): number => {
			return acc + repo.stargazers_count;
		}, 0);
	}

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
						<TextPrimary>Public repos:{userInformation.public_repos}</TextPrimary>
						<TextPrimary>
							Joined: {calculateLastDay(userInformation?.created_at)} days ago.
						</TextPrimary>
						<TextPrimary>User's Stars: {calculateUserStars()}</TextPrimary>
						<TextPrimary>Opened issues:{calculateIssueRatio()}</TextPrimary>

						{repos.map((repo: IRepository, index: number) => {
							return (
								<Popover key={index} isLazy={true}>
									<RepoInfoContainer>
										<TextPrimary>{repo.name}</TextPrimary>
										<TextPrimary>{repo.stargazers_count}</TextPrimary>
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
										<RepoDetails login={login} repoName={repo.name} />
									</PopoverContainer>
								</Popover>
							);
						})}
					</PopoverBody>
				</Box>
			)}
		</>
	);
};

export default ProfileInformations;
