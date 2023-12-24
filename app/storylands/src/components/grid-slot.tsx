import classes from "./grid-slot.module.css";
import ReactIcon from "../assets/react.svg?react";
// Unecessary workaround to VS Code spurious error
const { gridSlotContainer, slotDivider, logo } = classes;

export type GridSlotProps = {
	x: number;
	y: number;
	title?: string;
	imgPreset?: number;
	body?: string;
};

export function GridSlot(slot: GridSlotProps) {
	const { x, y, title, imgPreset, body } = slot;
	// const storySlots = body.map((story, index) => (
	// 	<StoryBodySlot key={index} story={story} />
	// ));
	const storySlots = <StoryBodySlot story={body ?? "Missing story"} />;

	return title ? (
		<>
			<div>
				({x}, {y})
			</div>
			<h1>{title}</h1>
			<div>Img: {imgPreset}</div>
			<ul className={gridSlotContainer}>{storySlots}</ul>
		</>
	) : (
		<ReactIcon className={logo} />
	);
}

function StoryBodySlot({ story }: { story: string }) {
	return (
		<li>
			<p>{story}</p>
			<hr className={slotDivider} />
		</li>
	);
}
