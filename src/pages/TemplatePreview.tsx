import Loader from "@/components/shared/Loader";
import Display from "@/components/shared/questions/Display";
import TemplateInformation from "@/components/shared/TemplateInformation";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useTemplateContext } from "@/context/templateContext";
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { useHandleError } from "@/hooks/useHandleError";
import { ROUTES } from "@/lib/constants/routes";
import { getTemplate } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Error from "./Error";

const TEXT = {
	en: {
		QUESTIONS: "Questions",
		USE_TEMPLATE: "Use this template",
		NO_ID_ERROR: "No template ID found",
		FETCH_ERROR: "No template found",
		TOAST_DESCRIPTION: "You must be logged in.",
		LOGIN: "Log In",
	},
	es: {
		QUESTIONS: "Preguntas",
		USE_TEMPLATE: "Usar esta plantilla",
		NO_ID_ERROR: "No se encontró el ID de la plantilla",
		FETCH_ERROR: "No se encontró la plantilla",
		TOAST_DESCRIPTION: "Tienes que iniciar sesión.",
		LOGIN: "Iniciar Sesión",
	},
};

const TemplatePreview = () => {
	const { id } = useParams();
	const { user, language } = useUserContext();
	const { currentTemplate, setCurrentTemplate } = useTemplateContext();
	const navigate = useNavigate();
	const handleError = useHandleError();
	const [isLoading, setIsLoading] = useState(true);
	const [, setLikesCount] = useState(0);

	useEffect(() => {
		async function fetchTemplate() {
			if (!id) {
				handleError(TEXT[language].NO_ID_ERROR);
				setIsLoading(false);
				return;
			}

			try {
				const { data } = await getTemplate(id);
				setCurrentTemplate(data!);
				setLikesCount(data!.likesCount);
			} catch (err) {
				console.log(err);
				handleError(TEXT[language].FETCH_ERROR);
			} finally {
				setIsLoading(false);
			}
		}

		fetchTemplate();
	}, [id, language]);

	const handleUseTemplate = () => {
		if (!user) {
			toast({
				description: TEXT[language].TOAST_DESCRIPTION,
				action: (
					<ToastAction altText='Log In' onClick={() => navigate(ROUTES.LOGIN)}>
						{TEXT[language].LOGIN}
					</ToastAction>
				),
			});
			return;
		}
		navigate(`${ROUTES.USE_TEMPLATE}/${currentTemplate!.id}`);
	};

	if (isLoading) return <Loader />;
	if (!currentTemplate) return <Error />;

	return (
		<div className='flex flex-col md:flex-row gap-8 w-full'>
			<div className='flex flex-col'>
				<TemplateInformation />
				<Button className='place-self-center mt-4' onClick={handleUseTemplate}>
					{TEXT[language].USE_TEMPLATE}
				</Button>
			</div>
			<div className='flex-1'>
				<p className='text-2xl font-bold'>{TEXT[language].QUESTIONS}:</p>
				<Display questions={currentTemplate.questions} />
			</div>
		</div>
	);
};

export default TemplatePreview;
