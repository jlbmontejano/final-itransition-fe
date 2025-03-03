import { useTemplateContext } from "@/context/templateContext";
import { useUserContext } from "@/context/userContext";
import Error from "@/pages/Error/Error";
import Likes from "../Likes/Likes";
import Badges from "../Badges/Badges";
import TEXT from "./utils/text";

const TemplateInformation = () => {
	const { language } = useUserContext();
	const { currentTemplate } = useTemplateContext();

	if (!currentTemplate) return <Error />;

	return (
		<div className='md:max-w-[400px]'>
			<p className='text-2xl font-bold'>{currentTemplate.title}</p>
			<div className=''>
				<p>
					<span className='font-semibold'>{TEXT[language].AUTHOR}:</span>{" "}
					{currentTemplate.creator.name}
				</p>
				<p>
					<span className='font-semibold'>{TEXT[language].TOPIC}:</span>{" "}
					{currentTemplate.topic.text}
				</p>
				<p>
					<span className='font-semibold'>{TEXT[language].DESCRIPTION}:</span>{" "}
					{currentTemplate.description}
				</p>
			</div>
			<div className='flex items-center my-2'>
				<div className='flex flex-wrap gap-1 mr-4'>
					{currentTemplate.tags.length > 0 ? (
						<Badges items={currentTemplate.tags} />
					) : (
						<p className='text-xs'>{TEXT[language].NO_TAGS}</p>
					)}
				</div>
				<Likes
					templateId={currentTemplate.id}
					likedUsersIds={currentTemplate.likedUsersIds}
					initialLikesCount={currentTemplate.likesCount}
				/>
			</div>
		</div>
	);
};

export default TemplateInformation;
