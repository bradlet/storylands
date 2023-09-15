// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import GridSlot from "./components/grid-slot";
import { getStory } from "./api-mock";
import { useState } from "react";
import Grid from "./components/grid";

/* <a href="https://react.dev" target="_blank">
	<img
		src={reactLogo}
		className="logo react"
		alt="React logo"
	/>
</a> */

function App() {
	const [coordinates, setCoordinates] = useState<[number, number] | null>(
		null
	);
	const slot = getStory(0, 1);

	return (
		<>
			<h1>Storylands</h1>
			<a onClick={() => setCoordinates(null)}>Go back</a>
			{coordinates ? (
				<GridSlot {...slot} />
			) : (
				<Grid coordinateSetter={setCoordinates} />
			)}
		</>
	);
}

export default App;
