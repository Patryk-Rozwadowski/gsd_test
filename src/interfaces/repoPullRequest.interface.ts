import { IUserCommon } from "./user.interface";
import { IRepository } from "./repo.interface";

interface IHead {
	label: string;
	ref: string;
	sha: string;
	user: IUserCommon;
	repo: IRepository;
}

interface Base {
	label: string;
	ref: string;
	sha: string;
	user: IUserCommon;
	repo: IRepository;
}

interface IRepoPullRequest {
	url: string;
	id: number;
	node_id: string;
	html_url: string;
	diff_url: string;
	patch_url: string;
	issue_url: string;
	number: number;
	state: string;
	locked: boolean;
	title: string;
	user: IUserCommon;
	body: string;
	created_at: Date;
	updated_at: Date;
	closed_at?: Date;
	merged_at?: Date;
	merge_commit_sha: string;
	assignee?: any;
	assignees: any[];
	requested_reviewers: any[];
	requested_teams: any[];
	labels: any[];
	milestone?: any;
	draft: boolean;
	commits_url: string;
	review_comments_url: string;
	review_comment_url: string;
	comments_url: string;
	statuses_url: string;
	head: IHead;
	base: Base;
	_links: any;
	author_association: string;
	auto_merge?: any;
	active_lock_reason?: any;
}

export type { IRepoPullRequest, IHead };
