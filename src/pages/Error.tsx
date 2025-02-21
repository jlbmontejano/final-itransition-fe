import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { useNavigate } from "react-router";

const Error = () => {
	const navigate = useNavigate();

	return (
		<div className='flex flex-col flex-1 justify-center items-center gap-4 '>
			<p className='text-2xl font-semibold'>There has been an error.</p>
			<Button onClick={() => navigate(ROUTES.HOME)}>Home</Button>
		</div>
	);
};

export default Error;
