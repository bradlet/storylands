import { Dispatch, SetStateAction } from "react";
import classes from "./grid.module.css";
// Unecessary workaround to VS Code spurious error / warning
const { gridContainer, gridSlotLink } = classes;

// The real grid is much larger, but the UI only displays a square of this size.
const VIEWABLE_GRID_DIM = 20;

type GridProps = {
	id: string;
	coordinateSetter: Dispatch<SetStateAction<[number, number]>>;
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

	for (let i = 0; i < VIEWABLE_GRID_DIM; ++i) {
		for (let j = 0; j < VIEWABLE_GRID_DIM; ++j) {
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
