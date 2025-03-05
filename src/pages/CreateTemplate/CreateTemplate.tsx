import Autocomplete from "@/components/shared/Autocomplete/Autocomplete";
import Display from "@/components/shared/Display/Display";
import Loader from "@/components/shared/Loader/Loader";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants/routes";
import { createTemplate, getMetadata } from "@/lib/fetch";
import { templateSchema } from "@/lib/zod-validation";
import { Question, Topic } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import DialogWindow from "./components/DialogWindow";
import { CREATE_TEMPLATE_TEXT as TEXT } from "./utils/text";

const CreateTemplate = () => {
	const { user, language } = useUserContext();
	const navigate = useNavigate();
	const [topics, setTopics] = useState<Topic[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchMetadata() {
			try {
				const { data } = await getMetadata();
				const { tags, topics } = data!;

				setTopics(topics);
				setTags(tags);
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchMetadata();
	}, []);

	const form = useForm<z.infer<typeof templateSchema>>({
		resolver: zodResolver(templateSchema),
		defaultValues: {
			title: "",
			description: "",
			topicId: "",
		},
	});

	async function onSubmit(values: z.infer<typeof templateSchema>) {
		try {
			setIsLoading(true);

			await createTemplate({
				...values,
				tags: selectedTags,
				questions,
				creatorId: user!.id,
			});

			toast({ description: TEXT[language].TOAST_SUCCESS });
			navigate(ROUTES.PROFILE);
		} catch (err) {
			console.log(err);
			toast({ description: TEXT[language].CREATE_ERROR });
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) return <Loader />;

	return (
		<div className='w-full max-w-[500px]'>
			<p className='page-title'>{TEXT[language].PAGE_TITLE}</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 dark:text-white'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{TEXT[language].TITLE}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{TEXT[language].DESCRIPTION}</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='topicId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{TEXT[language].TOPIC}</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									{...field}>
									<FormControl>
										<SelectTrigger className='w-[180px]'>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{topics.map((topic, idx) => (
											<SelectItem
												value={topic.id.toString()}
												key={`${topic}-${idx}`}>
												{topic.text}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Autocomplete
						labelText={TEXT[language].TAGS}
						buttonText={TEXT[language].TAGS_BUTTON}
						items={tags}
						selectedItems={selectedTags}
						setSelectedItems={setSelectedTags}
					/>
					{questions.length === 0 ? (
						<p>{TEXT[language].NO_QUESTIONS}</p>
					) : (
						<Display questions={questions} />
					)}
					<DialogWindow setQuestions={setQuestions} />
					<Button type='submit' disabled={questions.length === 0}>
						{TEXT[language].SUBMIT}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateTemplate;
