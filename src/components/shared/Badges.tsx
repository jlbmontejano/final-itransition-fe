import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";

type BadgesProps = {
	items: string[];
	setItems: React.Dispatch<React.SetStateAction<string[]>>;
};

const Badges = ({ items, setItems }: BadgesProps) => {
	const handleRemoveBadge = (idx: number) => {
		setItems(prev => prev.filter((_, i) => i !== idx));
	};

	return (
		<>
			<div className='flex flex-wrap gap-1'>
				{items.map((item, idx) => (
					<Badge className='px-1' key={`${item}-${idx}`}>
						{item}
						<Button
							type='button'
							onClick={() => handleRemoveBadge(idx)}
							className='size-fit p-0'>
							<IoIosClose />
						</Button>
					</Badge>
				))}
			</div>
		</>
	);
};

export default Badges;
