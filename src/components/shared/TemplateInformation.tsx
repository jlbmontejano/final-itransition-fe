import { Badge } from "../ui/badge";
import { useUserContext } from "@/context/userContext";
import { useTemplateContext } from "@/context/templateContext";
import Error from "@/pages/Error";
import Likes from "./Likes";
import { useState } from "react";

const TEXT = {
	en: {
		AUTHOR: "Author",
		TOPIC: "Topic",
		DESCRIPTION: "Description",
		NO_TAGS: "No tags",
		QUESTIONS: "Questions",
		USE_TEMPLATE: "Use this template",
		NO_ID_ERROR: "No template ID found",
		FETCH_ERROR: "No template found",
		TOAST_DESCRIPTION: "You must be logged in.",
		LOGIN: "Log In",
	},
	es: {
		AUTHOR: "Autor",
		TOPIC: "Tema",
		DESCRIPTION: "Descripción",
		NO_TAGS: "Sin etiquetas",
		QUESTIONS: "Preguntas",
		USE_TEMPLATE: "Usar esta plantilla",
		NO_ID_ERROR: "No se encontró el ID de la plantilla",
		FETCH_ERROR: "No se encontró la plantilla",
		TOAST_DESCRIPTION: "Tienes que iniciar sesión.",
		LOGIN: "Iniciar Sesión",
	},
};

type TemplateInformationProps = {
	likesCount: number;
	setLikesCount: React.Dispatch<React.SetStateAction<number>>;
};

const TemplateInformation = ({
	likesCount,
	setLikesCount,
}: TemplateInformationProps) => {
	const { language } = useUserContext();
	const { currentTemplate } = useTemplateContext();
	const [liked, setLiked] = useState(false);

	if (!currentTemplate) return <Error />;

	return (
		<div>
			<p className='text-2xl font-bold'>{currentTemplate.title}</p>
			<div className=''>
				<p>
					<span className='font-semibold'>{TEXT[language].AUTHOR}:</span>{" "}
					{currentTemplate.creator.name}
				</p>
				<p>
					<span className='font-semibold'>{TEXT[language].TOPIC}:</span>{" "}
					{currentTemplate.topic.text}
				</p>
				<p>
					<span className='font-semibold'>{TEXT[language].DESCRIPTION}:</span>{" "}
					{currentTemplate.description}
				</p>
			</div>
			<div className='flex items-center justify-between my-2'>
				<div className='flex flex-wrap gap-1'>
					{currentTemplate.tags.length > 0 ? (
						currentTemplate.tags.map((tag, idx) => (
							<Badge key={`tag-${idx}`}>{tag.text}</Badge>
						))
					) : (
						<p className='text-xs'>{TEXT[language].NO_TAGS}</p>
					)}
				</div>
				<Likes
					templateId={currentTemplate.id}
					likedUsersIds={currentTemplate.likedUsersIds}
					liked={liked}
					setLiked={setLiked}
					likesCount={likesCount}
					setLikesCount={setLikesCount}
				/>
			</div>
		</div>
	);
};

export default TemplateInformation;
