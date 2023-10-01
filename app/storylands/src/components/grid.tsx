import { Dispatch, SetStateAction } from "react";
import classes from "./grid.module.css";
// Unecessary workaround to VS Code spurious error / warning
const { gridContainer, gridSlotLink, gridSlotExpanded } = classes;

export default function Grid({
	id,
	coordinateSetter,
}: {
	id: string;
	coordinateSetter: Dispatch<SetStateAction<[number, number] | null>>;
}) {
	const gridSlots = [];

	const zoomGridSlot = (x: number, y: number) => {
		const targetSlot = document.getElementById(`slot-${x}-${y}`);
		console.log(`Found classes: ${targetSlot?.classList}`);

		// Create another div overlaying the original in the same space, to give it
		// the scaling effect.
		const cloned: HTMLElement = targetSlot?.cloneNode() as HTMLElement;
		cloned.style.position = "absolute";
		// Add the clone to the document and then give it the expanded class.
		document.getElementById("grid")?.appendChild(cloned);

		// Use setTimeout to delay the addition of the expanded class
		setTimeout(() => {
			cloned.classList.add(gridSlotExpanded);
		}, 0);

		// Wait a second before setting the coordinates
		// TODO: Manage css in jsx modules to maintain single const for delay
		setTimeout(() => {
			coordinateSetter([x, y]);
		}, 1_000);
	};

	for (let i = 0; i < 20; ++i) {
		for (let j = 0; j < 20; ++j) {
			gridSlots.push(
				<a
					id={`slot-${i}-${j}`}
					className={gridSlotLink}
					onClick={() => zoomGridSlot(i, j)}
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
