import { useEffect, useState } from "react";

import idl from "../../../target/idl/storylands.json";
import "./App.css";
import BackIcon from "./assets/back-arrow-icon.svg?react";
import defaultStorySlot from "./assets/default-story-slot.json";
import Grid from "./components/grid";
import { GridSlot, GridSlotProps } from "./components/grid-slot";
import { GridSlotForm } from "./components/grid-slot-form";

import {
	AnchorProvider,
	Idl,
	Program,
	Wallet,
	setProvider,
} from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export const PROGRAM_ID = "EJF8SF4uBXdwVXjHWZumW52kvJjymgjihv9MsVRcyJfP";
export const TARGET_STORY = "4piVmsk2mXUnXXoauMbWEXBaXWDnECGfiyumCa45cAw5";

function App() {
	const [slotAccountId, setSlotAccountId] = useState<PublicKey | null>(null);
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
		if (slotAccountId === null) return;
		try {
			const program = new Program(idl as Idl, PROGRAM_ID);
			program.account.gridSlot.fetch(slotAccountId).then((slot) => {
				setSlot({
					x: slot.x.toNumber(),
					y: slot.y.toNumber(),
					title: slot.title,
					imgPreset: slot.imgPreset.toNumber(),
					story: slot.story,
				});
			});
		} catch (e: unknown) {
			console.error(e);
		}
	}, [slotAccountId]);

	function returnHome() {
		setCoordinates(null);
		setEditing(false);
	}

	return (
		<>
			<h1>Storylands</h1>
			{slotAccountId && <h2>Story saved at {slotAccountId.toString()}</h2>}
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
								Stop editing
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
						<GridSlotForm
							x={slot.x}
							y={slot.y}
							setSlotAccountId={setSlotAccountId}
						/>
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
