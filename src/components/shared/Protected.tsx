import { useUserContext } from "@/context/userContext";
import { ROUTES } from "@/lib/constants/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const Protected = () => {
	const { user } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate(ROUTES.LOGIN);
		}
	}, []);

	return <Outlet />;
};

export default Protected;
