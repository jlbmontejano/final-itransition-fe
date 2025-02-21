import { FormItem } from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Question } from "@/types";
import { useEffect, useState } from "react";
import QuestionConfiguration from "./Configuration";
import { toast } from "@/hooks/use-toast";
import { useUserContext } from "@/context/userContext";

const TEXT = {
	en: {
		ADD_QUESTION_BUTTON: "Add question",
		DIALOG_TITLE: "Create a question to add to your template",
		DIALOG_DESCRIPTION: "Choose the type of question you would like to add",
		TEXT_TYPE: "Text",
		MULTITEXT_TYPE: "Multitext",
		NUMBER_TYPE: "Number",
		CHECKBOX_TYPE: "Checkbox",
		EMPTY_TEXT: "Please enter a question text",
		EMPTY_OPTIONS: "Please enter at least one option",
	},
	es: {
		ADD_QUESTION_BUTTON: "Agregar pregunta",
		DIALOG_TITLE: "Crea una pregunta para agregar a tu plantilla",
		DIALOG_DESCRIPTION: "Elige el tipo de pregunta que te gustaría agregar",
		TEXT_TYPE: "Texto",
		MULTITEXT_TYPE: "Multitexto",
		NUMBER_TYPE: "Número",
		CHECKBOX_TYPE: "Checkbox",
		EMPTY_TEXT: "Por favor escribe un texto para tu pregunta",
		EMPTY_OPTIONS: "Por favor escribe mínimo una opción",
	},
};

type DialogWindowProps = {
	setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
};

const DialogWindow = ({ setQuestions }: DialogWindowProps) => {
	const { language } = useUserContext();
	const [open, setOpen] = useState(false);
	const [questionInput, setQuestionInput] = useState<string>("");
	const [questionType, setQuestionType] = useState<
		"TEXT" | "MULTITEXT" | "NUMBER" | "CHECKBOX"
	>("TEXT");
	const [options, setOptions] = useState<string[]>([]);

	useEffect(() => {
		setOptions([]);
	}, [questionType]);

	const handleQuestionType = (value: string) => {
		setQuestionType(value as "TEXT" | "MULTITEXT" | "NUMBER" | "CHECKBOX");
	};

	const resetState = () => {
		setQuestionInput("");
		setQuestionType("TEXT");
		setOptions([]);
		setOpen(false);
	};

	const handleAddQuestion = () => {
		if (!questionInput.trim()) {
			toast({
				description: TEXT[language].EMPTY_TEXT,
				variant: "destructive",
			});
			return;
		}

		if (questionType === "CHECKBOX" && options.length === 0) {
			toast({
				description: TEXT[language].EMPTY_OPTIONS,
				variant: "destructive",
			});
			return;
		}

		const sanitizedQuestion: Question = {
			text: questionInput,
			type: questionType,
			options,
		};

		setQuestions(prev => [...prev, sanitizedQuestion]);
		resetState();
	};

	return (
		<FormItem>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>{TEXT[language].ADD_QUESTION_BUTTON}</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{TEXT[language].DIALOG_TITLE}</DialogTitle>
						<DialogDescription>
							{TEXT[language].DIALOG_DESCRIPTION}
						</DialogDescription>
					</DialogHeader>
					<Select
						defaultValue='TEXT'
						onValueChange={e => handleQuestionType(e)}>
						<SelectTrigger>
							<SelectValue placeholder='Select a question type' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='TEXT'>{TEXT[language].TEXT_TYPE}</SelectItem>
							<SelectItem value='MULTITEXT'>
								{TEXT[language].MULTITEXT_TYPE}
							</SelectItem>
							<SelectItem value='NUMBER'>
								{TEXT[language].NUMBER_TYPE}
							</SelectItem>
							<SelectItem value='CHECKBOX'>
								{TEXT[language].CHECKBOX_TYPE}
							</SelectItem>
						</SelectContent>
					</Select>
					<QuestionConfiguration
						questionInput={questionInput}
						setQuestionInput={setQuestionInput}
						options={options}
						setOptions={setOptions}
						questionType={questionType}
					/>
					<DialogFooter>
						<Button type='submit' onClick={handleAddQuestion}>
							{TEXT[language].ADD_QUESTION_BUTTON}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</FormItem>
	);
};

export default DialogWindow;
