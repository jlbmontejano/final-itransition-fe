import { useUserContext } from "@/context/userContext";
import TEXT from "./utils/text";
import { Link } from "react-router";
import { ROUTES } from "@/lib/constants/routes";
import { useTemplateContext } from "@/context/templateContext";

const Footer = () => {
	const { language } = useUserContext();
	const { currentTemplate } = useTemplateContext();

	return (
		<div className='footer'>
			<p className='text-sm'>
				<span className='font-semibold'>{TEXT[language].NEED_HELP} </span>
				<Link
					to={ROUTES.CREATE_TICKET}
					state={{
						location: window.location.href,
						templateTitle: currentTemplate?.title,
					}}
					className='hover:underline'>
					{TEXT[language].CREATE_TICKET}
				</Link>
			</p>
		</div>
	);
};

export default Footer;
