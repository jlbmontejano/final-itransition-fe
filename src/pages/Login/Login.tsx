import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { loginUser } from "@/lib/fetch";
import { loginSchema } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import TEXT from "./utils/text";

const Login = () => {
	const { setUser, language } = useUserContext();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		try {
			setIsLoading(true);
			const { data } = await loginUser(values);
			setUser(data!);
			navigate(ROUTES.PROFILE);
		} catch (err) {
			console.log(err);
			toast({
				title: "Error",
				description: TEXT[language].LOGIN_ERROR,
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>{TEXT[language].LOGIN}</CardTitle>
					<CardDescription>{TEXT[language].DESCRIPTION}</CardDescription>
				</CardHeader>
				<CardContent>
					<div>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-8'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{TEXT[language].EMAIL}</FormLabel>
											<FormControl>
												<Input {...field} disabled={isLoading} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{TEXT[language].PASSWORD}</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='password'
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type='submit' disabled={isLoading}>
									{TEXT[language].LOGIN_BUTTON}
								</Button>
							</form>
						</Form>
					</div>
					<div className='text-sm pt-4'>
						<p>
							{TEXT[language].SIGN_UP_TEXT}{" "}
							<Link to={ROUTES.SIGNUP} className='underline underline-offset-2'>
								{TEXT[language].SIGN_UP}
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
