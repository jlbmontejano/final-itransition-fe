import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email(),
	password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().min(1, "Email is required").email(),
	password: z.string().min(1, "Password is required"),
});

export const templateSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	topicId: z.string().min(1, "Topic is required"),
});

export const questionSchema = z.string().min(1, "Tag is required");

export const ticketSchema = z.object({
	reportedBy: z.string().email(),
	templateTitle: z.string(),
	link: z.string(),
	priority: z.string(),
	status: z.string(),
});
