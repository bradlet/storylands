import { Dispatch, SetStateAction } from "react";
import classes from "./grid.module.css";
// Unecessary workaround to VS Code spurious error / warning
const { gridContainer, gridSlotLink } = classes;

type GridProps = {
	id: string;
	coordinateSetter: Dispatch<SetStateAction<[number, number] | null>>;
	viewingFlagSetter: Dispatch<SetStateAction<boolean>>;
};

export default function Grid({
	id,
	coordinateSetter,
	viewingFlagSetter,
}: GridProps) {
	const gridSlots = [];

	function setCoordinates(coordinatePair: [number, number], view: boolean) {
		coordinateSetter(coordinatePair);
		viewingFlagSetter(view);
	}

	for (let i = 0; i < 20; ++i) {
		for (let j = 0; j < 20; ++j) {
			gridSlots.push(
				<a
					key={`${i},${j}`}
					id={`slot-${i}-${j}`}
					className={gridSlotLink}
					onClick={() => setCoordinates([i, j], true)}
					onMouseOver={() => setCoordinates([i, j], false)}
				></a>
			);
		}
	}

	return (
		<div id={id} className={gridContainer}>
			{gridSlots}
		</div>
	);
}
