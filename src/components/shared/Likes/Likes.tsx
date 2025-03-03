import { Button } from "@/components/ui/button";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useLikes } from "@/hooks/useLikes";

type LikesProps = {
	templateId: number;
	likedUsersIds: number[];
	initialLikesCount: number;
};

const Likes = ({
	templateId,
	likedUsersIds,
	initialLikesCount,
}: LikesProps) => {
	const { likesCount, liked, handleUpdateLike } = useLikes({
		templateId,
		likedUsersIds,
		initialLikesCount,
	});

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
