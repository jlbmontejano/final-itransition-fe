/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/shared/Loader/Loader";
import TemplateInformation from "@/components/shared/TemplateInformation/TemplateInformation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTemplateContext } from "@/context/templateContext";
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import TEXT from "./utils/text";

const UseTemplate = () => {
	const { language } = useUserContext();
	const { currentTemplate } = useTemplateContext();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const dynamicQuestionSchema: Record<string, z.ZodType<any, any>> = {};

	console.log(currentTemplate);

	for (const question of currentTemplate!.questions) {
		if (question.type === "CHECKBOX") {
			dynamicQuestionSchema[question.text] = z.array(z.string());
		} else if (question.type === "NUMBER") {
			dynamicQuestionSchema[question.text] = z
				.number()
				.refine(val => val >= 0, "Number must be positive");
		} else {
			dynamicQuestionSchema[question.text] = z
				.string()
				.min(1, "Answer missing");
		}
	}

	const formSchema = z.object(dynamicQuestionSchema);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsLoading(true);
			console.log(values);

			// await createTemplate({
			// 	...values,
			// 	tags: selectedTags,
			// 	questions,
			// 	creatorId: user!.id,
			// });

			toast({ description: TEXT[language].TOAST_SUCCESS });
			navigate(ROUTES.PROFILE);
		} catch (err) {
			console.log(err);
			toast({ description: TEXT[language].SUBMIT_REQUEST_ERROR });
		} finally {
			setIsLoading(false);
		}
	}

	const renderType = (type: string, field: any, options?: []) => {
		switch (type) {
			case "TEXT":
				return <Input {...field} />;
			case "MULTITEXT":
				return <Textarea {...field} />;
			case "NUMBER":
				return <Input {...field} />;
			case "CHECKBOX":
				return options?.map((option, idx) => {
					return (
						<div key={`${option}-${idx}`}>
							<Checkbox />
							<Label>{option}</Label>
						</div>
					);
				});
		}
	};

	if (isLoading) return <Loader />;

	return (
		<div className='flex flex-col md:flex-row gap-8 w-full'>
			<div className='flex flex-col'>
				<TemplateInformation />
			</div>
			<div className='flex-1'>
				<p className='text-2xl font-bold'>{TEXT[language].QUESTIONS}:</p>
				<div className='flex flex-col w-full items-center'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8 dark:text-white md:min-w-[450px] lg:min-w-[600px]'>
							{currentTemplate?.questions.map(({ text, type }, idx) => (
								<FormField
									key={`${text}-${idx}`}
									control={form.control}
									name={text}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{text}</FormLabel>
											<FormControl>{renderType(type, field)}</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}

							<Button type='submit'>{TEXT[language].SUBMIT_BUTTON}</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default UseTemplate;
