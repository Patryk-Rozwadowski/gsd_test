import React from "react";
import {
	PopoverContainer,
	RepoInfoButton,
	RepoInfoContainer,
} from "./ProfileInformations/ProfileInformations.styled";
import { TextPrimary } from "./Typography/Typography.styled";
import { Popover, PopoverTrigger } from "@chakra-ui/react";
import RepoDetails from "./RepoDetails/RepoDetails";
import { IRepository } from "../interfaces/repo.interface";

interface IUserRepoList {
	repos: IRepository[];
	login: string;
}

const UserRepoList = ({ repos, login }: IUserRepoList) => {
	return (
		<>
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
		</>
	);
};

export default UserRepoList;
