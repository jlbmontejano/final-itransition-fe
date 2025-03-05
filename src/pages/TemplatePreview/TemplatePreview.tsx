import Loader from "@/components/shared/Loader/Loader";
import Display from "@/components/shared/Display/Display";
import TemplateInformation from "@/components/shared/TemplateInformation/TemplateInformation";
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
import Error from "../Error/Error";
import TEXT from "./utils/text";

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

		return () => {
			setCurrentTemplate(null);
		};
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
					{(user?.role === "ADMIN" ||
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
