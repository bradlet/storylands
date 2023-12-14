import { Dispatch, SetStateAction } from "react";
import classes from "./grid.module.css";
// Unecessary workaround to VS Code spurious error / warning
const { gridContainer, gridSlotLink } = classes;


export default function Grid({
	id,
	coordinateSetter,
}: {
	id: string;
	coordinateSetter: Dispatch<SetStateAction<[number, number] | null>>;
}) {
	const gridSlots = [];

	for (let i = 0; i < 20; ++i) {
		for (let j = 0; j < 20; ++j) {
			gridSlots.push(
				<a
					key={`${i},${j}`}
					id={`slot-${i}-${j}`}
					className={gridSlotLink}
					onClick={() => coordinateSetter([i, j])}
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
