import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants/routes";
import { ticketSchema } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { z } from "zod";
import TEXT from "./utils/text";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PRIORITIES } from "./utils/constants";
import { createTicket } from "@/lib/fetch";
import Loader from "@/components/shared/Loader/Loader";

const CreateTicket = () => {
	const { user, language } = useUserContext();
	const { state } = useLocation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof ticketSchema>>({
		resolver: zodResolver(ticketSchema),
		defaultValues: {
			email: user?.email,
			link: state.location,
			title: state.templateTitle || "",
			summary: "",
			priority: "Medium",
		},
	});

	async function onSubmit(values: z.infer<typeof ticketSchema>) {
		try {
			setIsLoading(true);

			await createTicket(values);

			navigate(ROUTES.PROFILE);
			toast({ description: TEXT[language].TOAST_SUCESS });
		} catch (err) {
			console.log(err);
			toast({
				title: "Error",
				description: TEXT[language].TOAST_ERROR,
				variant: "destructive",
			});
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
						name='summary'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{TEXT[language].SUMMARY}</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='priority'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{TEXT[language].PRIORITY}</FormLabel>
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
										{PRIORITIES.map((priority, idx) => (
											<SelectItem value={priority} key={`${priority}-${idx}`}>
												{priority}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoading}>
						{TEXT[language].SUBMIT_BUTTON}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateTicket;
