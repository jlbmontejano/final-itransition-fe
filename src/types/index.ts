export type User = {
	id: number;
	name: string;
	email: string;
	role: Role;
};

export type BasicTemplateInfo = {
	id: number;
	title: string;
	description: string;
	creator: User;
	topic: Topic;
	tags: string[];
	// comments: Comment[]
	likedUsersIds: number[];
	likesCount: number;
};

export type FullTemplateInfo = BasicTemplateInfo & {
	questions: Question[];
};

export type Question = {
	text: string;
	type: "TEXT" | "MULTITEXT" | "NUMBER" | "CHECKBOX";
	options?: string[];
};

export type Topic = {
	id: number;
	text: string;
};

export type Metadata = {
	topics: Topic[];
	tags: string[];
};

export type FetchResponse<T> = {
	success: boolean;
	data?: T;
	message?: string;
};

export type SignUpCredentials = {
	name: string;
	email: string;
	password: string;
};

export type LoginCredentials = {
	email: string;
	password: string;
};

export type CreateTemplate = {
	title: string;
	description: string;
	topicId: string;
	tags: string[];
	questions: Question[];
	creatorId: number;
};

export type UpdateLike = {
	templateId: number;
	userId: number;
};

enum Role {
	USER,
	ADMIN,
}
