import {
	Dispatch,
	JSXElementConstructor,
	ReactElement,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import classes from "./grid.module.css";
import { JSX } from "react/jsx-runtime";
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
	const gridSlots: JSX.Element[] = [];
	const [xOffset, setXOffset] = useState(0);
	const [yOffset, setYOffset] = useState(0);

	function setCoordinates(coordinatePair: [number, number], view: boolean) {
		coordinateSetter(coordinatePair);
		viewingFlagSetter(view);
	}

	// const colors: string[][] = [];

	// for (let y = 0; y < VIEWABLE_GRID_DIM + yOffset; ++y) {
	// 	const row: string[] = [];
	// 	for (let x = 0; x < VIEWABLE_GRID_DIM + xOffset; ++x) {
	// 		row[x] = "#a44141";
	// 	}
	// 	colors[y] = row;
	// }

	for (let x = 0; x < VIEWABLE_GRID_DIM + xOffset; ++x) {
		for (let y = 0; y < VIEWABLE_GRID_DIM + yOffset; ++y) {
			gridSlots.push(
				<a
					key={`${x},${y}`}
					id={`slot-${x}-${y}`}
					className={gridSlotLink}
					// style={{ backgroundColor: colors[x][y] }}
					onClick={() => setCoordinates([x, y], true)}
					onMouseOver={() => setCoordinates([x, y], false)}
				></a>
			);
		}
	}

	return (
		<div id={id} className={gridContainer}>
			{gridSlots}
			{/* {gridSlots.length != 0 ? gridSlots : <p>Nothing Here</p>} */}
		</div>
	);
}
