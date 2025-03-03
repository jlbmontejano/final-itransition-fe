import Loader from "@/components/shared/Loader/Loader";
import Template from "@/components/shared/TemplateCard/TemplateCard";
import { useUserContext } from "@/context/userContext";
import { getTemplates } from "@/lib/fetch";
import { BasicTemplateInfo } from "@/types";
import { useEffect, useState } from "react";
import TEXT from "./utils/text";

const Home = () => {
	const { language } = useUserContext();
	const [availableTemplates, setAvailableTemplates] = useState<
		BasicTemplateInfo[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchTemplates() {
			try {
				const { data } = await getTemplates();
				setAvailableTemplates(data!);
			} catch (err) {
				console.log(err);
				setAvailableTemplates([]);
			} finally {
				setIsLoading(false);
			}
		}

		fetchTemplates();
	}, []);

	if (isLoading) return <Loader />;

	return (
		<div className='container'>
			<p className='page-title'>{TEXT[language].AVAILABLE_TEMPLATES}</p>
			{availableTemplates.length > 0 ? (
				<div className='templates-grid'>
					{availableTemplates.map((template: BasicTemplateInfo) => (
						<Template
							template={template}
							key={`${template.creator.name}-${template.id}`}
						/>
					))}
				</div>
			) : (
				<p className='text-center'>{TEXT[language].NO_TEMPLATES}</p>
			)}
		</div>
	);
};

export default Home;
