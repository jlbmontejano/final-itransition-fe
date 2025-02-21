import { User } from "@/types/index";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type UserContext = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
	language: "en" | "es";
	setLanguage: React.Dispatch<React.SetStateAction<"en" | "es">>;
};

const UserContext = createContext<UserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [darkMode, setDarkMode] = useState(
		() => localStorage.getItem("darkMode") === "true"
	);
	const [language, setLanguage] = useState<"en" | "es">(() =>
		localStorage.getItem("language") === "en" ? "en" : "es"
	);

	useEffect(() => {
		localStorage.setItem("darkMode", String(darkMode));
	}, [darkMode]);

	useEffect(() => {
		localStorage.setItem("language", language);
	}, [language]);

	const value = {
		user,
		setUser,
		darkMode,
		setDarkMode,
		language,
		setLanguage,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within an UserProvider");
	}
	return context;
};
