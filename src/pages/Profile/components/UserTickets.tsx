import Loader from "@/components/shared/Loader/Loader";
import TemplateCard from "@/components/shared/TemplateCard/TemplateCard";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContext";
import { useHandleError } from "@/hooks/useHandleError";
import { ROUTES } from "@/lib/constants/routes";
import { getUserTemplates } from "@/lib/fetch";
import { BasicTemplateInfo } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TEMPLATES_TEXT as TEXT } from "../utils/text";

const UserTickets = () => {
	return <div>UserTickets</div>;
};

export default UserTickets;
