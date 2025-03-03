import BadgesController from "@/components/shared/Badges/Badges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { CONFIGURATION_TEXT as TEXT } from "../utils/text";

type ConfigurationProps = {
	questionInput: string;
	setQuestionInput: React.Dispatch<React.SetStateAction<string>>;
	options: string[];
	setOptions: React.Dispatch<React.SetStateAction<string[]>>;
	questionType: string;
};

const Configuration = ({
	questionInput,
	setQuestionInput,
	options,
	setOptions,
	questionType,
}: ConfigurationProps) => {
	const { language } = useUserContext();
	const [optionInput, setOptionInput] = useState<string>("");

	const handleQuestionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuestionInput(value);
	};

	const handleOptionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setOptionInput(value);
	};

	const handleAddOption = () => {
		if (!optionInput.trim()) {
			toast({
				description: TEXT[language].NO_OPTION,
				variant: "destructive",
			});
			return;
		}
		setOptions(prev => [...prev, optionInput]);
		setOptionInput("");
	};

	return (
		<>
			<Label>{TEXT[language].QUESTION_TEXT}</Label>
			<Input
				value={questionInput}
				onChange={e => handleQuestionInput(e)}
				placeholder={TEXT[language].QUESTION_PLACEHOLDER}
			/>
			{questionType === "checkbox" && (
				<>
					<Label>{TEXT[language].ADD_OPTIONS}</Label>
					<Input
						value={optionInput}
						onChange={e => handleOptionInput(e)}
						placeholder={TEXT[language].ADD_OPTIONS}
					/>
					<BadgesController items={options} setItems={setOptions} />
					<Button onClick={handleAddOption} className='w-fit'>
						{TEXT[language].OPTIONS_BUTTON}
					</Button>
				</>
			)}
		</>
	);
};

export default Configuration;
