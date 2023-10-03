import { Dispatch, SetStateAction } from "react";
import classes from "./grid.module.css";
// Unecessary workaround to VS Code spurious error / warning
const { gridContainer, gridSlotLink, gridSlotClicked, gridSlotExpanded } =
	classes;

// Calculate the center of the viewport
const viewportCenterX = window.innerWidth / 2;
const viewportCenterY = window.innerHeight / 2;

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

		// Create another div overlaying the original in the same space, to give it
		// the scaling effect.
		const cloned: HTMLElement = targetSlot?.cloneNode() as HTMLElement;
		cloned.style.position = "absolute";

		// Wait until the browser has updated the layout and is just about to repaint the screen before
		// grabbing the original grid-slot-link's position, so that the position it grabs is correct.
		window.requestAnimationFrame(() => {
			// Get the position of the original element relative to the document
			const rectPos = targetSlot?.getBoundingClientRect();
			const originalOffsetLeft = rectPos
				? rectPos.left + window.scrollX
				: 0;
			const originalOffsetTop = rectPos
				? rectPos.top + window.scrollY
				: 0;

			// Set the initial position of the clone to match the original element
			cloned.style.left = `${originalOffsetLeft}px`;
			cloned.style.top = `${originalOffsetTop}px`;

			// Add the clone to the document and then give it the expanded class.
			document.getElementById("grid")?.appendChild(cloned);

			// Use setTimeout to delay the addition of the expanded class
			setTimeout(() => {
				cloned.classList.add(gridSlotExpanded);
				cloned.style.left = `${viewportCenterX}px`;
				cloned.style.top = `${viewportCenterY}px`;
			}, 0);

			// Do the same for a background transition separately so that we get
			// a simultaneous smooth transition in background color from he hover effect.
			setTimeout(() => {
				cloned.classList.add(gridSlotClicked);
			}, 10);

			// Wait a second before setting the coordinates
			// TODO: Manage css in jsx modules to maintain single const for delay
			setTimeout(() => {
				coordinateSetter([x, y]);
			}, 700);
		});
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
