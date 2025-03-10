import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@/types";
import { Link } from "react-router";
import TEXT from "./utils/text";
import { useUserContext } from "@/context/userContext";

const TicketCard = ({ summary, status, urlKey }: Ticket) => {
	const { language } = useUserContext();

	const urlConstructor = () =>
		`${import.meta.env.VITE_TICKET_URL_FIRSTPART}
	${urlKey}
	${import.meta.env.VITE_TICKET_URL_SECONDPART}`;

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='text-xl hover:underline hover:cursor-pointer'>
					<Link to={urlConstructor()} target='_blank'>
						{summary}
					</Link>
				</CardTitle>
				<CardDescription>
					<p className='text-xs'>
						{TEXT[language].STATUS}: {status}
					</p>
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default TicketCard;
