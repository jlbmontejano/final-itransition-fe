import Home from "@/pages/Home";
import { Route, Routes } from "react-router";
import LoginForm from "@/components/shared/auth/LoginForm";
import SignupForm from "@/components/shared/auth/SignupForm";
import Header from "@/components/shared/Header";
import Protected from "@/components/shared/Protected";
import { Toaster } from "@/components/ui/toaster";
import { useAuthContext } from "@/context";
import { ROUTES } from "@/lib/constants/routes";
import CreateTemplate from "@/pages/CreateTemplate";
import Error from "@/pages/Error";
import FillTemplate from "@/pages/FillTemplate";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import TemplatePreview from "@/pages/TemplatePreview";

function App() {
	const { darkMode } = useAuthContext();

	return (
		<main
			className={`${darkMode && "dark bg-zinc-900"} h-screen flex flex-col`}>
			<Header />
			<div className='flex flex-col flex-1 items-center dark:bg-zinc-900 p-8'>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />}></Route>
					<Route path={ROUTES.SIGNUP} element={<SignupForm />} />
					<Route path={ROUTES.LOGIN} element={<LoginForm />} />
					<Route path={ROUTES.SETTINGS} element={<Settings />} />
					<Route
						path={`${ROUTES.TEMPLATE_PREVIEW}/:id`}
						element={<TemplatePreview />}
					/>
					<Route element={<Protected />}>
						<Route path={ROUTES.PROFILE} element={<Profile />} />
						<Route path={ROUTES.CREATE_TEMPLATE} element={<CreateTemplate />} />
						<Route path={ROUTES.FILL_TEMPLATE} element={<FillTemplate />} />
					</Route>
					<Route path={ROUTES.ERROR} element={<Error />} />
				</Routes>
			</div>
			<Toaster />
		</main>
	);
}

export default App;
