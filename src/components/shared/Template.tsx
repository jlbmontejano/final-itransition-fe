import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useAuthContext } from "@/context";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants/routes";
import { updateTemplateLikes } from "@/lib/fetch";
import { BasicTemplateInfo } from "@/types";
import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
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
	const { user, language } = useAuthContext();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [liked, setLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(template.likesCount);

	// useEffect(() => {
	// 	if (!user || !template.likedUsersIds.includes(user.id)) {
	// 		setLiked(false);
	// 	} else {
	// 		setLiked(true);
	// 	}
	// }, [user, template.likedUsersIds]);

	const handleUpdateLike = async () => {
		if (!user) {
			toast({
				description: TEXT[language].TOAST_DESCRIPTION,
				action: (
					<ToastAction altText='Log In' onClick={() => navigate(ROUTES.LOGIN)}>
						{TEXT[language].LOGIN}
					</ToastAction>
				),
			});
			return;
		}

		await updateTemplateLikes({
			templateId: template.id,
			userId: user.id,
		});

		setLiked(!liked);
		setLikesCount(likesCount + (liked ? -1 : 1));
	};

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
					likesCount={template.likesCount}
					setLikesCount={setLikesCount}
					liked={liked}
					setLiked={setLiked}
				/>
				{/* <div className='flex items-center'>
					<Button
						onClick={handleUpdateLike}
						variant='ghost'
						className='size-fit p-1'>
						{liked ? <BiSolidLike /> : <BiLike />}
					</Button>

					<p className='pl-1'>{likesCount}</p>
				</div> */}
			</CardFooter>
		</Card>
	);
};

export default Template;
