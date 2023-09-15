import { GridSlotResponse } from "../api-mock";
import classes from "./grid-slot.module.css";
// Unecessary workaround to VS Code spurious error
const { gridSlotContainer, slotDivider } = classes;

export default function GridSlot({ x, y, title, body }: GridSlotResponse) {
	const storySlots = body.map((story, index) => (
		<StoryBodySlot key={index} story={story} />
	));
	return (
		<>
			<div>
				({x}, {y})
			</div>
			<h1>{title}</h1>
			<div>Placeholder Image Here...</div>
			<ul className={gridSlotContainer}>{storySlots}</ul>
		</>
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
