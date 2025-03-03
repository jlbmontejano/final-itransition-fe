import { useUserContext } from "@/context/userContext";
import { ClipLoader } from "react-spinners";
import TEXT from "./utils/text";

const Loader = () => {
	const { language, darkMode } = useUserContext();

	return (
		<div className='flex flex-col flex-1 justify-center items-center gap-4 '>
			<p className='text-2xl font-semibold'>{TEXT[language].LOADING}</p>
			<ClipLoader
				size={45}
				color={darkMode ? "white" : "black"}
				className='dark:text-white'
			/>
		</div>
	);
};

export default Loader;
