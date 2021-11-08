export type User = {
	signedIn: boolean;
	email?: string;
	username?: string;
	id?: string;
};

export type Post = {
	author: string;
	body: string;
	createdDate: Date;
	likes: { liker: string; id: string }[];
	_id: string;
};
