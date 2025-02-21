import Loader from "@/components/shared/Loader";
import Template from "@/components/shared/Template";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context";
import { useHandleError } from "@/hooks/useHandleError";
import { ROUTES } from "@/lib/constants/routes";
import { getUserTemplates } from "@/lib/fetch";
import { BasicTemplateInfo } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TEXT = {
	en: {
		MY_TEMPLATES: "My Templates",
		CREATE_TEMPLATE: "Create a Template",
		NO_TEMPLATES: "You haven't created any templates yet",
		NO_ID_ERROR: "Please try to log in again.",
		FETCH_ERROR: "Error fetching your templates",
	},
	es: {
		MY_TEMPLATES: "Mis Plantillas",
		CREATE_TEMPLATE: "Crear una plantilla",
		NO_TEMPLATES: "No has creado ninguna plantilla",
		NO_ID_ERROR: "Por favor vuelva a iniciar sesión.",
		FETCH_ERROR: "Error al cargar sus plantillas",
	},
};

const Profile = () => {
	const { user, language } = useAuthContext();
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
		<div className='container'>
			<p className='page-title'>{TEXT[language].MY_TEMPLATES}</p>
			<Button
				className='w-fit'
				onClick={() => navigate(ROUTES.CREATE_TEMPLATE)}>
				{TEXT[language].CREATE_TEMPLATE}
			</Button>
			{userTemplates.length > 0 ? (
				<div className='templates-grid'>
					{userTemplates.map((template: BasicTemplateInfo) => (
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

export default Profile;
