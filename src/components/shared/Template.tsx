import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useUserContext } from "@/context/userContext";
import { ROUTES } from "@/lib/constants/routes";
import { BasicTemplateInfo } from "@/types";
import { useNavigate } from "react-router";
import Likes from "./Likes";
import Badges from "./Badges";

const TEXT = {
	en: {
		LOGIN: "Log In",
		TOAST_DESCRIPTION: "You must be logged in.",
		NO_TAGS: "No tags",
	},
	es: {
		LOGIN: "Iniciar Sesión",
		TOAST_DESCRIPTION: "Tienes que iniciar sesión.",
		NO_TAGS: "Sin etiquetas",
	},
};

const Template = ({ template }: { template: BasicTemplateInfo }) => {
	const { language } = useUserContext();
	const navigate = useNavigate();

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle
					onClick={() =>
						navigate(`${ROUTES.TEMPLATE_PREVIEW}/${template.id}`, {
							state: template,
						})
					}
					className='text-xl hover:underline hover:cursor-pointer'>
					{template.title}
				</CardTitle>
				<CardDescription>
					<p className='text-xs'>
						{template.creator.name} | {template.topic.text}
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p> {template.description}</p>
			</CardContent>
			<CardFooter className='flex gap-2 items-center justify-between'>
				<div className='flex flex-wrap gap-1'>
					{template.tags.length > 0 ? (
						<Badges items={template.tags} />
					) : (
						<p className='text-xs text-muted-foreground'>
							{TEXT[language].NO_TAGS}
						</p>
					)}
				</div>
				<Likes
					templateId={template.id}
					likedUsersIds={template.likedUsersIds}
					initialLikesCount={template.likesCount}
				/>
			</CardFooter>
		</Card>
	);
};

export default Template;
