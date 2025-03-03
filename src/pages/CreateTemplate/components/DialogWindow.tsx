import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FormItem } from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { Question } from "@/types";
import { useEffect, useState } from "react";
import Configuration from "./Configuration";
import { DIALOG_WINDOW_TEXT as TEXT } from "../utils/text";

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
					<Configuration
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
