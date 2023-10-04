import { useState } from "react";

export type GridSlotFormProps = {
	x: number;
	y: number;
};

export function GridSlotForm({ x, y }: GridSlotFormProps) {
	const [title, setTitle] = useState("");
	const [imgPreset, setImgPreset] = useState(0);
	const [body, setBody] = useState("");

	return (
		<>
			<div>
				({x}, {y})
			</div>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="text"
				value={imgPreset}
				onChange={(e) => setImgPreset(parseInt(e.target.value))}
			/>
			<textarea value={body} onChange={(e) => setBody(e.target.value)} />
		</>
	);
}
