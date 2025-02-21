import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants/routes";
import { useNavigate } from "react-router";

export function useHandleError() {
	const navigate = useNavigate();

	return (message: string) => {
		toast({ description: message, variant: "destructive" });
		navigate(ROUTES.HOME);
	};
}
