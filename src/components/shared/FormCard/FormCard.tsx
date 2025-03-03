import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useUserContext } from "@/context/userContext";
import { BasicFormInfo } from "@/types";
import TEXT from "./utils/text";

const FormCard = ({ form }: { form: BasicFormInfo }) => {
	const { language } = useUserContext();

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='text-xl hover:underline hover:cursor-pointer'>
					{form.title}
				</CardTitle>
				<CardDescription>
					<p className='text-xs'>{form.creator.name}</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p> {form.description}</p>
			</CardContent>
			<CardFooter className='flex gap-2 items-center justify-between'>
				<p>
					{TEXT[language].FOOTER} {form.createdAt.toISOString()}
				</p>
			</CardFooter>
		</Card>
	);
};

export default FormCard;
