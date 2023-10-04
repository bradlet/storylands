import classes from "./grid-slot.module.css";
// Unecessary workaround to VS Code spurious error
const { gridSlotContainer, slotDivider } = classes;

export type GridSlotProps = {
	x: number;
	y: number;
	title: string;
	imgPreset: number;
	body: string;
};

export function GridSlot(slot: GridSlotProps) {
	const { x, y, title, body } = slot;
	// const storySlots = body.map((story, index) => (
	// 	<StoryBodySlot key={index} story={story} />
	// ));
	const storySlots = <StoryBodySlot story={body} />;

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
