import { useUserContext } from "@/context/userContext";
import { Question } from "@/types";
import TEXT from "./utils/text";

type DisplayProps = {
	questions: Question[];
};

const Display = ({ questions }: DisplayProps) => {
	const { language } = useUserContext();

	const capitalizaString = (questionType: string) => {
		return questionType.charAt(0) + questionType.slice(1).toLowerCase();
	};

	return (
		<div className='flex flex-col gap-4'>
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
		</div>
	);
};

export default Display;
