import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { useNavigate } from "react-router";
import TEXT from "./utils/text";
import { useUserContext } from "@/context/userContext";

const Error = () => {
	const { language } = useUserContext();
	const navigate = useNavigate();

	return (
		<div className='flex flex-col flex-1 justify-center items-center gap-4 '>
			<p className='text-2xl font-semibold'>{TEXT[language].ERROR}</p>
			<Button onClick={() => navigate(ROUTES.HOME)}>
				{TEXT[language].BUTTON}
			</Button>
		</div>
	);
};

export default Error;
