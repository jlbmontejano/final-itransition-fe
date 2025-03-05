import { Label } from "@/components//ui/label";
import { Switch } from "@/components//ui/switch";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants/routes";
import { useNavigate } from "react-router";
import TEXT from "./utils/text";

const Settings = () => {
	const { user, setUser, darkMode, setDarkMode, language, setLanguage } =
		useUserContext();
	const navigate = useNavigate();

	const handleLanguageChange = (value: string) => {
		setLanguage(value as "en" | "es");
	};

	const toggleDarkMode = () => {
		setDarkMode(prev => !prev);
	};

	const handleLogout = () => {
		setUser(null);
		navigate(ROUTES.HOME);
		toast({ description: TEXT[language].SUCESS });
	};

	return (
		<div className='container max-w-[600px] h-full'>
			<div className='w-full h-full flex flex-col gap-4'>
				<p className='page-title'>{TEXT[language].PAGE_TITLE}</p>
				<div className='w-full flex justify-between items-center'>
					<Label>{TEXT[language].LANGUAGE}</Label>
					<Select
						onValueChange={value => handleLanguageChange(value)}
						defaultValue={language}>
						<SelectTrigger className='w-[180px] dark:text-white'>
							<SelectValue placeholder='Change Language' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='en'>English</SelectItem>
							<SelectItem value='es'>Español</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className='w-full flex justify-between items-center'>
					<Label>{TEXT[language].DARK_MODE}</Label>
					<Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
				</div>
			</div>
			{user && <Button onClick={handleLogout}>{TEXT[language].LOGOUT}</Button>}
		</div>
	);
};

export default Settings;
