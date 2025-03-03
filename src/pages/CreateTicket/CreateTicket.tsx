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
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants/routes";
import { ticketSchema } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import TEXT from "./utils/text";

const CreateTicket = () => {
	const { user, language } = useUserContext();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof ticketSchema>>({
		resolver: zodResolver(ticketSchema),
		defaultValues: {
			reportedBy: user?.email,
			templateTitle: "",
			link: "",
			priority: "Low",
			status: "In Progress",
		},
	});

	async function onSubmit(values: z.infer<typeof ticketSchema>) {
		try {
			console.log(values);
			setIsLoading(true);
			// const { data } = await createTicket(values);

			navigate(ROUTES.PROFILE);
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

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 dark:text-white'>
					<FormField
						control={form.control}
						name='reportedBy'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{TEXT[language].REPORTED_BY}</FormLabel>
								<FormControl>
									<Input {...field} disabled={true} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='templateTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{TEXT[language].TEMPLATE_TITLE}</FormLabel>
								<FormControl>
									<Input {...field} disabled={isLoading} />
								</FormControl>
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
