import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/userContext";
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";
import Badges from "./Badges";

const TEXT = {
	en: {
		NO_TAG: "Please enter a valid tag",
	},
	es: {
		NO_TAG: "Por favor agrega una etiqueta válida",
	},
};

type AutocompleteProps = {
	labelText: string;
	buttonText: string;
	items: string[];
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

const Autocomplete = ({
	labelText,
	buttonText,
	items,
	selectedItems,
	setSelectedItems,
}: AutocompleteProps) => {
	const { language } = useUserContext();
	const [autocompleteVisible, setAutocompleteVisible] = useState(false);
	const [userInput, setUserInput] = useState<string>("");
	const [filteredItems, setFilteredItems] = useState<string[]>(items);

	const resetState = () => {
		setAutocompleteVisible(false);
		setFilteredItems(items);
		setUserInput("");
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setUserInput(value);

		setFilteredItems(
			items.filter(item => item.toLowerCase().includes(value.toLowerCase()))
		);
	};

	const handleAutocomplete = (item: string) => {
		setSelectedItems(prev => [...prev, item]);
		resetState();
	};

	const handleAddBadge = () => {
		if (!userInput.trim()) {
			toast({
				description: TEXT[language].NO_TAG,
				variant: "destructive",
			});
			return;
		}
		setSelectedItems(prev => [...prev, userInput]);
		resetState();
	};

	return (
		<FormItem>
			<FormLabel>{labelText}</FormLabel>
			<Input
				value={userInput}
				onChange={handleInputChange}
				onFocus={() => setAutocompleteVisible(true)}
				onKeyDown={e => {
					if (e.key === "Escape") setAutocompleteVisible(false);
				}}
			/>
			{autocompleteVisible && filteredItems.length > 0 && (
				<ul className='autocomplete-dropdown'>
					{filteredItems.map((filteredItem, index) => (
						<li
							key={index}
							onClick={() => handleAutocomplete(filteredItem)}
							className='hover:bg-gray-200 hover:cursor-pointer px-2 hover:dark:text-black'>
							{filteredItem}
						</li>
					))}
				</ul>
			)}
			<Badges
				items={selectedItems}
				setItems={setSelectedItems}
				canRemoveItems={true}
			/>
			<Button type='button' onClick={handleAddBadge}>
				{buttonText}
			</Button>
		</FormItem>
	);
};

export default Autocomplete;
