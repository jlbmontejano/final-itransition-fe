import { User } from "@/types/index";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type AuthContext = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
	language: "en" | "es";
	setLanguage: React.Dispatch<React.SetStateAction<"en" | "es">>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
