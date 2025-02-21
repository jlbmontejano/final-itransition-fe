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
import { signupUser } from "@/lib/fetch";
import { signupSchema } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

const TEXT = {
	en: {
		SIGN_UP: "Sign Up",
		DESCRIPTION: "Enter your credentials below to create an account",
		NAME: "Name",
		EMAIL: "Email",
		PASSWORD: "Password",
		SIGN_UP_BUTTON: "Sign Up",
		LOGIN_TEXT: "Already have an account?",
		LOGIN: "Login",
		SIGNUP_ERROR: "Email is already used.",
	},
	es: {
		SIGN_UP: "Regístrate",
		DESCRIPTION: "Ingresa tus datos a continuación para crear una cuenta",
		NAME: "Nombre",
		EMAIL: "Correo Electrónico",
		PASSWORD: "Contraseña",
		SIGN_UP_BUTTON: "Regístrate",
		LOGIN_TEXT: "¿Ya tienes una cuenta?",
		LOGIN: "Inicia Sesión",
		SIGNUP_ERROR: "Este correo electrónico ya está en uso.",
	},
};

const SignupForm = () => {
	const { setUser, language } = useUserContext();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof signupSchema>) {
		try {
			setIsLoading(true);
			const { data } = await signupUser(values);
			setUser(data!);
			navigate(ROUTES.PROFILE);
		} catch (err) {
			console.log(err);
			toast({
				title: "Error",
				description: TEXT[language].SIGNUP_ERROR,
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
					<CardTitle className='text-2xl'>{TEXT[language].SIGN_UP}</CardTitle>
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
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>{TEXT[language].NAME}</FormLabel>
											<FormControl>
												<Input {...field} disabled={isLoading} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
									{TEXT[language].SIGN_UP_BUTTON}
								</Button>
							</form>
						</Form>
					</div>
					<div className='text-sm pt-4'>
						<p>
							{TEXT[language].LOGIN_TEXT}{" "}
							<Link to={ROUTES.LOGIN} className='underline underline-offset-2'>
								{TEXT[language].LOGIN}
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignupForm;
