import { IUserCommon } from "./user.interface";

interface IPullRequest {
	url: string;
	html_url: string;
	diff_url: string;
	patch_url: string;
}

interface ILabel {
	id: number;
	node_id: string;
	url: string;
	name: string;
	color: string;
	default: boolean;
	description?: any;
}

interface IRepoIssue {
	url: string;
	repository_url: string;
	labels_url: string;
	comments_url: string;
	events_url: string;
	html_url: string;
	id: number;
	node_id: string;
	number: number;
	title: string;
	user: IUserCommon;
	labels: ILabel[];
	state: string;
	locked: boolean;
	assignee?: any;
	assignees: any[];
	milestone?: any;
	comments: number;
	created_at: Date;
	updated_at: Date;
	closed_at?: any;
	author_association: string;
	active_lock_reason?: any;
	body: string;
	performed_via_github_app?: any;
	pull_request: IPullRequest;
}

export type { ILabel, IPullRequest, IRepoIssue };
