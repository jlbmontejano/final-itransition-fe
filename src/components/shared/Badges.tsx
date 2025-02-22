import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";

type BadgesProps = {
	items: string[];
	setItems?: React.Dispatch<React.SetStateAction<string[]>>;
	canRemoveItems?: boolean;
};

const Badges = ({
	items,
	setItems = () => {},
	canRemoveItems = false,
}: BadgesProps) => {
	const handleRemoveBadge = (idx: number) => {
		setItems(prev => prev.filter((_, i) => i !== idx));
	};

	return (
		<div className='flex flex-wrap gap-1'>
			{items.map((item, idx) => (
				<Badge key={`${item}-${idx}`}>
					{item}
					{canRemoveItems && (
						<Button
							type='button'
							onClick={() => handleRemoveBadge(idx)}
							className='size-fit p-0'>
							<IoIosClose className='dark:text-black' />
						</Button>
					)}
				</Badge>
			))}
		</div>
	);
};

export default Badges;
