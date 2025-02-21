import TemplateInformation from "@/components/shared/TemplateInformation";
import { useTemplateContext } from "@/context/templateContext";
import { useState } from "react";

const UseTemplate = () => {
	const { currentTemplate } = useTemplateContext();
	const [likesCount, setLikesCount] = useState(currentTemplate!.likesCount);

	return (
		<div>
			<TemplateInformation
				likesCount={currentTemplate!.likesCount}
				setLikesCount={setLikesCount}
			/>
		</div>
	);
};

export default UseTemplate;
