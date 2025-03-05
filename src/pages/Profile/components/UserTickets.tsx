import Loader from "@/components/shared/Loader/Loader";
import TicketCard from "@/components/shared/TicketCard/TicketCard";
import { useUserContext } from "@/context/userContext";
import { useHandleError } from "@/hooks/useHandleError";
import { getUserTickets } from "@/lib/fetch";
import { Ticket } from "@/types";
import { useEffect, useState } from "react";
import { TICKETS_TEXT as TEXT } from "../utils/text";

const UserTickets = () => {
	const { user, language } = useUserContext();
	const [userTickets, setUserTickets] = useState<Ticket[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const handleError = useHandleError();

	useEffect(() => {
		async function fetchTemplates() {
			try {
				if (!user) {
					handleError(TEXT[language].NO_ID_ERROR);
					return;
				}

				const { data } = await getUserTickets(user.email);

				const responseTickets: Ticket[] =
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					data?.issues?.map((issue: any) => ({
						summary: issue.fields?.summary ?? "No Summary",
						status: issue.fields?.status.name ?? "No Status",
						urlKey: issue.key ?? "",
					})) ?? [];

				setUserTickets(responseTickets);
			} catch (err) {
				console.log(err);
				handleError(TEXT[language].FETCH_ERROR);
			} finally {
				setIsLoading(false);
			}
		}

		fetchTemplates();
	}, [user, language]);

	if (isLoading) return <Loader />;

	return (
		<>
			<p className='page-title'>{TEXT[language].PAGE_TITLE}</p>
			{userTickets.length > 0 ? (
				<div className='templates-grid'>
					{userTickets.map(({ summary, status, urlKey }: Ticket, idx) => (
						<TicketCard
							summary={summary}
							status={status}
							urlKey={urlKey}
							key={idx}
						/>
					))}
				</div>
			) : (
				<p className='text-center'>{TEXT[language].NO_TICKETS}</p>
			)}
		</>
	);
};

export default UserTickets;
