import {
	BasicFormInfo,
	BasicTemplateInfo,
	CreateTemplate,
	CreateTicket,
	FetchResponse,
	FullTemplateInfo,
	LoginCredentials,
	Metadata,
	SignUpCredentials,
	UpdateLike,
	User,
} from "@/types";
import fetchApi from "./api";

export const signupUser = (data: SignUpCredentials) =>
	fetchApi<FetchResponse<User>>("/signup", { method: "POST", body: data });

export const loginUser = (data: LoginCredentials) =>
	fetchApi<FetchResponse<User>>("/login", { method: "POST", body: data });

export const getUser = (id: string) => fetchApi<User>(`/users/${id}`);

export const getUsers = () => fetchApi<User[]>("/users");

export const deleteUser = (id: string) =>
	fetchApi(`/users/${id}`, {
		method: "DELETE",
	});

export const getTopics = () =>
	fetchApi("/topics", {
		method: "GET",
	});

export const getMetadata = () =>
	fetchApi<FetchResponse<Metadata>>("/metadata", {
		method: "GET",
	});

export const createTemplate = (data: CreateTemplate) =>
	fetchApi("/templates", {
		method: "POST",
		body: data,
	});

export const getTemplate = (id: string) =>
	fetchApi<FetchResponse<FullTemplateInfo>>(`/templates/${id}`, {
		method: "GET",
	});

export const getTemplates = () =>
	fetchApi<FetchResponse<BasicTemplateInfo[]>>("/templates", { method: "GET" });

export const getUserTemplates = (id: string) =>
	fetchApi<FetchResponse<BasicTemplateInfo[]>>(`/users/${id}/templates`, {
		method: "GET",
	});

export const getUserForms = (id: string) =>
	fetchApi<FetchResponse<BasicFormInfo[]>>(`/users/${id}/forms`, {
		method: "GET",
	});

export const deleteTemplate = (id: string) =>
	fetchApi<FetchResponse<null>>(`/templates/${id}`, {
		method: "DELETE",
	});

export const updateTemplateLikes = (data: UpdateLike) =>
	fetchApi<FetchResponse<null>>(`/likes`, {
		method: "PUT",
		body: data,
	});

export const getUserTickets = (email: string) =>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchApi<FetchResponse<any>>(`/tickets/${email}`, {
		method: "GET",
	});

export const createTicket = (data: CreateTicket) =>
	fetchApi<FetchResponse<null>>(`/tickets`, {
		method: "POST",
		body: data,
	});
