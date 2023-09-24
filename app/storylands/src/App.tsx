// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { GridSlot, InitialGridSlot } from "./components/grid-slot";
import { useState } from "react";
import Grid from "./components/grid";

import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { IDL } from "./idl/storylands";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";

const PROGRAM_ID = "9xDxgwW2LCPBWVrDc5Wucim953CcNzjh7KjPupuq9Vm";
const GRID_SLOT_KEYPAIR_FROM_INTEGRATION_TEST =
	"Fkf8svsZJUXmXSbYkAddR8Pcd311sMcj9c9h8HUdXTkT";

const backIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		className="back_arrow_icon"
	>
		<g>
			<path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z" />
			<polygon points="13.293 7.293 8.586 12 13.293 16.707 14.707 15.293 11.414 12 14.707 8.707 13.293 7.293" />
		</g>
	</svg>
);

const defaultStorySlot: InitialGridSlot = {
	x: -1,
	y: -1,
	title: "Missing story",
	imgPreset: -1,
	body: "A wonderful story full of lots of crazy things",
};

function App() {
	const [coordinates, setCoordinates] = useState<[number, number] | null>(
		null
	);
	const [slot, setSlot] = useState<InitialGridSlot>(defaultStorySlot);
	const { connection } = useConnection();
	const wallet = useAnchorWallet();
	const provider = new AnchorProvider(connection, wallet as Wallet, {});

	const program = new Program(IDL, PROGRAM_ID, provider);

	program.account.gridSlot
		.fetch(GRID_SLOT_KEYPAIR_FROM_INTEGRATION_TEST)
		.then((slot) => {
			setSlot(slot);
		});

	return (
		<>
			<h1>Storylands</h1>
			{coordinates ? (
				<div>
					<a onClick={() => setCoordinates(null)}>{backIcon}</a>
					<GridSlot {...slot} />
				</div>
			) : (
				<Grid coordinateSetter={setCoordinates} />
			)}
		</>
	);
}

export default App;
