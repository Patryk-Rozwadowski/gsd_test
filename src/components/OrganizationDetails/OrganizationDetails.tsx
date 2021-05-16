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

const OrganizationDetails = ({ organization }) => {
	const [organizationsDetails, setOrganizationsDetails] = useState<IOrganizationDetails>();
	const [organizationMembers, setOrganizationMembers] = useState<IMember[]>();
	const [organizationRepos, setOrganizationRepos] = useState<IOrganizationRepo[]>();
	useEffect(() => {
		axiosInstance
			.get(`/orgs/${organization}`)
			.then(({ data }: AxiosResponse<IOrganizationDetails>) => {
				setOrganizationsDetails(data);
			});

		axiosInstance
			.get(`/orgs/${organization}/members`)
			.then(({ data }: AxiosResponse<IOrganizationRepo[]>) => {
				setOrganizationRepos(data);
			});

		axiosInstance
			.get(`/orgs/${organization}/repos`)
			.then(({ data }: AxiosResponse<IMember[]>) => {
				setOrganizationMembers(data);
			});
	}, [organization]);
	return (
		<Box border={"1px solid #222"}>
			{organizationsDetails && (
				<>
					{/*<TextPrimary>{organizationsDetails.login}</TextPrimary>*/}
					{/*<TextPrimary>{organizationsDetails.numberOfusers}</TextPrimary>*/}
					<TextPrimary>Organization repos: {organizationMembers?.length}</TextPrimary>
					<TextPrimary>
						{new Date(organizationsDetails?.created_at).toISOString().slice(0, 10)}
					</TextPrimary>
				</>
			)}
		</Box>
	);
};

export default OrganizationDetails;
