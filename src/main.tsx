import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { TemplateProvider } from "./context/templateContext.tsx";
import { UserProvider } from "./context/userContext.tsx";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<UserProvider>
			<TemplateProvider>
				<App />
			</TemplateProvider>
		</UserProvider>
	</BrowserRouter>
);
