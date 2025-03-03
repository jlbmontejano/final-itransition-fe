import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Error from "@/pages/Error/Error";
import { useState } from "react";
import UserForms from "./components/UserForms";
import UserTemplates from "./components/UserTemplates";
import UserTickets from "./components/UserTickets";

const Profile = () => {
	const [activeTab, setActiveTab] = useState<"templates" | "forms" | "tickets">(
		"templates"
	);

	const renderTab = () => {
		switch (activeTab) {
			case "templates":
				return <UserTemplates />;
			case "forms":
				return <UserForms />;
			case "tickets":
				return <UserTickets />;
			default:
				return <Error />;
		}
	};

	const handleChange = (e: "templates" | "forms" | "tickets") => {
		setActiveTab(e);
	};

	return (
		<div className='container'>
			<Select
				onValueChange={(e: "templates" | "forms" | "tickets") =>
					handleChange(e)
				}>
				<SelectTrigger className='w-[180px] dark:text-white self-end'>
					<SelectValue placeholder='Templates' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='templates'>Templates</SelectItem>
					<SelectItem value='forms'>Forms</SelectItem>
					<SelectItem value='tickets'>Tickets</SelectItem>
				</SelectContent>
			</Select>
			<div className='container'>{renderTab()}</div>
		</div>
	);
};

export default Profile;
