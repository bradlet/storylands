import { useEffect, useState } from "react";

import { GridSlot, InitialGridSlot } from "./components/grid-slot";
import Grid from "./components/grid";
import { IDL } from "./idl/storylands";
import BackIcon from "./assets/back-arrow-icon.svg?react";
import "./App.css";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
	AnchorProvider,
	Program,
	setProvider,
	Wallet,
} from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";

const PROGRAM_ID = "9xDxgwW2LCPBWVrDc5Wucim953CcNzjh7KjPupuq9Vm";
const GRID_SLOT_KEYPAIR_FROM_INTEGRATION_TEST =
	"Fkf8svsZJUXmXSbYkAddR8Pcd311sMcj9c9h8HUdXTkT";

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

	const connection = new Connection("http://127.0.0.1:8899", "confirmed");
	const wallet = useAnchorWallet();

	useEffect(() => {
		try {
			const provider = new AnchorProvider(
				connection,
				wallet as Wallet,
				{}
			);
			setProvider(provider);

			const program = new Program(IDL, PROGRAM_ID);

			// program.methods.saveStory(defaultStorySlot).rpc();

			program.account.gridSlot
				.fetch(GRID_SLOT_KEYPAIR_FROM_INTEGRATION_TEST)
				.then((slot) => {
					setSlot(slot);
				});
		} catch (e: unknown) {
			console.error(e);
		}
	});

	return (
		<>
			<h1>Storylands</h1>
			{coordinates ? (
				<div>
					<a onClick={() => setCoordinates(null)}>
						<BackIcon />
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
