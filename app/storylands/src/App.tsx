import { useEffect, useState } from "react";

import idl from "../../../target/idl/storylands.json";
import "./App.css";
import BackIcon from "./assets/back-arrow-icon.svg?react";
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
import { getStoryAddress } from "./util/grid-util";

export const PROGRAM_ID = "EJF8SF4uBXdwVXjHWZumW52kvJjymgjihv9MsVRcyJfP";

function App() {
	const [viewing, setViewing] = useState<boolean>(false);
	const [editing, setEditing] = useState<boolean>(false);
	const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
	const [slot, setSlot] = useState<GridSlotProps | null>(null);

	const { connection } = useConnection();
	const wallet = useAnchorWallet();
	const provider = new AnchorProvider(connection, wallet as Wallet, {});
	setProvider(provider);

	useEffect(() => {
		try {
			if (viewing) {
				const program = new Program(idl as Idl, PROGRAM_ID);
				const [storySlotPda] = getStoryAddress(program, coordinates);
				program.account.gridSlot.fetch(storySlotPda).then((slot) => {
					console.log("story slot found:", slot);
					setSlot({
						x: slot.x as number,
						y: slot.y as number,
						title: slot.title as string,
						imgPreset: slot.imgPreset as number,
						body: slot.body as string,
					});
				});
			}
		} catch (e: unknown) {
			console.error(e);
		}
	}, [coordinates, viewing]);

	function returnHome() {
		setViewing(false);
		setEditing(false);
	}

	return (
		<>
			<h1>Storylands</h1>
			<h2>
				({coordinates[0]}, {coordinates[1]})
			</h2>
			{viewing ? (
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
							x={coordinates[0]}
							y={coordinates[1]}
							setEditing={setEditing}
						/>
					) : (
						<GridSlot
							{...slot}
							x={coordinates[0]}
							y={coordinates[1]}
						/>
					)}
				</div>
			) : (
				<Grid
					id="grid"
					coordinateSetter={setCoordinates}
					viewingFlagSetter={setViewing}
				/>
			)}
		</>
	);
}

export default App;
