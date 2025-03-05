import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import Protected from "@/components/shared/Protected/Protected";
import { Toaster } from "@/components/ui/toaster";
import { useUserContext } from "@/context/userContext";
import { ROUTES } from "@/lib/constants/routes";
import CreateTemplate from "@/pages/CreateTemplate/CreateTemplate";
import CreateTicket from "@/pages/CreateTicket/CreateTicket";
import Error from "@/pages/Error/Error";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Profile from "@/pages/Profile/Profile";
import Settings from "@/pages/Settings/Settings";
import Signup from "@/pages/Signup/Signup";
import TemplatePreview from "@/pages/TemplatePreview/TemplatePreview";
import UseTemplate from "@/pages/UseTemplate/UseTemplate";
import { Route, Routes } from "react-router";

function App() {
	const { darkMode } = useUserContext();

	return (
		<main
			className={`${darkMode && "dark bg-zinc-900"} h-screen flex flex-col`}>
			<Header />
			<div className='flex flex-col flex-1 items-center dark:bg-zinc-900 px-8 py-4'>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home />} />
					<Route path={ROUTES.SIGNUP} element={<Signup />} />
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path={ROUTES.SETTINGS} element={<Settings />} />
					<Route
						path={`${ROUTES.TEMPLATE_PREVIEW}/:id`}
						element={<TemplatePreview />}
					/>
					<Route element={<Protected />}>
						<Route path={ROUTES.PROFILE} element={<Profile />} />
						<Route path={ROUTES.CREATE_TEMPLATE} element={<CreateTemplate />} />
						<Route
							path={`${ROUTES.USE_TEMPLATE}/:id`}
							element={<UseTemplate />}
						/>
						<Route path={ROUTES.CREATE_TICKET} element={<CreateTicket />} />
					</Route>
					<Route path={ROUTES.ERROR} element={<Error />} />
				</Routes>
			</div>
			<Footer />
			<Toaster />
		</main>
	);
}

export default App;
