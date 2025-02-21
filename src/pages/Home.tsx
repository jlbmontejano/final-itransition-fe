import Loader from "@/components/shared/Loader";
import Template from "@/components/shared/Template";
import { useAuthContext } from "@/context";
import { getTemplates } from "@/lib/fetch";
import { BasicTemplateInfo } from "@/types";
import { useEffect, useState } from "react";

const TEXT = {
	en: {
		AVAILABLE_TEMPLATES: "All Available Templates",
		NO_TEMPLATES: "No Templates Available",
	},
	es: {
		AVAILABLE_TEMPLATES: "Todas las Plantillas Disponibles",
		NO_TEMPLATES: "No Hay Plantillas",
	},
};

const Home = () => {
	const { language } = useAuthContext();
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
