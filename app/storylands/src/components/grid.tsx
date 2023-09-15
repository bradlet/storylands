import { Dispatch, SetStateAction } from "react";
import classes from "./grid.module.css";
// Unecessary workaround to VS Code spurious error / warning
const { gridContainer, gridSlotLink } = classes;

export default function Grid({
	coordinateSetter,
}: {
	coordinateSetter: Dispatch<SetStateAction<[number, number] | null>>;
}) {
	const gridSlots = [];

	for (let i = 0; i < 20; ++i) {
		for (let j = 0; j < 20; ++j) {
			gridSlots.push(
				<a
					className={gridSlotLink}
					onClick={() => coordinateSetter([i, j])}
				></a>
			);
		}
	}

	return <div className={gridContainer}>{gridSlots}</div>;
}
