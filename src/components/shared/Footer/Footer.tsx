import { useUserContext } from "@/context/userContext";
import TEXT from "./utils/text";
import { Link } from "react-router";
import { ROUTES } from "@/lib/constants/routes";

const Footer = () => {
	const { language } = useUserContext();

	return (
		<div className='footer'>
			<p className='text-sm'>
				<span className='font-semibold'>{TEXT[language].NEED_HELP} </span>
				<Link to={ROUTES.CREATE_TICKET} className='hover:underline'>
					{TEXT[language].CREATE_TICKET}
				</Link>
			</p>
		</div>
	);
};

export default Footer;
