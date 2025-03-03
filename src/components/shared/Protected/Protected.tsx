import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import TEXT from "./utils/text";

const Protected = () => {
	const { user, language } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate(ROUTES.LOGIN);
			toast({
				description: TEXT[language].TOAST_DESCRIPTION,
			});
		}
	}, [user]);

	return <Outlet />;
};

export default Protected;
