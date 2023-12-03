import { useEffect, useState } from "react";

import { IDL } from "../../../target/types/storylands";
import "./App.css";
import BackIcon from "./assets/back-arrow-icon.svg?react";
import defaultStorySlot from "./assets/default-story-slot.json";
import Grid from "./components/grid";
import { GridSlot, GridSlotProps } from "./components/grid-slot";
import { GridSlotForm } from "./components/grid-slot-form";

import {
	AnchorProvider,
	Program,
	Wallet,
	setProvider,
} from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export const PROGRAM_ID = "EJF8SF4uBXdwVXjHWZumW52kvJjymgjihv9MsVRcyJfP";

function App() {
	const [editing, setEditing] = useState<boolean>(false);
	const [coordinates, setCoordinates] = useState<[number, number] | null>(
		null
	);
	const [slot, setSlot] = useState<GridSlotProps>(defaultStorySlot);


	const { connection } = useConnection();
	const wallet = useAnchorWallet();
	const provider = new AnchorProvider(connection, wallet as Wallet, {});
	setProvider(provider);

	useEffect(() => {
		try {
			const program = new Program(IDL, PROGRAM_ID, provider);
			program.account.gridSlot.fetch(PROGRAM_ID).then((slot) => {
				setSlot(slot);
			});
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
