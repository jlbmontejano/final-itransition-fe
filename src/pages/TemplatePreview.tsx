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
import { deleteTemplate, getTemplate } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Error from "./Error";
import { Role } from "@/types";

const TEXT = {
	en: {
		QUESTIONS: "Questions",
		USE_TEMPLATE: "Answer this template",
		DELETE_TEMPLATE: "Delete this template",
		ARE_YOU_SURE: "Are you sure?",
		WARNING_MESSAGE: "This cannot be undone",
		YES: "Yes",
		NO: "No",
		NO_ID_ERROR: "No template ID found",
		FETCH_ERROR: "No template found",
		DELETE_SUCCESS: "Error deleting this template",
		DELETE_ERROR: "Error deleting this template",
		TOAST_DESCRIPTION: "You must be logged in.",
		LOGIN: "Log In",
	},
	es: {
		QUESTIONS: "Preguntas",
		USE_TEMPLATE: "Contestar esta plantilla",
		DELETE_TEMPLATE: "Borrar esta plantilla",
		ARE_YOU_SURE: "¿Estás seguro?",
		WARNING_MESSAGE: "Esto no se puede deshacer",
		YES: "Sí",
		NO: "No",
		NO_ID_ERROR: "No se encontró el ID de la plantilla",
		FETCH_ERROR: "No se encontró la plantilla",
		DELETE_SUCCESS: "Se ha borrado esta plantilla",
		DELETE_ERROR: "Error al borrar esta plantilla",
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
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);

	useEffect(() => {
		async function fetchTemplate() {
			if (!id) {
				handleError(TEXT[language].NO_ID_ERROR);
				setIsLoading(false);
				navigate(ROUTES.HOME);
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

	const handleDeleteTemplate = async () => {
		try {
			if (!id) {
				handleError(TEXT[language].NO_ID_ERROR);
				setIsLoading(false);
				navigate(ROUTES.HOME);
				return;
			}

			await deleteTemplate(id);
			toast({ description: TEXT[language].DELETE_SUCCESS });
			navigate(ROUTES.HOME);
		} catch (err) {
			console.log(err);
			handleError(TEXT[language].DELETE_ERROR);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) return <Loader />;
	if (!currentTemplate) return <Error />;

	return (
		<div className='flex flex-col md:flex-row gap-8 w-full'>
			<div className='flex flex-col'>
				<TemplateInformation />
				<div className='flex flex-col gap-4 mt-4'>
					<Button onClick={handleUseTemplate}>
						{TEXT[language].USE_TEMPLATE}
					</Button>
					{(user?.role === Role.ADMIN ||
						currentTemplate.creator.id === user?.id) && (
						<Button onClick={() => setDeleteConfirmation(true)}>
							{TEXT[language].DELETE_TEMPLATE}
						</Button>
					)}
					{deleteConfirmation && (
						<div className='flex flex-col items-center'>
							<p className='font-semibold'>{TEXT[language].ARE_YOU_SURE}</p>
							<p className='text-xs'>{TEXT[language].WARNING_MESSAGE}</p>
							<div className='flex gap-2 mt-4'>
								<Button onClick={handleDeleteTemplate}>
									{TEXT[language].YES}
								</Button>
								<Button onClick={() => setDeleteConfirmation(false)}>
									{TEXT[language].NO}
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className='flex-1'>
				<p className='text-2xl font-bold'>{TEXT[language].QUESTIONS}:</p>
				<Display questions={currentTemplate.questions} />
			</div>
		</div>
	);
};

export default TemplatePreview;
