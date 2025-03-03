import FormCard from "@/components/shared/FormCard/FormCard";
import Loader from "@/components/shared/Loader/Loader";
import { useUserContext } from "@/context/userContext";
import { useHandleError } from "@/hooks/useHandleError";
import { getUserForms } from "@/lib/fetch";
import { BasicFormInfo } from "@/types";
import { useEffect, useState } from "react";
import { FORMS_TEXT as TEXT } from "../utils/text";

const UserForms = () => {
	const { user, language } = useUserContext();
	const [userForms, setUserForms] = useState<BasicFormInfo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const handleError = useHandleError();

	useEffect(() => {
		async function fetchForms() {
			try {
				if (!user) {
					handleError(TEXT[language].NO_ID_ERROR);
					return;
				}

				const { data } = await getUserForms(user.id.toString());
				setUserForms(data!);
			} catch (err) {
				console.log(err);
				handleError(TEXT[language].FETCH_ERROR);
			} finally {
				setIsLoading(false);
			}
		}

		fetchForms();
	}, [user, language]);

	if (isLoading) return <Loader />;

	return (
		<>
			<p className='page-title'>{TEXT[language].PAGE_TITLE}</p>
			{userForms.length > 0 ? (
				<div className='templates-grid'>
					{userForms.map((form: BasicFormInfo) => (
						<FormCard form={form} key={`${form.creator.name}-${form.id}`} />
					))}
				</div>
			) : (
				<p className='text-center'>{TEXT[language].NO_FORMS}</p>
			)}
		</>
	);
};

export default UserForms;
