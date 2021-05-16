import { TextPrimary } from "../Typography/Typography.styled";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../API/axiosInstance";
import { AxiosResponse } from "axios";
import {
	IMember,
	IOrganizationCommon,
	IOrganizationDetails,
	IOrganizationRepo,
} from "../../interfaces/organizations.interface";

interface IOrganizationDetailsProps {
	organization: IOrganizationCommon;
}

const OrganizationDetails = ({ organization }: IOrganizationDetailsProps) => {
	const [organizationsDetails, setOrganizationsDetails] = useState<IOrganizationDetails>();
	const [organizationMembers, setOrganizationMembers] = useState<IMember[]>();
	const [organizationRepos, setOrganizationRepos] = useState<IOrganizationRepo[]>();
	useEffect(() => {
		debugger;
		axiosInstance
			.get(`/orgs/${organization.login}`)
			.then(({ data }: AxiosResponse<IOrganizationDetails>) => {
				setOrganizationsDetails(data);
			});

		axiosInstance
			.get(`/orgs/${organization.login}/repos`)
			.then(({ data }: AxiosResponse<IOrganizationRepo[]>) => {
				setOrganizationRepos(data);
			});

		axiosInstance
			.get(`/orgs/${organization.login}/members`)
			.then(({ data }: AxiosResponse<IMember[]>) => {
				setOrganizationMembers(data);
			});
	}, [organization]);
	return (
		<Box border={"1px solid #222"}>
			{organizationsDetails && (
				<>
					<TextPrimary>Name: {organizationsDetails.login}</TextPrimary>
					<TextPrimary>Number of members: {organizationMembers?.length}</TextPrimary>
					<TextPrimary>Number of repos: {organizationsDetails.public_repos}</TextPrimary>
					<TextPrimary>
						Created at:{" "}
						{new Date(organizationsDetails?.created_at).toISOString().slice(0, 10)}
					</TextPrimary>
				</>
			)}
		</Box>
	);
};

export default OrganizationDetails;
