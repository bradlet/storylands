import { useEffect, useState } from "react";

import { GridSlot, GridSlotProps } from "./components/grid-slot";
import Grid from "./components/grid";
import { IDL } from "./idl/storylands";
import BackIcon from "./assets/back-arrow-icon.svg?react";
import defaultStorySlot from "./assets/default-story-slot.json";
import "./App.css";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
	AnchorProvider,
	Program,
	setProvider,
	Wallet,
} from "@project-serum/anchor";
import { Connection } from "@solana/web3.js";
import { GridSlotForm } from "./components/grid-slot-form";

const PROGRAM_ID = "9xDxgwW2LCPBWVrDc5Wucim953CcNzjh7KjPupuq9Vm";
const GRID_SLOT_KEYPAIR_FROM_INTEGRATION_TEST =
	"Fkf8svsZJUXmXSbYkAddR8Pcd311sMcj9c9h8HUdXTkT";

function App() {
	const [editing, setEditing] = useState<boolean>(false);
	const [coordinates, setCoordinates] = useState<[number, number] | null>(
		null
	);
	const [slot, setSlot] = useState<GridSlotProps>(defaultStorySlot);

	// const connection = new Connection("http://127.0.0.1:8899", "confirmed");
	// const wallet = useAnchorWallet();

	useEffect(() => {
		try {
			// const provider = new AnchorProvider(
			// 	connection,
			// 	wallet as Wallet,
			// 	{}
			// );
			// setProvider(provider);
			// const program = new Program(IDL, PROGRAM_ID);
			// // program.methods.saveStory(defaultStorySlot).rpc();
			// program.account.gridSlot
			// 	.fetch(GRID_SLOT_KEYPAIR_FROM_INTEGRATION_TEST)
			// 	.then((slot) => {
			// 		setSlot(slot);
			// 	});
		} catch (e: unknown) {
			console.error(e);
		}
	});

	function returnHome() {
		setCoordinates(null);
		setEditing(false);
	}

	return (
		<>
			<h1>Storylands</h1>
			{coordinates ? (
				<div>
					<div>
						<a onClick={returnHome}>
							<BackIcon />
						</a>
						{editing ? (
							<a
								onClick={() => {
									setEditing(false);
								}}
							>
								Save
							</a>
						) : (
							<a
								onClick={() => {
									setEditing(true);
								}}
							>
								Edit
							</a>
						)}
					</div>
					{editing ? (
						<GridSlotForm {...slot} />
					) : (
						<GridSlot {...slot} />
					)}
				</div>
			) : (
				<Grid id="grid" coordinateSetter={setCoordinates} />
			)}
		</>
	);
}

export default App;
