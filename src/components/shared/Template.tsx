import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/context";
import { ROUTES } from "@/lib/constants/routes";
import { BasicTemplateInfo } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import Likes from "./Likes";

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
	const { language } = useAuthContext();
	const navigate = useNavigate();
	const [liked, setLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(template.likesCount);

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
						template.tags.map((tag, idx) => (
							<Badge key={`tag-${idx}`}>{tag.text}</Badge>
						))
					) : (
						<p className='text-xs text-muted-foreground'>
							{TEXT[language].NO_TAGS}
						</p>
					)}
				</div>
				<Likes
					templateId={template.id}
					likedUsersIds={template.likedUsersIds}
					likesCount={likesCount}
					setLikesCount={setLikesCount}
					liked={liked}
					setLiked={setLiked}
				/>
			</CardFooter>
		</Card>
	);
};

export default Template;
