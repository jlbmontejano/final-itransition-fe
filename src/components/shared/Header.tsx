import { Button } from "@/components//ui/button";
import { useAuthContext } from "@/context";
import { ROUTES } from "@/lib/constants/routes";
import { FaGear } from "react-icons/fa6";
import { useNavigate } from "react-router";

const TEXT = {
	en: { HOME: "Home", JOIN: "Join our App!", PROFILE: "Profile" },
	es: { HOME: "Inicio", JOIN: "Unete a nuestra App!", PROFILE: "Perfil" },
};

const Header = () => {
	const { user, language } = useAuthContext();
	const navigate = useNavigate();

	return (
		<div className='header'>
			<Button variant='ghost' onClick={() => navigate(ROUTES.HOME)}>
				{TEXT[language].HOME}
			</Button>
			<div className='flex items-center'>
				{!user ? (
					<Button variant='ghost' onClick={() => navigate(ROUTES.LOGIN)}>
						{TEXT[language].JOIN}
					</Button>
				) : (
					<Button variant='ghost' onClick={() => navigate(ROUTES.PROFILE)}>
						{TEXT[language].PROFILE}
					</Button>
				)}
				<Button variant='ghost' onClick={() => navigate(ROUTES.SETTINGS)}>
					<FaGear />
				</Button>
			</div>
		</div>
	);
};

export default Header;
