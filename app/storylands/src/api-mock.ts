// api_mock.ts
// Contains temporary methods that I use to wrap up and mock
// interactions with some downstream.

export type GridSlotResponse = {
	x: number;
	y: number;
	title: string;
	imgPreset: number;
	body: Array<string>;
};

export function getStory(x: number, y: number): GridSlotResponse {
	const example_story: GridSlotResponse = {
		x,
		y,
		title: "The Abyssal Opening",
		imgPreset: 1,
		body: [
			"First Story: The earth around shakes in an unending tremor of horror. All around, it pulls away life, and vitality crumbles away into nothingness. There on the ground, as the void begins to take you -- an endlessly growing wall of black -- you peer in and understand: there's nothing left.",
			"Story two: A test",
		],
	};

	return example_story;
}
