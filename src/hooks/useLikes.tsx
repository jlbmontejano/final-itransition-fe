import { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import { updateTemplateLikes } from "@/lib/fetch";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ROUTES } from "@/lib/constants/routes";
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

export const useLikes = ({
	templateId,
	likedUsersIds,
	initialLikesCount,
}: {
	templateId: number;
	likedUsersIds: number[];
	initialLikesCount: number;
}) => {
	const { user, language } = useUserContext();
	const navigate = useNavigate();
	const [likesCount, setLikesCount] = useState(initialLikesCount);
	const [liked, setLiked] = useState(false);

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

			setLiked(prev => !prev);
			setLikesCount(prev => prev + (liked ? -1 : 1));
		} catch (err) {
			console.log(err);
		}
	};

	return { likesCount, liked, handleUpdateLike };
};
