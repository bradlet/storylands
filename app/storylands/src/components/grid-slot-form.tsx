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
import { Keypair } from "@solana/web3.js";

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
			if (wallet === undefined) {
				throw Error("No wallet connection detected.");
			}
			const storySlotKeypair = new Keypair();

			const program = new Program(IDL, PROGRAM_ID, provider);
			program.methods
				.saveStory({ x, y, title, body, imgPreset })
				.accounts({
					gridSlot: storySlotKeypair.publicKey,
					storyWriter: wallet?.publicKey,
				})
				.signers([storySlotKeypair])
				.rpc();
			console.log(`Saved new story at ${storySlotKeypair.publicKey}`);
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
