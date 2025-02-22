import Autocomplete from "@/components/shared/Autocomplete";
import { Button } from "@/components/ui/button";

import Loader from "@/components/shared/Loader";
import QuestionDialog from "@/components/shared/questions/DialogWindow";
import Display from "@/components/shared/questions/Display";
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

const TEXT = {
	en: {
		CREATE_TEMPLATE: "Create your own template!",
		TITLE: "Title",
		DESCRIPTION: "Description",
		TOPIC: "Topic",
		TAGS: "Tags",
		TAGS_BUTTON: "Add tag",
		NO_QUESTIONS: "No questions added yet",
		SUBMIT: "Create Template",
		TOAST_SUCCESS: "Template created successfully",
		CREATE_ERROR: "There's been an error, please try again",
	},
	es: {
		CREATE_TEMPLATE: "¡Crea tu propia plantilla!",
		TITLE: "Título",
		DESCRIPTION: "Descripción",
		TOPIC: "Tema",
		TAGS: "Etiquetas",
		TAGS_BUTTON: "Agregar etiqueta",
		NO_QUESTIONS: "No se han agregado preguntas aún",
		SUBMIT: "Crear plantilla",
		TOAST_SUCCESS: "Se ha creado tu plantilla",
		CREATE_ERROR: "Ha ocurrido un error, por favor vuelva a intentarlo",
	},
};

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
			<p className='text-2xl font-semibold text-center mb-4 dark:text-white'>
				{TEXT[language].CREATE_TEMPLATE}
			</p>
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
					<QuestionDialog setQuestions={setQuestions} />
					<Button type='submit' disabled={questions.length === 0}>
						{TEXT[language].SUBMIT}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateTemplate;
