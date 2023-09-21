// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import GridSlot from "./components/grid-slot";
import { getStory } from "./api-mock";
import { useState } from "react";
import Grid from "./components/grid";

const backIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="back_arrow_icon">
		<g>
			<path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
			<polygon points="13.293 7.293 8.586 12 13.293 16.707 14.707 15.293 11.414 12 14.707 8.707 13.293 7.293"/>
		</g>
	</svg>
)

function App() {
	const [coordinates, setCoordinates] = useState<[number, number] | null>(
		null
	);
	const slot = getStory(0, 1);

	return (
		<>
			<h1>Storylands</h1>
			{coordinates ? (
				<div>
					<a onClick={() => setCoordinates(null)}>
						{backIcon}
					</a>
					<GridSlot {...slot} />
				</div>
			) : (
				<Grid coordinateSetter={setCoordinates} />
			)}
		</>
	);
}

export default App;
