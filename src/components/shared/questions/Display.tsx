import { useAuthContext } from "@/context";
import { Question } from "@/types";

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

type DisplayProps = {
	questions: Question[];
};

const Display = ({ questions }: DisplayProps) => {
	const { language } = useAuthContext();

	const capitalizaString = (questionType: string) => {
		return questionType.charAt(0) + questionType.slice(1).toLowerCase();
	};

	return (
		<>
			{questions.map(({ text, type, options }, idx) => (
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
