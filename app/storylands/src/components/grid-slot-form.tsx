import {
	AnchorProvider,
	Program,
	Wallet,
	setProvider,
} from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { IDL } from "../idl/storylands";
import { PROGRAM_ID } from "../App";

export type GridSlotFormProps = {
	x: number;
	y: number;
};

export function GridSlotForm({ x, y }: GridSlotFormProps) {
	const [title, setTitle] = useState("");
	const [imgPreset, setImgPreset] = useState(0);
	const [body, setBody] = useState("");

	const { connection } = useConnection();
	const wallet = useAnchorWallet();
	const provider = new AnchorProvider(connection, wallet as Wallet, {});
	setProvider(provider);

	function saveStory() {
		try {
			const program = new Program(IDL, PROGRAM_ID);
			program.methods.saveStory({ x, y, title, body, imgPreset }).rpc();
		} catch (e: unknown) {
			console.error(e);
		}
	}

	return (
		<>
			<div>
				({x}, {y})
			</div>
			<div>
				<h2>Title</h2>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<h2>Select An Image</h2>
				<input
					type="text"
					value={imgPreset}
					onChange={(e) => setImgPreset(parseInt(e.target.value))}
				/>
				<h2>Story</h2>
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
			</div>
			<button onClick={saveStory}>Submit</button>
		</>
	);
}
