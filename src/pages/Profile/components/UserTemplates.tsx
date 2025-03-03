import Loader from "@/components/shared/Loader/Loader";
import TemplateCard from "@/components/shared/TemplateCard/TemplateCard";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContext";
import { useHandleError } from "@/hooks/useHandleError";
import { ROUTES } from "@/lib/constants/routes";
import { getUserTemplates } from "@/lib/fetch";
import { BasicTemplateInfo } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TEMPLATES_TEXT as TEXT } from "../utils/text";

const UserTemplates = () => {
	const { user, language } = useUserContext();
	const navigate = useNavigate();
	const [userTemplates, setUserTemplates] = useState<BasicTemplateInfo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const handleError = useHandleError();

	useEffect(() => {
		async function fetchTemplates() {
			try {
				if (!user) {
					handleError(TEXT[language].NO_ID_ERROR);
					return;
				}

				const { data } = await getUserTemplates(user.id.toString());
				setUserTemplates(data!);
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
			<Button
				className='w-fit'
				onClick={() => navigate(ROUTES.CREATE_TEMPLATE)}>
				{TEXT[language].CREATE_TEMPLATE}
			</Button>
			{userTemplates.length > 0 ? (
				<div className='templates-grid'>
					{userTemplates.map((template: BasicTemplateInfo) => (
						<TemplateCard
							template={template}
							key={`${template.creator.name}-${template.id}`}
						/>
					))}
				</div>
			) : (
				<p className='text-center'>{TEXT[language].NO_TEMPLATES}</p>
			)}
		</>
	);
};

export default UserTemplates;
