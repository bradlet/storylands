export type InitialGridSlot = {
	x: number;
	y: number;
	title: string;
	imgPreset: number;
	body: string;
};

export function getGridSlot(x: number, y: number): InitialGridSlot {
	return {
		x,
		y,
		title: "test",
		imgPreset: 2,
		body: "test",
	};
}
