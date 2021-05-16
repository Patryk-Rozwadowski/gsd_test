import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { axiosInstance } from "../../API/axiosInstance";
import { AxiosResponse } from "axios";
import { IRepositoryDetailed } from "../../interfaces/repo.interface";
import ClipLoader from "react-spinners/ClipLoader";
import { TextPrimary } from "../Typography/Typography.styled";
import { IRepoPullRequest } from "../../interfaces/repoPullRequest";
import { IRepoIssue } from "../../interfaces/repoIssue.interface";
import styled from "@emotion/styled";

const RepoInfoContainer = styled(Flex)`
	justify-content: center;
	flex-direction: column;
	&:not(:first-of-type),
	&:not(:last-of-type) {
		border: 1px solid #ggg;
	}
`;

const RepoDetails = ({ login, repoName }) => {
	const [detailedRepoInformation, setDetailedRepoInformation] = useState<IRepositoryDetailed>();
	const [repoPullRequestsInformation, setRepoPullRequestsInformation] =
		useState<IRepoPullRequest[]>();
	const [repoIssueInformation, setRepoIssueInformation] = useState<IRepoIssue[]>();
	useEffect(() => {
		axiosInstance(`/repos/${login}/${repoName}`).then(
			({ data }: AxiosResponse<IRepositoryDetailed>) => {
				setDetailedRepoInformation(data);
			}
		);

		axiosInstance(`/repos/${login}/${repoName}/issues`).then(
			({ data }: AxiosResponse<IRepoIssue[]>) => {
				setRepoIssueInformation(data);
			}
		);

		axiosInstance(`/repos/${login}/${repoName}/pulls?state=all`).then(
			({ data }: AxiosResponse<IRepoPullRequest[]>) => {
				setRepoPullRequestsInformation(data);
			}
		);
	}, [repoName, login]);

	function calculatePullRequestsToIssuesRatio() {
		const allPR = repoPullRequestsInformation?.length;
		const openedPR = repoIssueInformation?.length;
		return `${allPR}/${openedPR}`;
	}

	function calculateOpenClosedIssues() {
		const openIssues = repoIssueInformation?.filter((issue) => issue.state === "open").length;
		const closedIssues = repoIssueInformation?.filter((issue) => issue.state === "closed").length;
		return `${openIssues}/${closedIssues}`;
	}

	return (
		<>
			{!detailedRepoInformation && !repoPullRequestsInformation && !repoIssueInformation ? (
				<ClipLoader />
			) : (
				// TODO sort with PR
				// TODO last commit in x days ago
				<RepoInfoContainer>
					<TextPrimary>Repo name: {detailedRepoInformation?.name}</TextPrimary>
					<TextPrimary>Number of PR: {repoPullRequestsInformation?.length}</TextPrimary>
					<TextPrimary>Stars number: {detailedRepoInformation?.stargazers_count}</TextPrimary>
					<TextPrimary>Open / Closed issues {calculateOpenClosedIssues()}</TextPrimary>
					<TextPrimary>
						Pull Requests / Issues {calculatePullRequestsToIssuesRatio()}
					</TextPrimary>
				</RepoInfoContainer>
			)}
		</>
	);
};

export default RepoDetails;
