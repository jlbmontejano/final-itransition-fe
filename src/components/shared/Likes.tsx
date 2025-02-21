import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants/routes";
import { updateTemplateLikes } from "@/lib/fetch";
import { useEffect } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useNavigate } from "react-router";

const TEXT = {
	en: {
		LOGIN: "Log In",
		TOAST_DESCRIPTION: "You must be logged in.",
	},
	es: {
		LOGIN: "Iniciar Sesión",
		TOAST_DESCRIPTION: "Tienes que iniciar sesión.",
	},
};

type LikesProps = {
	templateId: number;
	likedUsersIds: number[];
	likesCount: number;
	setLikesCount: React.Dispatch<React.SetStateAction<number>>;
	liked: boolean;
	setLiked: React.Dispatch<React.SetStateAction<boolean>>;
};

const Likes = ({
	templateId,
	likedUsersIds,
	likesCount,
	setLikesCount,
	liked,
	setLiked,
}: LikesProps) => {
	const { user, language } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			setLiked(false);
			return;
		}

		setLiked(likedUsersIds.includes(user.id));
	}, [user, likedUsersIds]);

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

		try {
			await updateTemplateLikes({
				templateId,
				userId: user.id,
			});

			setLiked(!liked);
			setLikesCount(likesCount + (liked ? -1 : 1));
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='flex items-center'>
			<Button
				onClick={handleUpdateLike}
				variant='ghost'
				className='size-fit p-1'>
				{liked ? <BiSolidLike /> : <BiLike />}
			</Button>
			<p className='pl-1'>{likesCount}</p>
		</div>
	);
};

export default Likes;
