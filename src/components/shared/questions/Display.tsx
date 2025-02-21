import { useTemplateContext } from "@/context/templateContext";
import { useUserContext } from "@/context/userContext";
import { ROUTES } from "@/lib/constants/routes";
import { useNavigate } from "react-router";

const TEXT = {
	en: {
		TEXT: "Text",
		TYPE: "Type",
		OPTIONS: "Options",
	},
	es: {
		TEXT: "Texto",
		TYPE: "Tipo",
		OPTIONS: "Opciones",
	},
};

const Display = () => {
	const { language } = useUserContext();
	const { currentTemplate } = useTemplateContext();
	const navigate = useNavigate();

	const capitalizaString = (questionType: string) => {
		return questionType.charAt(0) + questionType.slice(1).toLowerCase();
	};

	if (!currentTemplate) {
		navigate(ROUTES.ERROR);
		return;
	}

	return (
		<>
			{currentTemplate.questions.map(({ text, type, options }, idx) => (
				<div key={`${text}-${idx}`}>
					<p>
						<span className='font-semibold'>{TEXT[language].TEXT}: </span>{" "}
						{text}
					</p>
					<p>
						<span className='font-semibold'>{TEXT[language].TYPE}: </span>
						{capitalizaString(type)}
					</p>
					{type === "CHECKBOX" && (
						<>
							<p>
								<span className='font-semibold'>{TEXT[language].OPTIONS}:</span>
							</p>
							<ul>
								{options?.map((option, idx) => (
									<li className='pl-4' key={`${option}-${idx}`}>
										- {option}
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			))}
		</>
	);
};

export default Display;
