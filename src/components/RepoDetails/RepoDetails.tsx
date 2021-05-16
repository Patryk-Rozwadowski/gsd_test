import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { axiosInstance } from "../../API/axiosInstance";
import { IRepositoryDetailed } from "../../interfaces/repo.interface";
import ClipLoader from "react-spinners/ClipLoader";
import { TextPrimary } from "../Typography/Typography.styled";
import { IRepoPullRequest } from "../../interfaces/repoPullRequest";
import { IRepoIssue } from "../../interfaces/repoIssue.interface";
import { RepoDetailInfoContainer } from "./RepoDetails.styled";
import { calculateLastDay } from "../../utils/calculateDaysAgo";
import { CommitInformation } from "../../interfaces/repoCommit.interface";

const RepoDetails = ({ login, repoName }) => {
	const [detailedRepoInformation, setDetailedRepoInformation] = useState<IRepositoryDetailed>();
	const [repoPullRequestsInformation, setRepoPullRequestsInformation] =
		useState<IRepoPullRequest[]>();
	const [repoIssueInformation, setRepoIssueInformation] = useState<IRepoIssue[]>();
	const [repoCommitsInformation, setRepoCommitsInformation] = useState<CommitInformation>();

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

		axiosInstance(`/repos/${login}/${repoName}/commits/master`).then(
			({ data }: AxiosResponse<CommitInformation>) => {
				setRepoCommitsInformation(data);
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
				<RepoDetailInfoContainer>
					<TextPrimary>Repo name: {detailedRepoInformation?.name}</TextPrimary>
					<TextPrimary>Number of PR: {repoPullRequestsInformation?.length}</TextPrimary>
					<TextPrimary>Stars number: {detailedRepoInformation?.stargazers_count}</TextPrimary>
					<TextPrimary>Open / Closed issues {calculateOpenClosedIssues()}</TextPrimary>
					<TextPrimary>
						Pull Requests / Issues {calculatePullRequestsToIssuesRatio()}
					</TextPrimary>

					{!repoCommitsInformation ? (
						<ClipLoader />
					) : (
						<TextPrimary>
							Last commit: {calculateLastDay(repoCommitsInformation?.commit.committer.date)}{" "}
							days ago
						</TextPrimary>
					)}
				</RepoDetailInfoContainer>
			)}
		</>
	);
};

export default RepoDetails;
