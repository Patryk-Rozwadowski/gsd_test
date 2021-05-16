interface Author {
	name: string;
	email: string;
	date: Date;
}

interface Committer {
	name: string;
	email: string;
	date: Date;
}

interface Tree {
	sha: string;
	url: string;
}

interface Verification {
	verified: boolean;
	reason: string;
	signature?: any;
	payload?: any;
}

interface Commit {
	author: Author;
	committer: Committer;
	message: string;
	tree: Tree;
	url: string;
	comment_count: number;
	verification: Verification;
}

interface Parent {
	sha: string;
	url: string;
	html_url: string;
}

interface CommitInformation {
	sha: string;
	node_id: string;
	commit: Commit;
	url: string;
	html_url: string;
	comments_url: string;
	author: Author;
	committer: Committer;
	parents: Parent;
}

export type { Author, Commit, Committer, Verification, CommitInformation, Parent };
