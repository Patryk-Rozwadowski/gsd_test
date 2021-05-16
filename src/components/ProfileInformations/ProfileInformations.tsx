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
import { GrContactInfo } from "react-icons/all";
import { PopoverContainer } from "./ProfileInformations.styled";
import RepoDetails from "../RepoDetails/RepoDetails";

const ProfileInformations = ({ login }: Partial<IUserDetailed>): JSX.Element => {
	const [fetched, setFetched] = useState<boolean>(false);
	const [userInformation, setUserInformation] = useState<IUserDetailed>();
	const [repoInformation, setRepoInformation] = useState<IRepository[]>();
	useEffect(() => {
		const ac = new AbortController();
		Promise.all([
			axiosInstance(`/users/${login}`).then(({ data }: AxiosResponse<IUserDetailed>) => {
				setUserInformation(data);
			}),
			axiosInstance(`/users/${login}/repos`).then(({ data }: AxiosResponse<IRepository[]>) => {
				setRepoInformation(data);
			}),
		])
			.then(() => setFetched(true))
			.catch((err) => console.error(err));
		return () => ac.abort();
	}, [login]);

	function calculateWhenUserJoinedInDays(): number {
		const msDiff = new Date().getTime() - new Date(userInformation.created_at).getTime();
		return Math.floor(msDiff / (1000 * 60 * 60 * 24));
	}

	function calculateIssueRatio() {
		const allIssues = repoInformation?.reduce((acc: number, repo: IRepository): number => {
			return acc + repo.open_issues_count;
		}, 0);
		return allIssues;
	}

	function calculateUserStars(): number {
		return repoInformation?.reduce((acc: number, repo: IRepository): number => {
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
						<TextPrimary>Joined: {calculateWhenUserJoinedInDays()} days ago.</TextPrimary>
						<TextPrimary>User's Stars: {calculateUserStars()}</TextPrimary>
						<TextPrimary>Opened issues:{calculateIssueRatio()}</TextPrimary>

						{repoInformation.map((repo: IRepository, index: number) => {
							return (
								<Popover key={index} isLazy={true}>
									<Flex m={"20px 0"} justifyContent={"center"}>
										<TextPrimary>{repo.name}</TextPrimary>
										<TextPrimary>{repo.stargazers_count}</TextPrimary>
										<PopoverTrigger>
											<Button
												border={0}
												backgroundColor={"#fff"}
												width={"33%%"}
												h={"20px"}
												leftIcon={<GrContactInfo />}
											>
												Repo info
											</Button>
										</PopoverTrigger>
									</Flex>

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
