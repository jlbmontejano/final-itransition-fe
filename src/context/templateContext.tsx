import { FullTemplateInfo } from "@/types/index";
import { createContext, ReactNode, useContext, useState } from "react";

type TemplateContext = {
	currentTemplate: FullTemplateInfo | null;
	setCurrentTemplate: React.Dispatch<
		React.SetStateAction<FullTemplateInfo | null>
	>;
};

const TemplateContext = createContext<TemplateContext | undefined>(undefined);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
	const [currentTemplate, setCurrentTemplate] =
		useState<FullTemplateInfo | null>(null);

	const value = {
		currentTemplate,
		setCurrentTemplate,
	};

	return (
		<TemplateContext.Provider value={value}>
			{children}
		</TemplateContext.Provider>
	);
};

export const useTemplateContext = () => {
	const context = useContext(TemplateContext);
	if (!context) {
		throw new Error(
			"useTemplateContext must be used within an TemplateProvider"
		);
	}
	return context;
};
